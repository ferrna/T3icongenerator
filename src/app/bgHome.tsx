"use client";
import { usePathname } from "next/navigation";

export default function BgHome() {
  const query = usePathname();
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-10 flex min-h-screen justify-center
    overflow-hidden overflow-y-visible"
    >
      <div className="flex justify-center">
        <div className="flex w-[108rem] justify-end">
          <picture>
            <img
              src="/docs-dark2.avif"
              alt="gradient image"
              className={`hidden w-[90rem] max-w-none flex-none md:block dark:hidden dark:md:block
              ${query !== "/" ? "rotate-0" : "rotate-180"}`}
              decoding="async"
            />
          </picture>
        </div>
        <div
          className={`z-15 z-16 absolute bottom-0 before:inset-x-0 before:inset-y-0 before:h-full before:to-transparent
          dark:before:absolute dark:before:bg-gradient-to-t dark:before:from-[#92959e] dark:before:to-35% dark:before:content-['']
          ${query !== "/" ? "hidden" : ""}`}
        >
          <img
            src="/wave.png"
            alt="waves image"
            className="hidden w-full md:block dark:hidden dark:opacity-50 dark:md:block"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}
