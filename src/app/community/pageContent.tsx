"use client";
import { Icon } from "@prisma/client";
import { DownloadIcon, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "../_components/Button";
import { PrimaryLink } from "../_components/PrimaryLink";
import { signIn } from "next-auth/react";

interface IconWithImage64 extends Icon {
  image64: string | undefined;
}

function IconInfo({ data }: { data: IconWithImage64 | null }) {
  if (data === null) return;
  const handleDownload = () => {
    const element = document.createElement("a");
    element.href = `data:image/png;base64,${data?.image64 ?? ""}`;
    element.download = `image_${data.id}.png`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div
      className="mt-16 flex w-full flex-col items-center gap-10 md:flex-row md:items-stretch md:gap-4"
      id="icon-info-container-co"
    >
      <img
        src={`data:image/png;base64,${data?.image64 ?? ""}`}
        alt={data.prompt ?? ""}
        width={160}
        height={160}
        className="rounded-lg shadow-sm"
      />
      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute inset-x-0 inset-y-0 -z-10 flex items-center">
          <img
            src="/quotation-marks.png"
            alt="quotation-marks png"
            className="mx-auto opacity-30"
            width={60}
          />
        </div>
        <p className="-mt-1 px-6 text-lg italic">{data.prompt}</p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <p className="text-lg md:hidden">Download icon</p>
        <Button
          title="Download Icon"
          className="relative w-auto after:absolute after:left-1/2 after:-translate-x-1/2 after:pt-4 after:text-center after:leading-tight after:text-gray-800 md:after:content-['Download_icon'] dark:after:text-gray-300"
        >
          <DownloadIcon width={40} height={40} onClick={handleDownload} />
        </Button>
      </div>
    </div>
  );
}

function switchPromptToAction(iconsCount: number) {
  switch (iconsCount) {
    case -1:
      return (
        <p className="text-ring dark:text-foreground cursor-pointer text-blue-500 hover:text-blue-400 dark:text-blue-300 dark:hover:text-blue-400">
          <button
            onClick={async () =>
              await signIn("google", { callbackUrl: "/generate" })
            }
          >
            your firsts Icons!
          </button>
        </p>
      );
    case 0:
      return (
        <PrimaryLink
          href="/generate"
          className="text-blue-500 dark:text-blue-300"
        >
          your firsts Icons!
        </PrimaryLink>
      );
    default:
      return (
        <PrimaryLink
          href="/generate"
          className="text-blue-500 dark:text-blue-300"
        >
          more Icons!
        </PrimaryLink>
      );
  }
}

export default function CommunityContent({
  userIconsCount,
}: {
  userIconsCount: number;
}) {
  const [showInfo, setShowInfo] = useState<{ id: string | null }>({ id: null });
  const {
    isPending,
    isError,
    data: userIcons,
    error,
  } = api.icons.getCommunityIcons.useQuery(undefined, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 1000 * 60 * 60 * 24, //24h
  });
  const renderQueryState = () => {
    if (isPending) {
      return (
        <li className="col-span-4 self-center justify-self-center">
          <LoaderCircle
            color="#17977d"
            strokeWidth={1.25}
            className="mx-auto mt-6 animate-spin"
          />
          <br />
          <span className="flex -translate-y-2 items-center gap-1 text-sm text-gray-700 dark:text-[#d6d6d6]">
            {" "}
            Loading
          </span>
        </li>
      );
    }
    if (isError) {
      return <p>Error: {error.message}</p>;
    }
    return null;
  };
  const renderIcons = (icons: typeof userIcons) => {
    if (icons) {
      if (icons.length > 0) {
        return icons.map((icon: IconWithImage64) => (
          <li
            key={icon.id}
            onClick={() => setShowInfo({ id: icon.id })}
            className="cursor-pointer"
          >
            <a href="#icon-info-container-co">
              <img
                src={`data:image/png;base64,${icon?.image64 ?? ""}`}
                alt={icon.prompt ?? ""}
                className="w-full rounded-lg shadow-sm"
              />
            </a>
          </li>
        ));
      } else if (icons.length === 0) {
        return <p>No icons</p>;
      }
    }
    return null;
  };
  return (
    <div className="flex w-full flex-col">
      <ul className="grid w-full grid-cols-2 gap-2 text-lg sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
        {renderQueryState()}
        {renderIcons(userIcons)}
      </ul>
      {!isPending && (
        <div className="p-6 text-center">
          Have fun generating {switchPromptToAction(userIconsCount)}
        </div>
      )}
      {showInfo.id && userIcons && (
        <IconInfo data={userIcons?.find((i) => i.id === showInfo.id) ?? null} />
      )}
    </div>
  );
}
