"use client";
import { CheckIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "~/app/_components/Button";
import { api } from "~/trpc/react";

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const fullName = searchParams.get("fullName");
  const transaction = searchParams.get("transaction");
  const emailAddress = searchParams.get("emailAddress");
  if (!transaction) return null;

  const { data: creditsBalance, isPending } = api.user.getCredits.useQuery();

  return (
    <section className="flex min-h-screen w-full px-4 pb-28 pt-10 md:pb-32 md:pt-12 lg:px-28">
      <article className="container mx-auto flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col items-center gap-4 rounded-md bg-slate-300 p-6 text-center shadow dark:bg-slate-800">
          <p className="rounded-full">
            <CheckIcon color="green" strokeWidth={2} size={40} />
          </p>
          <h1 className="text-3xl font-semibold text-slate-800 dark:text-slate-100">
            Success.
          </h1>
          <p className="rounded-lg bg-slate-400 px-2 py-1 dark:bg-slate-600">{`Thank you ${fullName}!`}</p>
          <div className="px-2 py-1">
            <p>A confirmation email has been sent to</p>
            <p className="rounded-lg bg-slate-400 px-2 py-1 dark:bg-slate-600">
              {emailAddress}
            </p>
          </div>
          <p className="translate-y-1">
            Your new balance: {isPending ? "" : "  " + creditsBalance?.credits}{" "}
            credits
          </p>
          <Link href="/generate">
            <Button className="mt-4 w-max px-8">
              <ThumbsUpIcon className="inline" /> OK
            </Button>
          </Link>
        </div>
      </article>
    </section>
  );
}
