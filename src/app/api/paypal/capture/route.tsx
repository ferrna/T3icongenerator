import { NextApiResponse } from "next";
import { generateAccessToken, handleResponse } from "../helpers";
import { db } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";
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
        const update = await db.user.update({
          where: { id: session?.user.id },
          data: {
            credits: {
              increment: getCreditsPurchased(paymentType),
            },
          },
        });

        if (!update) {
          if (
            jsonResponse.purchase_units[0].payments.captures[0].links[2].rel ===
            "refund"
          ) {
            const url =
              jsonResponse.purchase_units[0].payments.captures[0].links[2].href;
            const accessToken = await generateAccessToken();
            await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            });
          }
          throw new Error("Failed to update user credits.");
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
