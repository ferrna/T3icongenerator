"use client";
import React, { useState } from "react";
import { env } from "~/env";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";

// Renders errors or successfull transactions on the screen.
function Message({ content }: { content: string }) {
  return <p>{content}</p>;
}

interface CreateOrderResponse {
  id: string;
}
interface CreateOrderResponseError {
  details: { issue: string; description: string }[];
  debug_id: string;
}
interface CaptureOrderResponse {
  id: string;
  purchase_units: [{ payments: { captures: [{ id: string }] } }];
  payer: {
    name: { given_name: string; surname: string };
    email_address: string;
  };
}
interface CaptureOrderResponseError {
  details: { issue: string; description: string }[];
  debug_id: string;
}

export default function PayPalButtonsProvider({
  paymentType,
}: {
  paymentType: string;
}) {
  const initialOptions = {
    clientId: `${env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`,
    currency: "USD",
    "data-page-type": "product-details",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
  };
  const [message, setMessage] = useState("");
  const router = useRouter();
  return (
    <div className="sm:w-[400px]">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
            color: "gold",
            label: "paypal",
          }}
          onCancel={(data) => {
            //window.location.assign("/your-error-page-here");
            alert("Payment cancelled");
          }}
          createOrder={async () => {
            try {
              const response = await fetch("/api/paypal", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ paymentType }),
              });

              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              const orderData: CreateOrderResponse | CreateOrderResponseError =await response.json();

              if ("id" in orderData) {
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];
                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);
                throw new Error(errorMessage);
              }
            } catch (err) {
              console.error(err);
              let message = "Error: Could not initiate PayPal Checkout.";
              if (err instanceof Error) message = err.message;
              setMessage(`Could not initiate PayPal Checkout...${message}`);
              return message;
            }
          }}
          onApprove={async (data, actions) => {
            try {
              const response = await fetch(
                `/api/paypal/capture?orderId=${data.orderID}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ paymentType }),
                },
              );

              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              const orderData:CaptureOrderResponse| CaptureOrderResponseError = await response.json();
              // Three cases to handle:
              //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              //   (2) Other non-recoverable errors -> Show a failure message
              //   (3) Successful transaction -> Show confirmation or thank you message

              if ("details" in orderData) {
                const errorDetail = orderData?.details?.[0];
                if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                  // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                  // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                  return actions.restart();
                } else if (errorDetail) {
                  // (2) Other non-recoverable errors -> Show a failure message
                  throw new Error(
                    `${errorDetail.description} (${orderData.debug_id})`,
                  );
                }
              } else {
                // (3) Successful transaction -> Show confirmation or thank you message

                // Or go to another URL:  actions.redirect('thank_you.html');

                console.log(
                  "Capture result",
                  orderData,
                  JSON.stringify(orderData, null, 2),
                );
                const transaction =
                  orderData.purchase_units[0].payments.captures[0];
                const full_name =
                  orderData.payer.name.given_name +
                  " " +
                  orderData.payer.name.surname;
                const email_address = orderData.payer.email_address;
                router.push(
                  `/checkout/success?transaction=${transaction.id}&fullName=${full_name}&emailAddress=${email_address}`,
                );
              }
            } catch (err) {
              console.error(err);
              let message = "Error: Could not process PayPal Checkout.";
              if (err instanceof Error) message = err.message;
              setMessage(
                `Sorry, your transaction could not be processed...${message}`,
              );
              return;
            }
          }}
        />
      </PayPalScriptProvider>

      <Message content={message} />
    </div>
  );
}
