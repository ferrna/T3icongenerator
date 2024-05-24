import { GemIcon } from "lucide-react";
import FooterAside from "./footerAside";

export default async function Footer() {
  return (
    <footer
      className="w-full snap-y snap-mandatory border-t 
      border-t-cyan-900 bg-gray-100 *:snap-end dark:border-none dark:border-t-[#2B3544] dark:bg-slate-50/[0.06] dark:md:border-none"
    >
      <div className="flex w-full justify-center p-8 pb-6 pt-4 text-sm">
        <div className="container flex w-full justify-between">
          <div className="">
            <span className="mb-2 block">
              <a href="">
                <GemIcon size={20} className="mr-2 inline cursor-pointer" />
              </a>
              fernna
            </span>
            <span>
              <a href="mail:to/arriondovfernando@gmail.com">
                arriondovfernando@gmail.com
              </a>
            </span>
          </div>
          <aside>
            <FooterAside />
          </aside>
        </div>
      </div>

      <div className="border-t border-t-cyan-900 p-2 px-8 text-xs text-gray-700 dark:border-t-[#2B3544] dark:bg-slate-50/[0.02] dark:text-[#d6d6d6]">
        We process payment through Stripe transactions, in case of any reclaim
        or question you may have please contact the sources provided above.
      </div>
    </footer>
  );
}
