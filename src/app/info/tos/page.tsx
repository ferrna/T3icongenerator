import { PrimaryLink } from "~/app/_components/PrimaryLink";

export const metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Icon Generator IA",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};
export default function TermsOfServicePage() {
  return (
    <div
      className="container m-auto mb-24
    flex max-w-screen-md flex-col gap-6 px-4 py-8 md:px-8 md:py-10"
    >
      <p className="relative">
        <PrimaryLink
          className="absolute right-full w-[max-content] pr-12 text-gray-100"
          href="/info"
        >
          {"< Info"}
        </PrimaryLink>

        <h1>Terms of Service</h1>
        <span className="text-sm text-gray-400">Last updated: 18/05/2024</span>
      </p>
      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          Welcome to Icon Generator IA. By using our services, you agree to
          comply with and be bound by the following terms and conditions of use.
          If you disagree with any part of these terms, please refrain from
          using our service.
        </p>
      </section>
      <section>
        <h2>2. Disclaimer of Liability</h2>
        <p>
          Icon Generator IA provides its services on an "as-is" basis. We do not
          guarantee uninterrupted access to our services or the accuracy of
          generated icons. Icon Generator IA shall not be held liable for any
          direct, indirect, incidental, special, or consequential damages
          arising out of the use or inability to use our services.
        </p>
      </section>
      <section>
        <h2>3. User Responsibilities</h2>
        <p>
          Users are solely responsible for the storage and backup of icons
          generated using our service. Icon Generator IA does not assume
          responsibility for icons lost due to database failures or any other
          unforeseen circumstances. Users are advised to download their
          generated icons promptly after generation.
        </p>
      </section>
      <section>
        <h2>4. Modifications to Terms</h2>
        <p>
          Icon Generator IA reserves the right to modify these terms of service
          at any time without prior notice. By continuing to use our services
          after any such modifications, you agree to be bound by the updated
          terms.
        </p>
      </section>
      <section>
        <h2>5. Contact Us</h2>
        <p>
          If you have any questions or concerns about these terms of service,
          please contact us at support@icongeneratoria.com.
        </p>
      </section>
    </div>
  );
}
