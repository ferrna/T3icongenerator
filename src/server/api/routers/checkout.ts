import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { env } from "~/env";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_API_SECRET, { apiVersion: "2024-04-10" });

export const checkoutRouter = createTRPCRouter({
  generatePaymentPage: protectedProcedure
    .input(z.object({ subscriptionType: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: env.PRICE_ID,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${env.HOST_URL}/?success=true`,
        cancel_url: `${env.HOST_URL}/?canceled=true`,
        metadata: {
          userId: ctx.session.user.id,
          subscriptionType: input?.subscriptionType,
        },
      });
    }),
});
