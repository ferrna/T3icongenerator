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
        <h1 className="text-center text-5xl font-bold tracking-tight md:text-left lg:mt-4">
          Generate Icons with a click of a button
        </h1>
        <p className="text-center text-2xl md:text-left">
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

const ShowSectionContent = ({ childNumber = 1 }) => {
  return (
    <section
      className="flex w-full from-[#c8c9ce] via-[#c8cace] via-60% to-[#c8cace] px-4 pb-16 pt-10
    md:bg-white md:pb-36 md:pt-16 lg:px-28 dark:md:bg-gradient-to-r"
    >
      <article className="container mx-auto grid grid-cols-4 gap-6">
        <picture
          className={`align-center order-2 col-span-4 flex justify-center md:col-span-2 ${childNumber % 2 === 1 ? "md:order-1" : "md:order-2"}`}
        >
          <img
            src="/showbox.png"
            alt="icons-show image"
            className="w-full rounded-md"
          />
        </picture>
        <aside className="col-span-4 flex flex-grow flex-col gap-10 pt-9 md:col-span-2">
          <h2 className="mx-auto text-center text-5xl font-bold text-slate-900 dark:text-gray-100 dark:md:text-slate-900">
            Craft the style you prefer
          </h2>
          <p className="text-center text-lg text-slate-800 dark:text-gray-100 dark:md:text-slate-800">
            Choose the style you prefer and start making variants!
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
      className="flex h-screen w-full items-center from-[#c8c9ce] via-[#c8cace] via-60% to-[#c8cace] 
      px-4 py-8 md:bg-white md:pt-12 lg:px-28 dark:md:bg-gradient-to-r"
    >
      <article className="z-22 container mx-auto flex flex-col items-center gap-10 bg-slate-300 p-8 md:py-12 xl:pt-[3.5rem] xl:pb-16 shadow-md md:rounded-lg dark:bg-slate-800">
        {actions.map((action) => (
          <div
            key={action.title}
            className="flex w-full flex-col items-center gap-4"
          >
            <Button
              title="download icon"
              className="disabled shadow-sm pointer-events-none h-max w-max p-1 text-white disabled:from-blue-500 disabled:to-blue-600 disabled:hover:opacity-100"
            >
              {action.image}
            </Button>
            <p className="text-bold relative w-full max-w-2xl text-center text-2xl leading-[1em] text-black dark:text-gray-100">
              {action.title}
            </p>
          </div>
        ))}
      </article>
    </section>
  );
};

const BottomWavesContent = () => {
  return (
    <section
      className="relative flex w-full flex-col from-[#c8c9ce] via-[#c8cace] via-60% to-[#c8cace] pb-96 md:bg-white dark:md:bg-gradient-to-r
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
