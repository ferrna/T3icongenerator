"use client";
import { Icon } from "@prisma/client";
import {
  CircleX,
  DownloadCloudIcon,
  DownloadIcon,
  LoaderCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "../_components/Button";

const iconsPerRequest = 12;

interface IconWithImage64 extends Icon {
  image64: string | undefined;
  id: string;
  prompt: string;
  userId: string | null;
  createdAt: Date;
}

function IconInfo({
  data,
  setShowInfo,
}: {
  data: IconWithImage64;
  setShowInfo: React.Dispatch<React.SetStateAction<{ id: string | null }>>;
}) {
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
      className="relative mt-16 flex w-full items-stretch gap-4 p-2"
      id="icon-info-container"
    >
      <div className="absolute right-0 top-0 flex -translate-y-1/2 items-center justify-center">
        <a
          href="#user-collection"
          className="rounded-full bg-gradient-to-b from-blue-400 to-blue-500 p-1"
          onClick={() => setShowInfo({ id: null })}
        >
          <CircleX size={20} strokeWidth={1.25} />
        </a>
      </div>
      <img
        src={`data:image/png;base64,${data?.image64 ?? ""}`}
        alt={data.prompt ?? ""}
        width={160}
        height={160}
        className="rounded-lg shadow-sm"
      />
      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute inset-x-0 inset-y-0 flex items-center">
          <img
            src="/quotation-marks.png"
            alt="quotation-marks png"
            className="mx-auto opacity-30"
            width={60}
          />
        </div>
        <p className="-mt-1 px-6 text-lg italic">{data.prompt}</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Button
          title="Download Icon"
          className="relative w-auto after:absolute after:left-1/2 after:-translate-x-1/2 after:pt-4 after:text-center after:leading-tight after:text-gray-700 after:content-['Download_png']"
        >
          <DownloadIcon width={40} height={40} onClick={handleDownload} />
        </Button>
      </div>
    </div>
  );
}

export default function CollectionContent() {
  const [showInfo, setShowInfo] = useState<{ id: string | null }>({ id: null });
  const [userIconsI, setUserIcons] = useState<any>(null);

  const [iconsSetN, setIconsSetN] = useState<number>(0);
  const {
    isPending,
    isError,
    data: userIcons,
    error,
  } = api.icons.getIcons.useQuery({ iconsSetN });
  const showMoreButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    userIcons && setUserIcons([...(userIconsI ?? []), ...userIcons]);
    console.log("here");
    if (userIcons && userIcons.length < iconsPerRequest) {
      showMoreButtonRef.current?.classList.add("hidden");
    }
  }, [userIcons]);

  const renderQueryState = () => {
    if (isPending) {
      return (
        <li className="col-span-4 self-center justify-self-center">
          <LoaderCircle
            color="#17977d"
            strokeWidth={1.25}
            className="mx-auto mt-6 animate-spin"
          />
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
            <a href="#icon-info-container">
              <img
                src={`data:image/png;base64,${icon?.image64 ?? ""}`}
                alt={icon.prompt ?? ""}
                className="w-full rounded-lg shadow-sm"
              />
            </a>
          </li>
        ));
      } else if (icons.length === 0) {
        return <p>You don&apos;t have any icons yet</p>;
      }
    }
    return null;
  };
  function handleShowMore(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIconsSetN(iconsSetN + 1);
  }
  const handleDownloadCollection = () => {
    if (confirm("Download all my icons")) {
      userIconsI.map((data: IconWithImage64) => {
        const element = document.createElement("a");
        element.href = `data:image/png;base64,${data?.image64 ?? ""}`;
        element.download = `${data.id}.png`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      });
    }
  };
  return (
    <div className="flex w-full flex-col" id="user-icons">
      <ul className="grid w-full grid-cols-2 gap-2 text-lg sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
        {userIconsI && (
          <li className="flex items-center justify-center">
            <Button
              title="Download Collection"
              className="relative w-auto after:absolute after:left-1/2 after:hidden after:-translate-x-1/2 after:pt-4 after:text-center
      after:leading-tight after:text-gray-700 after:content-['Download_Collection'] hover:after:inline-block dark:after:text-slate-200"
              onClick={handleDownloadCollection}
            >
              <DownloadCloudIcon width={40} height={40} />
            </Button>
          </li>
        )}
        {renderIcons(userIconsI)}
        {renderQueryState()}
      </ul>
      {userIconsI && (
        <div className="flex w-full justify-center p-4">
          <Button
            onClick={handleShowMore}
            ref={showMoreButtonRef}
            disabled={isPending}
            className="opacity-80"
          >
            {isPending ? (
              <LoaderCircle
                color="grey"
                strokeWidth={1}
                className="mx-auto animate-spin"
              />
            ) : (
              "... Load more"
            )}
          </Button>
        </div>
      )}
      {showInfo.id && userIconsI && (
        <IconInfo
          data={
            userIconsI?.find(
              (i: (typeof userIconsI)[0]) => i.id === showInfo.id,
            )!
          }
          setShowInfo={setShowInfo}
        />
      )}
    </div>
  );
}
