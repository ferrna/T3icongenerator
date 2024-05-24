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
}

function IconInfo({
  data,
  setShowInfo,
  isPrivate,
  setIsPrivate,
  helperToggleKeepPrivate,
  toggleKeepPrivateIsPending,
}: {
  data: IconWithImage64 | null;
  setShowInfo: React.Dispatch<React.SetStateAction<{ id: string | null }>>;
  isPrivate: boolean;
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
  helperToggleKeepPrivate: (id: string) => void;
  toggleKeepPrivateIsPending: boolean;
}) {
  useEffect(() => {
    if (data) {
      setIsPrivate(!data.keepPrivate);
    }
  }, [data]);

  if (data === null) return;
  const handleDownload = () => {
    const element = document.createElement("a");
    element.href = `data:image/png;base64,${data?.image64 ?? ""}`;
    element.download = `image_${data.id}.png`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleKeepPrivate = (e: React.ChangeEvent<HTMLInputElement>) => {
    helperToggleKeepPrivate(data.id!);
    setIsPrivate(!isPrivate);
  };

  return (
    <div
      className="relative mt-16 flex w-full flex-col items-center gap-10 p-2 md:flex-row md:items-stretch md:gap-4"
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
        className="aspect-square self-center rounded-lg shadow-sm"
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
        <div className="-mt-1 px-6 text-lg italic">
          <p>{data.prompt}</p>
          <div className="flex justify-center pt-2 text-base text-gray-700 md:gap-12 dark:text-[#d6d6d6]">
            <span>Share with community</span>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={handleKeepPrivate}
              disabled={toggleKeepPrivateIsPending}
            />
          </div>
        </div>
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

export default function CollectionContent() {
  const [showInfo, setShowInfo] = useState<{ id: string | null }>({ id: null });
  const [userIconsI, setUserIcons] = useState<
    typeof userIcons | undefined | null
  >(null);
  const [iconsSetN, setIconsSetN] = useState<number>(0);
  const [isPrivate, setIsPrivate] = useState(false);

  const showMoreButtonRef = useRef<HTMLButtonElement>(null);

  const {
    isPending,
    isError,
    data: userIcons,
    error,
  } = api.icons.getIcons.useQuery({ iconsSetN });

  const { mutate, isPending: toggleKeepPrivateIsPending } =
    api.icons.postToggleKeepPrivate.useMutation({
      onSuccess() {
        console.log("mutation finished");
      },
    });
  const helperToggleKeepPrivate = (id: string) => {
    mutate({ id });
  };

  useEffect(() => {
    isPending === false &&
      userIcons &&
      setUserIcons([...(userIconsI ?? []), ...userIcons]);
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
      userIconsI?.map((data: IconWithImage64) => {
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
        {renderIcons(userIconsI ?? [])}
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
            ) ?? null
          }
          setShowInfo={setShowInfo}
          isPrivate={isPrivate}
          setIsPrivate={setIsPrivate}
          helperToggleKeepPrivate={helperToggleKeepPrivate}
          toggleKeepPrivateIsPending={toggleKeepPrivateIsPending}
        />
      )}
    </div>
  );
}
