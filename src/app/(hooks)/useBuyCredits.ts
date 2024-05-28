import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export enum SubscriptionType {
  Normal = "normal",
  Pro = "pro",
}
export function useBuyCredits() {
  const session = useSession();
  const router = useRouter();
  return {
    buyCredits: async ({
      subscriptionType,
    }: {
      subscriptionType: SubscriptionType;
    }): Promise<void> => {
      if (!session.data) {
        await signIn("google", {
          callbackUrl: `/checkout?paymentType=${subscriptionType}`,
        });
        return;
      } else {
        router.push(`/checkout?paymentType=${subscriptionType}`);
      }
    },
  };
}
