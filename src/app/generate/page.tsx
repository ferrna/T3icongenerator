import GenerateForm from "./generateForm";

export const metadata = {
  title: "Generate",
  description: "Generate AI icons",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
export default function Generate() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <GenerateForm />
    </main>
  );
}
