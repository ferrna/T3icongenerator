import { getServerAuthSession } from "~/server/auth";
import CommunityContent from "./pageContent";
import { api } from "~/trpc/server";

export const revalidate = 120;

export const metadata = {
  title: "Community icons",
  description: "Community icons. Made by the community.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Collection() {
  const session = await getServerAuthSession();
  const getUserHaveIcons = session
    ? await api.user.getUserHaveIcons()
    : { userIconsCount: -1 };
  return (
    <main
      className="container relative z-20 m-auto mb-24
    flex min-h-96 max-w-screen-md flex-col gap-8 px-4 py-8 md:px-8 md:py-10"
    >
      <h2 className="text-4xl font-bold">Community icons</h2>
      <p className="-mt-4 text-lg"></p>
      <CommunityContent userIconsCount={getUserHaveIcons.userIconsCount} />
    </main>
  );
}
