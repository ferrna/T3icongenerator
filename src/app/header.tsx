import HeaderContent from "./headerContent";
import { getServerAuthSession } from "~/server/auth";

export default async function Header() {
  const session = await getServerAuthSession();

  return (
    <header className="relative z-10 w-full bg-gray-100 bg-transparent px-8 py-2 dark:bg-gray-900">
      <HeaderContent sessionUser={session?.user} />
    </header>
  );
}
