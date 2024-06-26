import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import OpenAI from "openai";
import { env } from "~/env";
import { image64 } from "~/app/(data)/base64image";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { Image } from "openai/resources/images.mjs";

// When no region or credentials are provided, the SDK will use the
// region and credentials from the local AWS config.
const s3_client = new S3Client({
  credentials: {
    accessKeyId: env.IG_AWS_ACCESS_KEY,
    secretAccessKey: env.IG_AWS_SECRET_ACCESS_KEY,
  },
  region: env.IG_AWS_REGION,
});

const openAI_client = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

async function generateIcon(
  prompt: string,
  numberOfIcons: number,
): Promise<{ b64_json: string }[] | Image[]> {
  if (env.MOCK_DALLE === "true") {
    // url returned by Dall-e, dont store directly in case of changes, instead store 64 base64 image
    //return "https://oaidalleapiprodscus.blob.core.windows.net/private/org-rP9tYNZdnt3y4y0dWwnnOu0e/user-aBWiiq0jmXVfAM0tw2rClQJP/img-vddV9PRLu6mt5g9SqjD2L6m3.png?st=2024-04-28T23%3A59%3A32Z&se=2024-04-29T01%3A59%3A32Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-04-28T23%3A09%3A44Z&ske=2024-04-29T23%3A09%3A44Z&sks=b&skv=2021-08-06&sig=tiRfyDHJ6TOo5BHKpVuPgRiIFXQZ/P503quHlxf6LTk%3D";
    return [{ b64_json: image64 }, { b64_json: image64 }];
  }
  const response = await openAI_client.images.generate({
    model: "dall-e-3",
    prompt,
    n: numberOfIcons,
    size: "1024x1024",
    response_format: "b64_json",
  });
  console.log(response.data[0]?.revised_prompt);
  return response.data;
}

function generateFinalPrompt(
  prompt: string,
  colors: string[] = [],
  style = "normal",
  lines = "fine",
) {
  const linesColorsPart = colors.length
    ? `, featuring ${colors.reduce((sum, color) => sum + " and " + color)} colors` +
      (lines ? ` and ${lines} lines` : "")
    : "";
  const stylePart = style ? `${style} style` : "";
  const userFinalPrompt = `a modern icon of ${prompt}, in ${stylePart}, centered, clean${linesColorsPart}.`;
  const finalPrompt = `${userFinalPrompt} Could be any shape, circle, square, box, etc. Please scale the full content to fit inside the image size of 1024x1024 px.`;
  return { userFinalPrompt, finalPrompt };
}

export const iconsRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(
      z.object({
        prompt: z.string().min(1),
        colors: z.array(z.string()).max(4).optional(),
        style: z.string().optional(),
        lines: z.string().optional(),
        numberOfIcons: z.number().min(1).max(10),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const nIcons = input.numberOfIcons;
      const { count } = await ctx.db.user.updateMany({
        where: {
          id: ctx.session.user.id,
          credits: { gte: nIcons },
        },
        data: {
          credits: { decrement: nIcons },
        },
      });
      if (count <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You do not have enough credits",
        });
      }

      const { userFinalPrompt, finalPrompt } = generateFinalPrompt(
        input.prompt,
        input?.colors,
        input?.style,
        input?.lines,
      );
      const images_64strings = await generateIcon(finalPrompt, nIcons);

      // in case of error in Dall-e
      if (!images_64strings) {
        // give user credits back
        await ctx.db.user.updateMany({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            credits: { increment: nIcons },
          },
        });
        // throw error
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate image",
        });
      }

      if (env.MOCK_DALLE === "true") {
        return [
          { imageUrl: images_64strings[0]!.b64_json, id: "" },
          { imageUrl: images_64strings[1]!.b64_json, id: "" },
        ];
      }
      const responses = await Promise.all(
        images_64strings.map(async (image, idx) => {
          const dbIcon = await ctx.db.icon.create({
            data: {
              prompt: userFinalPrompt,
              userId: ctx.session.user.id,
              keepPrivate: idx === 0 ? false : true,
            },
          });
          await s3_client.send(
            new PutObjectCommand({
              Bucket: env.IG_AWS_BUCKET,
              Body: Buffer.from(image.b64_json!, "base64"),
              Key: `${dbIcon.id}`,
              ContentType: "image/gif",
              ContentEncoding: "base64",
            }),
          );
          return {
            imageUrl: image.b64_json,
            id: dbIcon?.id,
          };
        }),
      );
      return responses;
    }),
  getIcons: protectedProcedure
    .input(
      z.object({
        iconsSetN: z.number().min(0),
      }),
    )
    .query(async ({ ctx, input }) => {
      // check user
      const user = await ctx.db.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No user with that session id finded.",
        });
      }

      // get icons
      const icons: {
        id: string;
        prompt: string;
        userId: string | null;
        keepPrivate: boolean;
        createdAt: Date;
      }[] = await ctx.db.icon.findMany({
        where: {
          userId: user.id,
        },
        skip: 12 * input.iconsSetN,
        take: 12,
        orderBy: {
          createdAt: "desc",
        },
      });
      if (icons.length === 0) {
        return [];
      }

      // retrive images
      const commands: GetObjectCommand[] = icons.map(
        (i) =>
          new GetObjectCommand({
            Bucket: env.IG_AWS_BUCKET,
            Key: i.id,
          }),
      );
      const responses = await Promise.all(
        commands.map(async (command) => {
          const base64EncodedBody: string | undefined = await (
            await s3_client.send(command)
          )?.Body?.transformToString("base64");
          if (!base64EncodedBody) {
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: "Failed to retrieve image",
            });
          }
          return base64EncodedBody;
        }),
      );

      // return icons
      return icons.map((i, index) => {
        return {
          ...i,
          image64: responses[index],
        };
      });
    }),
  getCommunityIcons: publicProcedure.query(async ({ ctx }) => {
    //get icons
    const icons: {
      id: string;
      prompt: string;
      userId: string | null;
      keepPrivate: boolean;
      createdAt: Date;
    }[] = await ctx.db.icon.findMany({
      take: 15,
      orderBy: {
        createdAt: "desc",
      },
      where: {
        keepPrivate: false,
      },
    });

    // retrive images
    const commands: GetObjectCommand[] = icons.map(
      (i) =>
        new GetObjectCommand({
          Bucket: env.IG_AWS_BUCKET,
          Key: i.id,
        }),
    );
    const responses = await Promise.all(
      commands.map(async (command) => {
        const base64EncodedBody: string | undefined = await (
          await s3_client.send(command)
        )?.Body?.transformToString("base64");
        if (!base64EncodedBody) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to retrieve image",
          });
        }
        return base64EncodedBody;
      }),
    );

    // return icons
    return icons.map((i, index) => {
      return {
        ...i,
        image64: responses[index],
      };
    });
  }),
  postToggleKeepPrivate: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // find icon
      const icon = await ctx.db.icon.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!icon) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No icon with that id finded.",
        });
      }
      //toggle keepPrivate ( = 'share with community')
      return await ctx.db.icon.update({
        where: {
          id: input.id,
        },
        data: {
          keepPrivate: !icon.keepPrivate,
        },
        select: {
          keepPrivate: true,
          id: true,
        },
      });
    }),
});
