"use client";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { Button } from "../_components/Button";
import { PrimaryLink } from "../_components/PrimaryLink";
import { MenuIcon, RefreshCwIcon } from "lucide-react";
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
    <li className="px-4 py-2 text-center" {...propsWithoutHref}>
      <PrimaryLink
        href={href ?? "/"}
        className="block hover:bg-gray-100 dark:hover:bg-gray-600"
      >
        {props.children}
      </PrimaryLink>
    </li>
  );
}

function DropdownUser({
  showDropdownUser,
  userCredits,
}: {
  showDropdownUser: boolean;
  userCredits: number | undefined;
}) {
  unstable_noStore();
  return (
    <div
      className={clsx(
        "absolute right-0 top-full z-10 w-44 translate-y-3 divide-y divide-gray-100 rounded-lg rounded-tr-none bg-white shadow dark:bg-gray-800",
        { hidden: !showDropdownUser },
      )}
    >
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        <DropdownUserListItem href="/#" className="py-1">
          {userCredits && !Number.isNaN(userCredits) && (
            <span className="flex justify-center gap-1 text-sm text-gray-700 dark:text-[#d6d6d6]">
              <RefreshCwIcon size={18} strokeWidth={1.25} />
              {userCredits} credits left
            </span>
          )}
        </DropdownUserListItem>
        <DropdownUserListItem href="/collection">My Icons</DropdownUserListItem>

        <DropdownUserListItem href="/pricing">
          <Button className="w-full">Buy Credits</Button>
        </DropdownUserListItem>

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

function DropdownMenu({
  showDropdownMenu,
  isLoggedIn,
}: {
  showDropdownMenu: boolean;
  isLoggedIn: boolean | undefined;
}) {
  unstable_noStore();
  return (
    <div
      className={clsx(
        "absolute left-0 top-full z-10 w-44 translate-y-3 divide-y divide-gray-100 rounded-lg rounded-tl-none bg-white shadow dark:bg-gray-800",
        { hidden: !showDropdownMenu },
      )}
    >
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        <DropdownUserListItem href="/generate">Generate</DropdownUserListItem>
        <DropdownUserListItem href="/community">Community</DropdownUserListItem>
        {isLoggedIn && (
          <DropdownUserListItem href="/collection">
            My Icons
          </DropdownUserListItem>
        )}
        <DropdownUserListItem href="/pricing">Pricing</DropdownUserListItem>
      </ul>
    </div>
  );
}

export default function HeaderMobile({
  sessionUser,
}: {
  sessionUser?: Session["user"];
}) {
  const { data: getCredits } = sessionUser
    ? api.user.getCredits.useQuery(undefined, {
        refetchInterval: 50000,
      })
    : { data: { credits: 2 } };
  const [showDropdownUser, setShowDropdownUser] =
    React.useState<boolean>(false);
  const [showDropdownMenu, setShowDropdownMenu] =
    React.useState<boolean>(false);
  const query = usePathname();

  const userCredits = getCredits?.credits;
  const isLoggedIn = !!sessionUser;

  React.useEffect(() => {
    setShowDropdownUser(false);
    setShowDropdownMenu(false);
  }, [query]);

  return (
    <div className="flex items-center justify-between sm:hidden">
      <aside className="flex items-center gap-4">
        <div
          className="relative flex items-center"
          onClick={() => setShowDropdownMenu(!showDropdownMenu)}
        >
          <div
            className={`rounded-full ${showDropdownMenu ? "bg-none" : "bg-slate-400/70"} p-2`}
          >
            <MenuIcon size={18} strokeWidth={1.25} />
          </div>
          <DropdownMenu
            showDropdownMenu={showDropdownMenu}
            isLoggedIn={isLoggedIn}
          />
        </div>
        <PrimaryLink
          href="/"
          className="flex min-w-[60px] cursor-pointer items-center
          text-xl font-medium"
        >
          <Image src="/ig-icon.png" alt="ig-logo" width={40} height={40} />
          <span className="text-base text-gray-400">IG IA</span>
        </PrimaryLink>
      </aside>
      <aside className="flex items-center">
        {sessionUser && isLoggedIn ? (
          <div
            className="relative"
            onClick={() => setShowDropdownUser(!showDropdownUser)}
          >
            <Image
              src={sessionUser?.image ?? ""}
              alt="user image"
              className={`cursor-pointer rounded-full ${!showDropdownUser ? "border-none" : "border border-slate-400/70"}`}
              width={30}
              height={30}
            />
            <DropdownUser
              showDropdownUser={showDropdownUser}
              userCredits={userCredits}
            />
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
