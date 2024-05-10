import HeaderContent from "./headerContent";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Header() {
  const session = await getServerAuthSession();
  const getCredits = session ? await api.user.getCredits() : { credits: 2 };

  return (
    <header className="sticky top-0 z-30 w-full border-t-0 border-t-cyan-900 border-b bg-gray-100 px-8 py-4 dark:border-b-[#2B3544] dark:bg-slate-900/75 
    backdrop-blur transition-colors duration-500 dark:border-b-slate-50/[0.06] supports-backdrop-blur:bg-white/95"
   >
      <HeaderContent
        sessionUser={session?.user}
        userCredits={getCredits.credits}
      />
    </header>
  );
}

/*  */
/* Header.getInitialProps = async ({ ctx }: { ctx: any }) => {
  const nonce = ctx.res.getHeader("x-nonce");
  return {
    nonce,
  };
}; */
