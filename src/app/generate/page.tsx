import GenerateForm from "./generateForm";

export const metadata = {
  title: "Create beautis AI Icons",
  description:
    "Create beautiful icons with the help of OpenAI's Artificial Inteligence. Generate AI icons with input description and DALLE-2, DALLE-3, for your project, application or logo.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
export default function Generate() {
  return (
    <main
      className="container m-auto mb-24 flex max-w-screen-md
    flex-col gap-6 px-4 py-8 md:px-8"
    >
      <h2 className="-mb-1 text-4xl font-bold">Generate Icons</h2>
      <p className="text-lg">Fill the next form to start generating icons.</p>
      <ul className="flex list-disc flex-col gap-2 pl-12 text-gray-700 dark:text-gray-500">
        <li>
          Do not ask for words or letters, AI does not generate characters and
          words correctly
        </li>
        <li>Simple prompts often work best</li>
        <li>Use variants once you find a starting icon you like</li>
        <li>Experiment with adding words, such as happy or vibrant</li>
      </ul>
      <GenerateForm />
    </main>
  );
}
