import Image from "next/image";
import Link from "next/link";
import { Button } from "./_components/Button";

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
        src="/landing-banner-removebg.png"
        alt="a bunch of nice looking icons"
        className="order-first -mt-2 place-self-center rounded drop-shadow-behind-white sm:order-last sm:place-self-start dark:drop-shadow-behind-light"
        width={500}
        height={333}
        priority={true}
      />
    </section>
  );
};

const PricingContent = () => {
  return (
    <section className="flex w-full bg-[#93969f] px-4 pb-16 pt-10 md:pb-32 md:pt-12 lg:px-28">
      <article className="container mx-auto flex flex-col items-center justify-center gap-6">
        <h2 className="text-center text-4xl font-bold">Pricing</h2>
        <p className="text-lg">Choose the plan that best fits your needs.</p>
        <div className="flex gap-8 p-4 sm:gap-8 md:gap-12">
          <div className="flex flex-col items-center gap-4 rounded-md bg-slate-300 p-6 pb-7 pt-5  text-center dark:bg-slate-800">
            <h3 className="text-2xl font-medium">Normal</h3>
            <p className="py-1 text-5xl font-extrabold">$5</p>
            <span className="pt-2 text-lg">100 Credits</span>
            <span className="text-lg">0.08$ peer icon</span>

            <Button className="mt-2 self-center text-lg sm:self-start md:text-base">
              <Link href="/">Buy</Link>
            </Button>
          </div>
          <div className="flex scale-105 flex-col items-center gap-4 rounded-md bg-slate-300 p-6 pb-7 pt-5  text-center dark:bg-slate-800">
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

export default async function Home() {
  return (
    <main className="mb-28 flex flex-col items-center justify-center">
      <HeroContent />
      <PricingContent />
    </main>
  );
}
