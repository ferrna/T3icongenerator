import Image from "next/image";
import Link from "next/link";
import { Button } from "./_components/Button";

const HeroContent = () => {
  return (
    <section className="my-28 grid grid-cols-2 gap-12 px-28">
      <aside className="flex flex-col gap-2">
        <h1 className="text-5xl font-bold tracking-tight">
          Generate Icons with a click of a button
        </h1>
        <p className="text-2xl">Generate Icons with a click of a button</p>
        <Button className="mt-4 self-start">
          <Link href="/generate">Start generating</Link>
        </Button>
      </aside>
      <Image
        src="/landing-banner.png"
        alt="a bunch of nice looking icons"
        width={500}
        height={400}
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
