"use client";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function HeaderContent({ sessionUser }: { sessionUser?: any }) {
  const isLoggedIn = !!sessionUser;
  return (
    <div className="flex items-center justify-between">
      <Link
        href="/"
        className="text-ring dark:text-foreground flex min-w-[60px] cursor-pointer items-center
          text-xl font-medium hover:text-blue-400
          dark:hover:text-blue-400"
      >
        <Image src="/" alt="" width={40} height={40} />
        <span className="hidden pl-1 tracking-tight md:block">appname</span>
      </Link>
      <nav>
        {/* <button className="mr-2">
            <Link href="/browse">AI Icons</Link>
          </button> */}
      </nav>
      <div className="flex items-center gap-4">
        {sessionUser && isLoggedIn ? (
          <div className="flex items-center *:gap-2">
            <Image
              src={sessionUser?.image || ""}
              alt=""
              className="rounded-full"
              width={30}
              height={30}
            />{" "}
            <span>{sessionUser?.name}</span>
            <button
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
              className="cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button onClick={() => signIn()} className="cursor-pointer">
            &nbsp; Sign In
          </button>
        )}
      </div>
    </div>
  );
}
