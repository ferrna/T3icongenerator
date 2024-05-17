import HeaderContent from "./headerContent";
import { getServerAuthSession } from "~/server/auth";

export default async function Header() {
  const session = await getServerAuthSession();

  return (
    <header
      className="supports-backdrop-blur:bg-white/95 sticky top-0 z-30 w-full border-b border-t-0 border-t-cyan-900 bg-gray-100 px-8 py-4 backdrop-blur 
    transition-colors duration-500 dark:border-b-[#2B3544] dark:border-b-slate-50/[0.06] dark:bg-slate-900/75"
    >
      <HeaderContent sessionUser={session?.user} />
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
