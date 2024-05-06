import { getSession } from "next-auth/react";
import HeaderContent from "./headerContent";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Header() {
  const session = await getServerAuthSession();

  const getCredits = await api.user.getCredits();

  return (
    <header className="relative z-10 w-full bg-gray-100 bg-transparent px-8 py-4 dark:bg-gray-700">
      <HeaderContent
        sessionUser={session?.user}
        userCredits={getCredits.credits}
      />
    </header>
  );
}
