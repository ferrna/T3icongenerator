import { PrimaryLink } from "../_components/PrimaryLink";

export default function Info() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4">
      <PrimaryLink href="/info/tos">
        <h1>Terms of Service</h1>
      </PrimaryLink>
      <PrimaryLink href="/info/privacy-policy">
        <h1>Privacy Policy</h1>
      </PrimaryLink>
    </div>
  );
}
