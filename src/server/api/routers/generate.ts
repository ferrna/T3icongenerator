import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import OpenAI from "openai";
import { env } from "~/env";

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

async function generateIcon(prompt: string): Promise<string | undefined> {
  if (env.MOCK_DALLE === "true") {
    return "https://oaidalleapiprodscus.blob.core.windows.net/private/org-rP9tYNZdnt3y4y0dWwnnOu0e/user-aBWiiq0jmXVfAM0tw2rClQJP/img-vddV9PRLu6mt5g9SqjD2L6m3.png?st=2024-04-28T23%3A59%3A32Z&se=2024-04-29T01%3A59%3A32Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-04-28T23%3A09%3A44Z&ske=2024-04-29T23%3A09%3A44Z&sks=b&skv=2021-08-06&sig=tiRfyDHJ6TOo5BHKpVuPgRiIFXQZ/P503quHlxf6LTk%3D";
  } else {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });
    console.log(response);
    return response.data[0]?.url;
  }
}

export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(z.object({ prompt: z.string().min(1) }))
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

      const image_url = await generateIcon(input.prompt);
      return {
        imageUrl: image_url,
      };
    }),
});
