"use client";

import { Button } from "../_components/Button";
import { SubscriptionType, useBuyCredits } from "../(hooks)/useBuyCredits";

export function PricingContent() {
  const { buyCredits } = useBuyCredits();

  return (
    <section className="flex w-full from-[#c8c9ce] via-[#c8cace] via-60% to-[#c8cace] px-4 pb-16 pt-10 md:bg-white md:pb-32 md:pt-12 lg:px-28 dark:md:bg-gradient-to-r">
      <article className="container mx-auto flex flex-col items-center justify-center gap-6">
        <h2 className="text-center text-5xl font-bold text-slate-800 dark:text-gray-100 dark:md:text-slate-800">
          Pricing
        </h2>
        <p className="text-center text-lg text-slate-800 md:text-left dark:text-gray-100 dark:md:text-slate-800">
          Choose the plan that best fits your needs.
        </p>
        <div className="flex flex-col gap-8 p-4 sm:flex-row md:gap-12">
          <div className="flex flex-col items-center gap-4 rounded-lg bg-slate-300 p-6 pb-7 pt-5 text-center shadow-md dark:bg-slate-800">
            <h3 className="text-2xl font-medium">Normal</h3>
            <p className="py-1 text-5xl font-extrabold">$5</p>
            <span className="pt-2 text-lg">100 Credits</span>
            <span className="text-lg">0.08$ peer icon</span>

            <Button
              className="mt-2 self-center text-lg sm:self-start md:text-base"
              onClick={() =>
                buyCredits({ subscriptionType: SubscriptionType.Normal })
              }
            >
              Buy
            </Button>
          </div>
          <div className="flex scale-105 flex-col items-center gap-4 rounded-lg bg-slate-300 p-6 pb-7 pt-5 text-center shadow-md dark:bg-slate-800">
            <h3 className="text-2xl font-medium">Pro</h3>
            <p className="py-1 text-5xl font-extrabold">$12</p>
            <span className="pt-2 text-lg">250 Credits</span>
            <span className="text-lg">0.06$ peer icon</span>

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
