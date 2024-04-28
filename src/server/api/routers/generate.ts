import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const generateRouter = createTRPCRouter({
  generateIcon: publicProcedure
    .input(z.object({ prompt: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      console.log("here", input.prompt);

      return {
        msg: "generated icon",
      };
    }),
});
