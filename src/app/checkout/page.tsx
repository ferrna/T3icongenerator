"use client";
import { useRouter, useSearchParams } from "next/navigation";
import PayPalButtonsProvider from "./PayPalButtonsProvider";

export default function Checkout() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentType = searchParams.get("paymentType");
  if (!paymentType) return router.push("/pricing");
  const cardInfo =
    paymentType === "pro"
      ? { name: "Pro", cost: "$12", numberOfCredits: "250" }
      : { name: "Normal", cost: "$5", numberOfCredits: "100" };
  return (
    <section className="flex min-h-screen w-full px-4 pb-28 pt-10 md:pb-32 md:pt-12 lg:px-28">
      <article className="container mx-auto flex flex-col items-center justify-center gap-6">
        <div className="flex p-4">
          <div className="flex flex-col items-center gap-4 rounded-md bg-slate-300 p-6 text-center shadow dark:bg-slate-800">
            <h3 className="text-2xl font-medium">{cardInfo.name}</h3>
            <p className="text-5xl font-extrabold">{cardInfo.cost}</p>
            <span className="text-lg">{cardInfo.numberOfCredits} credits</span>
          </div>
        </div>
        <div className="flex min-h-[170px] min-w-full flex-col items-center gap-4 rounded-md bg-slate-300 p-6 text-center shadow dark:bg-slate-800">
          <PayPalButtonsProvider paymentType={paymentType} />
        </div>
      </article>
    </section>
  );
}
