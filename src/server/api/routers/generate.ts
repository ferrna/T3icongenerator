import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import OpenAI from "openai";
import { env } from "~/env";
import { image64 } from "~/app/(data)/base64image";
//@ts-ignore
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

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

async function generateIcon(prompt: string): Promise<string | undefined> {
  if (env.MOCK_DALLE === "true") {
    //return "https://oaidalleapiprodscus.blob.core.windows.net/private/org-rP9tYNZdnt3y4y0dWwnnOu0e/user-aBWiiq0jmXVfAM0tw2rClQJP/img-vddV9PRLu6mt5g9SqjD2L6m3.png?st=2024-04-28T23%3A59%3A32Z&se=2024-04-29T01%3A59%3A32Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-04-28T23%3A09%3A44Z&ske=2024-04-29T23%3A09%3A44Z&sks=b&skv=2021-08-06&sig=tiRfyDHJ6TOo5BHKpVuPgRiIFXQZ/P503quHlxf6LTk%3D";
    return image64;
  } else {
    const response = await openAI_client.images.generate({
      model: "dall-e-2",
      prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });

    return response.data[0]?.b64_json;
  }
}

function generateFinalPrompt(prompt: string, color: string = ""): string {
  const colorPart = color ? ` of color ${color}` : "";
  const finalPrompt = `${prompt}${colorPart}`;
  return finalPrompt;
}

export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(z.object({ prompt: z.string().min(1), color: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { count } = await ctx.db.user.updateMany({
        where: {
          id: ctx.session.user.id,
          credits: { gte: 1 },
        },
        data: {
          credits: { decrement: 1 },
        },
      });

      if (count <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You do not have enough credits",
        });
      }

      const finalPrompt = generateFinalPrompt(input.prompt, input?.color);
      // finalPrompt: 'an angry chicken of color orange'
      const image_64string = await generateIcon(finalPrompt);
      if (!image_64string) {
        /* TODO: give user credits */
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate image",
        });
      }

      const dbIcon = await ctx.db.icon.create({
        data: {
          prompt: input.prompt,
          userId: ctx.session.user.id,
        },
      });

      const command = new PutObjectCommand({
        Bucket: env.IG_AWS_BUCKET,
        Body: Buffer.from(image_64string, "base64"),
        Key: `${dbIcon.id}`,
        ContentType: "image/gif",
        ContentEncoding: "base64",
      });
      await s3_client.send(command);

      return {
        imageUrl: image_64string,
      };
    }),
});
