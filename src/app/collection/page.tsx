import CollectionContent from "./pageContent";

export const revalidate = 120;

export const metadata = {
  title: "My icons",
  description:
    "Your collection of beautiful icons with OpenAI's Artificial Inteligence.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Collection() {
  return (
    <main
      className="container relative z-20 m-auto mb-24
    flex max-w-screen-md flex-col gap-8 px-4 py-8 md:px-8 md:py-10"
    >
      <h2 className="text-4xl font-bold">Collection</h2>
      <p className="-mt-4 text-lg">Your collection of beautiful icons</p>
      <CollectionContent />
    </main>
  );
}
