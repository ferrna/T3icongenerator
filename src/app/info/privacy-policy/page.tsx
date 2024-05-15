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
      <h1>Privacy Policy</h1>
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
          We do not share your generated icons by default. If you choose to
          contribute your icons to our community database, you will be asked for
          permission before sharing them.
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
          contact us at privacy@icongeneratoria.com.
        </p>
      </section>
    </div>
  );
}
