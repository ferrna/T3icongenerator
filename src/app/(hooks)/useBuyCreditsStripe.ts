import { loadStripe } from "@stripe/stripe-js";
import { signIn, useSession } from "next-auth/react";
import { env } from "~/env";
import { api } from "~/trpc/react";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_API_KEY);

export enum SubscriptionType {
  Normal = "normal",
  Pro = "pro",
}
export function useBuyCredits() {
  const checkout = api.checkout.generatePaymentPage.useMutation();
  const session = useSession();

  return {
    buyCredits: async ({
      subscriptionType,
    }: {
      subscriptionType: SubscriptionType;
    }): Promise<void> => {
      if (!session.data) {
        await signIn("google", { callbackUrl: "/pricing" });
        return;
      }
      const response = await checkout.mutateAsync({ subscriptionType });
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({
        sessionId: response.id,
      });
    },
  };
}

/* For Stripe implementation.
In component use:
const { buyCredits } = useBuyCredits();
and <Button
      className="mt-2 self-center text-lg sm:self-start md:text-base"
      onClick={() =>
        buyCredits({ subscriptionType: SubscriptionType.Pro })
    or  buyCredits({ subscriptionType: SubscriptionType.Normal })
      }
    >
      Buy
    </Button>
*/
