import Stripe from "stripe";
import type { NextApiResponse } from "next/";
import { env } from "../../../env";
import { db } from "../../../server/db";
import { headers } from "next/headers";

const stripe = new Stripe(env.STRIPE_API_SECRET, {
  apiVersion: "2024-04-10",
});

const getCreditsBySubsciption = (SubscriptionType: string) => {
  switch (SubscriptionType) {
    case "normal":
      return 100;
    case "pro":
      return 250;
    default:
      return 0;
  }
};

const handler = async (request: Request, response: NextApiResponse) => {
  if (request.method === "POST") {
    const body = await request.text();
    const sig = headers().get("stripe-signature")!;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (err) {
      let message = "Error processing webhook event.";
      if (err instanceof Error) message = err.message;
      return new Response(JSON.stringify(response), {
        status: 400,
        headers: {
          message: `Webhook Error: ${message}`,
        },
      });
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data
          .object as Stripe.Checkout.Session & {
          id: string;
          metadata: {
            userId: string;
            subscriptionType: string;
          };
        };
        console.log("here", checkoutSessionCompleted);
        await db.user.update({
          where: { id: checkoutSessionCompleted.metadata.userId },
          data: {
            credits: {
              increment: getCreditsBySubsciption(
                checkoutSessionCompleted.metadata.subscriptionType,
              ),
            },
          },
        });
        // Then define and call a function to handle the event checkout.session.completed
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        message: `Checkout session completed.`,
      },
    });
  } else {
    return new Response(JSON.stringify(response), {
      status: 405,
      headers: {
        Allow: "POST",
        message: "Method not Allowed",
      },
    });
  }
};

export { handler as GET, handler as POST };
