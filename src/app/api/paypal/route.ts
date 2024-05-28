import { NextApiResponse } from "next";
import { generateAccessToken, handleResponse } from "./helpers";
import { getServerAuthSession } from "~/server/auth";

const base = "https://api-m.sandbox.paypal.com";

type Subscription = "normal" | "pro";

interface CartData {
  name: string;
  quantity: number;
  orderCost: string;
  description: string;
}

const createCartData = (paymentType: Subscription): CartData => {
  if (paymentType === "normal") {
    return {
      name: "normal",
      quantity: 1,
      orderCost: "5",
      description: "100 credits",
    };
  }
  if (paymentType === "pro") {
    return {
      name: "pro",
      quantity: 1,
      orderCost: "12",
      description: "250 credits",
    };
  }
  throw new Error("Invalid payment type");
};

const createOrder = async (cart: {
  name: string;
  description: string;
  quantity: number;
  orderCost: string;
}) => {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        items: [
          {
            name: cart.name,
            description: cart.description,
            quantity: cart.quantity,
            unit_amount: { currency_code: "USD", value: cart.orderCost },
          },
        ],
        amount: {
          currency_code: "USD",
          value: cart.orderCost,
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: cart.orderCost,
            },
          },
        },
      },
    ],
  };
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};

const handler = async (request: Request, response: NextApiResponse) => {
  if (request.method === "POST") {
    const session = await getServerAuthSession();
    if (!session?.user) {
      throw new Error("User has not been logged.");
    }

    const body = await request.json();
    const { paymentType } = body;
    const cartData = createCartData(paymentType);
    try {
      const { jsonResponse, httpStatusCode } = await createOrder(cartData);
      return new Response(JSON.stringify(jsonResponse), {
        status: httpStatusCode,
        headers: {
          message: `Checkout session completed.`,
        },
      });
    } catch (err) {
      let message = "Error processing checkout session.";
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
