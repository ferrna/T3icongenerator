import { NextApiResponse } from "next";
import { generateAccessToken, handleResponse } from "../helpers";
import { db } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";
import { User } from "@prisma/client";
import { Session } from "next-auth";
const base = "https://api-m.sandbox.paypal.com";

type PaymentType = "normal" | "pro";

const getCreditsPurchased = (paymentType: PaymentType): number => {
  if (paymentType === "normal") {
    return 100;
  }
  if (paymentType === "pro") {
    return 250;
  }
  throw new Error("Invalid payment type");
};

async function submitRefund(captureId: string) {
  const accessToken = await generateAccessToken();
  // update to https://api-m.paypal.com
  const url = `${base}/v2/payments/captures/${captureId}/refund`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Error refunding payment:", error);
    throw new Error(error);
  }

  const refundData = await response.json();
  console.log("Refund successful:", refundData);
  throw new Error("Failed to update user credits. A refund has been made.");
}

async function updateUser(paymentType: PaymentType, session: Session | null) {
  const userBefore: User | null = await db.user.findUnique({
    where: { id: session?.user.id },
  });
  const { credits: beforeCredits } = userBefore || { credits: null };

  // update user credits
  const update = await db.user.update({
    where: { id: session?.user.id },
    data: {
      credits: {
        increment: getCreditsPurchased(paymentType),
      },
    },
  });

  const userAfter: User | null = await db.user.findUnique({
    where: { id: session?.user.id },
  });
  const { credits: afterCredits } = userAfter || { credits: null };
  if (!update && beforeCredits === afterCredits) {
    return { error: "Failed to update user" };
  } else {
    return { ok: "Updated" };
  }
}

const captureOrder = async (orderID: string) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return handleResponse(response);
};

const handler = async (request: Request, response: NextApiResponse) => {
  if (request.method === "POST") {
    const body = await request.json();
    const { paymentType } = body;

    const url = new URL(request.url);
    const orderId = url.searchParams.get("orderId");
    try {
      if (!orderId) throw new Error("Expected an order ID to be passed.");

      const { jsonResponse, httpStatusCode } = await captureOrder(orderId);
      if (jsonResponse.status === "COMPLETED") {
        const session = await getServerAuthSession();
        const update = await updateUser(paymentType, session);

        if (update?.error) {
          await submitRefund(orderId);
        }
      }

      return new Response(JSON.stringify(jsonResponse), {
        status: httpStatusCode,
        headers: {
          message: `Checkout session completed.`,
        },
      });
    } catch (err) {
      let message = "Failed to capture order.";
      if (err instanceof Error) message = err.message;
      return new Response(JSON.stringify(response), {
        status: 400,
        headers: {
          message: `Error: ${message}`,
        },
      });
    }
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
