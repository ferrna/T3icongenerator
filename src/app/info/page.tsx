"use client"
import { PrimaryLink } from "../_components/PrimaryLink";

export default function Info() {
  return (
    <div>
      <PrimaryLink href="/info/tos">
        <h1>Terms of Service</h1>
      </PrimaryLink>
      <PrimaryLink href="/info/privacy-policy">
        <h1>Privacy Policy</h1>
      </PrimaryLink>
    </div>
  );
}
