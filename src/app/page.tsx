import Image from "next/image";
import Link from "next/link";
import { Button } from "./_components/Button";
import {
  DownloadCloudIcon,
  MicroscopeIcon,
  ScanSearchIcon,
} from "lucide-react";

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
      {/* TODO: image definition, responsive size jonmircha */}
      <Image
        src="/landing-banner-dark.png"
        alt="a bunch of nice looking icons"
        className="hidden dark:block order-first -mt-2 place-self-center rounded drop-shadow-behind-white sm:order-last sm:place-self-start dark:drop-shadow-behind-light"
        width={500}
        height={333}
        priority={true}
      />
      <Image
        src="/landing-banner-removebg.png"
        alt="a bunch of nice looking icons"
        className="dark:hidden order-first -mt-2 place-self-center rounded drop-shadow-behind-white sm:order-last sm:place-self-start dark:drop-shadow-behind-light"
        width={500}
        height={333}
        priority={true}
      />
    </section>
  );
};

const PricingContent = () => {
  return (
    <section className="flex w-full from-[#c8c9ce] via-[#c8cace] via-60% to-[#c8cace] px-4 pb-16 pt-10 md:bg-white md:pb-32 md:pt-12 lg:px-28 dark:md:bg-gradient-to-r">
      <article className="container mx-auto flex flex-col items-center justify-center gap-6">
        <h2 className="text-center text-5xl font-bold text-slate-800">
          Pricing
        </h2>
        <p className="text-lg text-slate-800">
          Choose the plan that best fits your needs.
        </p>
        <div className="flex gap-8 p-4 sm:gap-8 md:gap-12">
          <div className="flex flex-col items-center gap-4 rounded-lg bg-slate-300 p-6 pb-7 pt-5 text-center shadow-md dark:bg-slate-800">
            <h3 className="text-2xl font-medium">Normal</h3>
            <p className="py-1 text-5xl font-extrabold">$5</p>
            <span className="pt-2 text-lg">100 Credits</span>
            <span className="text-lg">0.08$ peer icon</span>

            <Button className="mt-2 self-center text-lg sm:self-start md:text-base">
              <Link href="/">Buy</Link>
            </Button>
          </div>
          <div className="flex scale-105 flex-col items-center gap-4 rounded-lg bg-slate-300 p-6 pb-7 pt-5 text-center shadow-md dark:bg-slate-800">
            <h3 className="text-2xl font-medium">Pro</h3>
            <p className="py-1 text-5xl font-extrabold">$12</p>
            <span className="pt-2 text-lg">250 Credits</span>
            <span className="text-lg">0.06$ peer icon</span>

            <Button className="mt-2 self-center text-lg sm:self-start md:text-base">
              <Link href="/">Buy</Link>
            </Button>
          </div>
        </div>
      </article>
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
            Choose the style you prefer and <u>tailor some variants!</u>
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

const BottomFadeContent = () => {
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
      <BottomFadeContent />
    </main>
  );
}
