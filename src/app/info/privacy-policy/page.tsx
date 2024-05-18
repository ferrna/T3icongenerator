import { PrimaryLink } from "~/app/_components/PrimaryLink";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Icon Generator IA",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function PrivacyPolicyPage() {
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

        <h1>Privacy Policy</h1>
        <span className="text-sm text-gray-400">Last updated: 18/05/2024</span>
      </p>
      <section>
        <h2>1. Information We Collect</h2>
        <p>
          Icon Generator IA collects only the necessary information required to
          provide our services. This may include user-provided data such as
          email addresses for account creation purposes.
        </p>
      </section>
      <section>
        <h2>2. Use of Information</h2>
        <p>
          We do share your generated icons by default between Icon Generator. We
          provide you with the option of keeping them for your personalize use
          only, and with the option to change that later. If you choose to
          contribute your icons to our community database, you will have the
          permission to sharing them.
        </p>
      </section>
      <section>
        <h2>3. Data Security</h2>
        <p>
          Icon Generator IA takes reasonable measures to secure the data
          collected through our services. However, no method of transmission
          over the internet or electronic storage is completely secure, and we
          cannot guarantee absolute security.
        </p>
      </section>
      <section>
        <h2>4. Third-Party Services</h2>
        <p>
          Icon Generator IA may use third-party services to facilitate our
          services or to analyze how our services are used. These third parties
          may have access to your personal information only to perform these
          tasks on our behalf and are obligated not to disclose or use it for
          any other purpose.
        </p>
      </section>
      <section>
        <h2>5. Changes to This Privacy Policy</h2>
        <p>
          We reserve the right to update our Privacy Policy from time to time.
          Any changes will be posted on this page, and the "last updated" date
          will be revised accordingly.
        </p>
      </section>
      <section>
        <h2>6. Contact Us</h2>
        <p>
          If you have any questions or concerns about our Privacy Policy, please
          contact us at arriondovfernando@gmail.com.
        </p>
      </section>
    </div>
  );
}
