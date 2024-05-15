import Image from "next/image";
import Link from "next/link";
import { Button } from "./_components/Button";

const HeroContent = () => {
  return (
    <section className="my-8 grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:gap-8 md:gap-12 md:px-0 md:py-8 lg:my-12 lg:px-28 xl:my-20">
      <aside className="flex flex-col gap-2">
        <h1 className="text-5xl font-bold tracking-tight lg:mt-4">
          Generate Icons with a click of a button
        </h1>
        <p className="text-2xl">Generate Icons with a click of a button</p>
        <Button className="mt-8 self-center text-lg sm:self-start md:text-base">
          <Link href="/generate">Start generating</Link>
        </Button>
      </aside>
      {/* TODO: image definition, responsive size jonmircha */}
      <Image
        src="/landing-banner-removebg.png"
        alt="a bunch of nice looking icons"
        className="order-first -mt-2 place-self-center rounded sm:order-last sm:place-self-start drop-shadow-behind-white dark:drop-shadow-behind-light"
        width={500}
        height={333}
        priority={true}
      />
    </section>
  );
};
export default async function Home() {
  return (
    <main className="mb-5 container mx-auto flex flex-col items-center justify-center">
      <HeroContent />
    </main>
  );
}
