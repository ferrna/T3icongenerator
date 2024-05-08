import Image from "next/image";
import Link from "next/link";
import { Button } from "./_components/Button";

const HeroContent = () => {
  return (
    <section className="my-8 grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 sm:gap-12 md:px-0 md:py-8 lg:my-24 lg:px-28 xl:my-[5.5rem]">
      <aside className="flex flex-col gap-2">
        <h1 className="text-5xl font-bold tracking-tight sm:mt-4">
          Generate Icons with a click of a button
        </h1>
        <p className="text-2xl">Generate Icons with a click of a button</p>
        <Button className="mt-8 self-center text-lg sm:mt-4 sm:self-start sm:text-base">
          <Link href="/generate">Start generating</Link>
        </Button>
      </aside>
      {/* TODO: image definition, responsive size jonmircha */}
      <Image
        src="/landing-banner.png"
        alt="a bunch of nice looking icons"
        className="order-first rounded sm:order-last"
        width={500}
        height={333}
        priority={true}
      />
    </section>
  );
};
export default async function Home() {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center">
      <HeroContent />
    </main>
  );
}
