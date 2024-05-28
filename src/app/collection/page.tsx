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
    flex min-h-screen max-w-screen-md flex-col gap-8 px-4 py-10 md:px-8"
    >
      <h2
        className="text-center text-4xl font-bold md:text-left"
        id="user-collection"
      >
        Collection
      </h2>
      <p className="-mt-4 text-lg">Your collection of beautiful AI icons</p>
      <CollectionContent />
    </main>
  );
}
