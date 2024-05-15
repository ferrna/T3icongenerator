import { PrimaryLink } from "./_components/PrimaryLink";

export default async function FooterAside() {
  return (
    <div>
      <details open className="flex gap-2 text-right open:*:block">
        <summary>Info</summary>
        <PrimaryLink href="/info/privacy-policy">Privacy Policy</PrimaryLink>
        <PrimaryLink href="/info/tos">Terms of service</PrimaryLink>
        <PrimaryLink href="/info/privacy-policy">Disclaimer</PrimaryLink>
      </details>
    </div>
  );
}
