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
  async function getUserIconsCount() {
    const session = await getServerAuthSession();
    const userIconsCount = session
      ? await api.user.getUserHaveIcons()
      : { userIconsCount: -1 };
    return userIconsCount;
  }
  const { userIconsCount } = await getUserIconsCount();

  return (
    <main
      className="container relative z-20 m-auto mb-24
    flex min-h-96 max-w-screen-md flex-col gap-8 px-4 py-10 md:px-8"
    >
      <h2 className="text-center text-4xl font-bold md:text-left">
        Community icons
      </h2>
      <p className="-mt-4 text-lg"></p>
      {userIconsCount && <CommunityContent userIconsCount={userIconsCount} />}
    </main>
  );
}
