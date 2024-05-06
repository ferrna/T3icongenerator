"use client";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { SubscriptionType, useBuyCredits } from "./(hooks)/useBuyCredits";
import { Button } from "./_components/Button";
import { PrimaryLink } from "./_components/PrimaryLink";
import { RefreshCwIcon } from "lucide-react";
import React from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { unstable_noStore } from "next/cache";

function DropdownUserListItem(
  props: React.ComponentPropsWithoutRef<"li"> & { href?: string },
) {
  return (
    <li>
      <PrimaryLink
        href={props.href || "/"}
        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
      >
        {props.children}
      </PrimaryLink>
    </li>
  );
}

function DropdownUser({ showDropdown }: { showDropdown: boolean }) {
  unstable_noStore();
  return (
    <div
      className={clsx(
        "absolute right-0 top-full z-10 w-44 translate-y-3 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-800",
        { hidden: !showDropdown },
      )}
    >
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        <li>
          <DropdownUserListItem href="/dashboard">
            Dashboard
          </DropdownUserListItem>
        </li>
        <li>
          <DropdownUserListItem href="/settings">Settings</DropdownUserListItem>
        </li>
        <li>
          <DropdownUserListItem href="/">
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
          </DropdownUserListItem>
        </li>
      </ul>
    </div>
  );
}

export default function HeaderContent({
  sessionUser,
  userCredits,
}: {
  sessionUser?: any;
  userCredits?: number;
}) {
  const isLoggedIn = !!sessionUser;
  const { buyCredits } = useBuyCredits({
    subscriptionType: SubscriptionType.Normal,
  });
  const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
  const query = usePathname();

  React.useEffect(() => {
    setShowDropdown(false);
  }, [query]);

  return (
    <div className="flex items-center justify-between">
      <aside className="flex items-center gap-6">
        <PrimaryLink
          href="/"
          className="flex min-w-[60px] cursor-pointer items-center
          text-xl font-medium"
        >
          <Image src="/" alt="logo" width={40} height={40} />
          <span className="hidden pl-1 tracking-tight md:block">
            Icon Generator
          </span>
        </PrimaryLink>
        <ul className="flex gap-4">
          <li>
            <PrimaryLink href="/generate">Generate</PrimaryLink>
          </li>
          <li>
            <PrimaryLink href="/browse">Browse</PrimaryLink>
          </li>
        </ul>
      </aside>
      <aside className="flex items-center gap-4">
        {isLoggedIn && userCredits && (
          <span className="flex items-center gap-1 text-sm text-gray-300">
            <RefreshCwIcon size={18} color="#d6d6d6" strokeWidth={1.25} />
            {userCredits} credits left
          </span>
        )}
        {/* TODO: if is not logged redirect to login */}
        <Button onClick={buyCredits}>Buy Credits</Button>
        {sessionUser && isLoggedIn ? (
          <div className="flex items-center gap-3">
            <div
              className="relative flex items-center"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <Image
                src={sessionUser?.image || ""}
                alt=""
                className="cursor-pointer rounded-full"
                width={30}
                height={30}
              />
              <DropdownUser showDropdown={showDropdown} />
            </div>
          </div>
        ) : (
          <button onClick={() => signIn()} className="cursor-pointer">
            &nbsp; Sign In
          </button>
        )}
      </aside>
    </div>
  );
}
