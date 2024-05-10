'use client'
import { usePathname } from "next/navigation";

export default function BgHome () {
  const query = usePathname();
  return (
    <div className={`absolute min-h-screen z-10 top-0 inset-x-0 flex justify-center overflow-hidden overflow-y-visible pointer-events-none border-slate-700/70 ${query !== "/" ? "border-none" : "border-b-[1px]"}`}>
        <div className="flex justify-center">

        <div className="w-[108rem] flex justify-end">
        <picture>
            <img src="/docs-dark2.avif" alt="gradient image" className={`w-[90rem] flex-none max-w-none hidden dark:md:block dark:hidden ${query !== "/" ? "rotate-0" : "rotate-180"}`} decoding="async"/>
        </picture>
        </div>
        <div className={`z-15 absolute bottom-0 ${query !== "/" ? "hidden" : ""}`}>
            <img src="/wave.png" alt="waves image" className="w-full hidden dark:md:block dark:hidden opacity-55" decoding="async"/>
        </div>
        </div>
    </div>
  )
}
