import Image from "next/image";
import Link from "next/link";
import { Button } from "./_components/Button";
import {
  DownloadCloudIcon,
  MicroscopeIcon,
  ScanSearchIcon,
} from "lucide-react";
import { PricingContent } from "./_homepage/clientComponents";

const HeroContent = () => {
  return (
    <section className="container mx-auto grid min-h-[calc(100vh-73px)] grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 sm:gap-8 md:gap-12 md:px-0 md:py-16 lg:px-28 lg:py-20 xl:py-28">
      <aside className="flex flex-col gap-2">
        <h1 className="text-5xl font-bold tracking-tight lg:mt-4">
          Generate Icons with a click of a button
        </h1>
        <p className="text-2xl">
          Craft unique and tailored icons with the power of IA.
        </p>
        <Button className="mt-8 self-center text-lg sm:self-start md:text-base">
          <Link href="/generate">Start generating</Link>
        </Button>
      </aside>
      <Image
        src="/landing-banner-dark.png"
        alt="a bunch of nice looking icons"
        className="order-first -mt-2 hidden place-self-center rounded drop-shadow-behind-white sm:order-last sm:place-self-start dark:block dark:drop-shadow-behind-light"
        width={500}
        height={333}
        priority={true}
      />
      <Image
        src="/landing-banner-removebg.png"
        alt="a bunch of nice looking icons"
        className="order-first -mt-2 place-self-center rounded drop-shadow-behind-white sm:order-last sm:place-self-start dark:hidden dark:drop-shadow-behind-light"
        width={500}
        height={333}
        priority={true}
      />
    </section>
  );
};

const ShowSectionContent = () => {
  return (
    <section
      className="flex w-full from-[#c8c9ce] via-[#c8cace] via-60% to-[#c8cace] px-4 pb-16 pt-10
    md:bg-white md:pb-32 md:pt-12 lg:px-28 dark:md:bg-gradient-to-r"
    >
      <article className="container mx-auto grid grid-cols-5">
        <picture className="align-center col-span-5 flex justify-center pr-6 md:col-span-3">
          <img
            src="/showbox.png"
            alt="icons-show image"
            className="w-full rounded-md"
          />
        </picture>
        <aside className="col-span-5 flex flex-grow flex-col gap-10 pt-9 md:col-span-2">
          <h2 className="relative mx-auto text-center text-5xl font-bold text-slate-800 before:absolute before:right-full before:pr-2 before:content-['♦']">
            Craft variants
          </h2>
          <p className="text-center text-lg text-slate-800">
            Choose the style you prefer and{" "}
            <u className="cursor-pointer hover:text-slate-700">
              craft some variants!
            </u>
          </p>
        </aside>
      </article>
    </section>
  );
};

const ActionsSectionContent = () => {
  const actions = [
    {
      title: "Access and download your previously created icons.",
      subtitle: "",
      image: <DownloadCloudIcon width={50} height={50} />,
    },
    {
      title: "Discover community-shared icons for download and use.",
      subtitle: "",
      image: <ScanSearchIcon width={50} height={50} />,
    },
    {
      title:
        "Easily access and reuse your previous prompts and icons for seamless creativity.",
      subtitle: "",
      image: <MicroscopeIcon width={50} height={50} />,
    },
  ];
  return (
    <section
      className="flex w-full from-[#c8c9ce] via-[#c8cace] via-60% to-[#c8cace] px-4 
      py-10 md:bg-white md:pt-12 lg:px-28 dark:md:bg-gradient-to-r"
    >
      <article className="z-22 container mx-auto flex flex-col items-center gap-2 px-8">
        <div className="flex w-full items-center justify-center gap-4 p-8">
          {actions.map((action) => (
            <picture className="pl-2">
              <Button
                title="download icon"
                className="disabled pointer-events-none h-max w-max p-1 text-white disabled:from-blue-500 disabled:to-blue-600 disabled:hover:opacity-100"
              >
                {action.image}
              </Button>
            </picture>
          ))}
        </div>
        {actions.map((action) => (
          <h4 className="text-bold relative text-center text-2xl text-black before:absolute before:right-full before:pr-2 before:content-['♦']">
            {action.title}
          </h4>
        ))}
      </article>
    </section>
  );
};

const BottomWavesContent = () => {
  return (
    <section
      className="relative flex w-full flex-col bg-white from-[#c8c9ce] via-[#c8cace] via-60% to-[#c8cace] pb-96 dark:md:bg-gradient-to-r
    "
    >
      <div className="absolute bottom-0">
        <img
          src="/waves-blue.png"
          alt="waves image dark"
          className="hidden w-full dark:hidden dark:opacity-100 dark:md:block"
          decoding="async"
        />
        <img
          src="/wave.png"
          alt="waves image"
          className="hidden w-full opacity-50 md:block dark:hidden"
          decoding="async"
        />
      </div>
    </section>
  );
};

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <HeroContent />
      <PricingContent />
      <ShowSectionContent />
      <ActionsSectionContent />
      <BottomWavesContent />
    </main>
  );
}
