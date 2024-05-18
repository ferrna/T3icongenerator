"use client";
import { usePathname } from "next/navigation";

export default function BgHome() {
  const query = usePathname();
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 z-10 flex min-h-screen justify-center overflow-hidden overflow-y-visible border-slate-700/70 ${query !== "/" ? "border-none" : "md:border-b-[1px]"}`}
    >
      <div className="flex justify-center">
        <div className="flex w-[108rem] justify-end">
          <picture>
            <img
              src="/docs-dark2.avif"
              alt="gradient image"
              className={`hidden w-[90rem] max-w-none flex-none md:block dark:hidden dark:md:block ${query !== "/" ? "rotate-0" : "rotate-180"}`}
              decoding="async"
            />
          </picture>
        </div>
        <div
          className={`z-15 absolute bottom-0 ${query !== "/" ? "hidden" : ""}`}
        >
          <img
            src="/wave.png"
            alt="waves image"
            className="hidden w-full md:block dark:hidden dark:opacity-55 dark:md:block"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}
