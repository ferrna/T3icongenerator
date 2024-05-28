"use client";
import { SubscriptionType, useBuyCredits } from "../(hooks)/useBuyCredits";
import { Button } from "../_components/Button";

export default function Pricing() {
  const { buyCredits } = useBuyCredits();

  return (
    <section className="flex min-h-screen w-full px-4 pb-28 pt-10 md:pb-32 md:pt-12 lg:px-28">
      <article className="container mx-auto flex flex-col items-center justify-center gap-6">
        <h2 className="text-center text-5xl font-semibold">Pricing</h2>
        <p className="text-center text-lg">
          Please choose the plan that best fits your needs.
        </p>
        <div className="flex flex-col gap-8 p-4 sm:flex-row md:gap-12">
          <div className="flex flex-col items-center gap-4 rounded-md bg-slate-300 p-6 pb-7 pt-5 text-center shadow dark:bg-slate-800">
            <h3 className="text-2xl font-medium">Normal</h3>
            <p className="py-1 text-5xl font-extrabold">$5</p>
            <span className="pt-2 text-lg">100 Credits</span>
            <span className="text-lg">0.05$ peer icon</span>
            <Button
              className="mt-2 self-center text-lg sm:self-start md:text-base"
              onClick={() =>
                buyCredits({ subscriptionType: SubscriptionType.Normal })
              }
            >
              Buy
            </Button>
          </div>
          <div className="flex scale-105 flex-col items-center gap-4 rounded-md bg-slate-300 p-6 pb-7 pt-5 text-center shadow dark:bg-slate-800">
            <h3 className="text-2xl font-medium">Pro</h3>
            <p className="py-1 text-5xl font-extrabold">$12</p>
            <span className="pt-2 text-lg">250 Credits</span>
            <span className="text-lg">0.04~$ peer icon</span>
            <Button
              className="mt-2 self-center text-lg sm:self-start md:text-base"
              onClick={() =>
                buyCredits({ subscriptionType: SubscriptionType.Pro })
              }
            >
              Buy
            </Button>
          </div>
        </div>
      </article>
    </section>
  );
}
