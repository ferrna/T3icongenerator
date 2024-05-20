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
import { Session } from "node_modules/next-auth/core/types";
import { api } from "~/trpc/react";

function DropdownUserListItem(
  props: React.ComponentPropsWithoutRef<"li"> & { href?: string },
) {
  const { href, ...propsWithoutHref } = props;
  return (
    <li {...propsWithoutHref}>
      <PrimaryLink
        href={href ?? "/"}
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
        <DropdownUserListItem href="/dashboard">Dashboard</DropdownUserListItem>

        <DropdownUserListItem href="/settings">Settings</DropdownUserListItem>

        <DropdownUserListItem
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          Sign Out
        </DropdownUserListItem>
      </ul>
    </div>
  );
}

export default function HeaderContent({
  sessionUser,
}: {
  sessionUser?: Session["user"];
}) {
  const { data: getCredits, error = "" } = sessionUser
    ? api.user.getCredits.useQuery(undefined, {
        refetchInterval: 50000,
      })
    : { data: { credits: 2 } };
  const userCredits = getCredits?.credits;
  const isLoggedIn = !!sessionUser;
  /* TODO: pass subscriptionType on call, and implement the hook on pricing page,
  redirect to login and back if not logged in */
  const { buyCredits } = useBuyCredits({
    subscriptionType: SubscriptionType.Normal,
  });
  const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
  const query = usePathname();

  React.useEffect(() => {
    setShowDropdown(false);
  }, [query]);

  return (
    <div className="flex max-w-[1440px] items-center justify-between 2xl:mx-auto">
      <aside className="flex items-center gap-6">
        <PrimaryLink
          href="/"
          className="flex min-w-[60px] cursor-pointer items-center
          text-xl font-medium"
        >
          <Image src="/ig-icon.png" alt="ig-logo" width={40} height={40} />
          <span className="hidden pl-1 tracking-tight md:block">
            Icon Generator
          </span>
        </PrimaryLink>
        <ul className="flex gap-4">
          <li>
            <PrimaryLink href="/generate">Generate</PrimaryLink>
          </li>
          <li>
            <PrimaryLink href="/community">Community</PrimaryLink>
          </li>
          {isLoggedIn && (
            <li>
              <PrimaryLink href="/collection">My Icons</PrimaryLink>
            </li>
          )}
          <li>
            <PrimaryLink href="/pricing">Pricing</PrimaryLink>
          </li>
        </ul>
      </aside>
      <aside className="flex items-center gap-4">
        {isLoggedIn && userCredits && !Number.isNaN(userCredits) && (
          <span className="flex items-center gap-1 text-sm text-gray-700 dark:text-[#d6d6d6]">
            <RefreshCwIcon size={18} strokeWidth={1.25} />
            {userCredits} credits left
          </span>
        )}
        <Button onClick={buyCredits}>Buy Credits</Button>
        {sessionUser && isLoggedIn ? (
          <div className="flex items-center gap-3">
            <div
              className="relative flex items-center"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <Image
                src={sessionUser?.image ?? ""}
                alt="user image"
                className="cursor-pointer rounded-full"
                width={30}
                height={30}
              />
              <DropdownUser showDropdown={showDropdown} />
            </div>
          </div>
        ) : (
          <button
            onClick={async () => await signIn()}
            className="cursor-pointer"
          >
            &nbsp; Sign In
          </button>
        )}
      </aside>
    </div>
  );
}
