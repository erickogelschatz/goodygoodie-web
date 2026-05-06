import type { Metadata } from 'next'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'GoodyGoodie Privacy Policy — how we collect, use, and protect your information.',
}

const EFFECTIVE_DATE = 'May 5, 2026'
const CONTACT_EMAIL = 'hello@goodygoodie.app'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-extrabold text-black mb-4">{title}</h2>
      <div className="text-mid leading-relaxed space-y-3 text-sm">{children}</div>
    </section>
  )
}

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <p className="text-sm font-bold uppercase tracking-widest text-teal mb-3">Legal</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-mid/70 text-sm">Effective date: {EFFECTIVE_DATE}</p>
          </div>

          <p className="text-mid leading-relaxed mb-10 text-sm">
            GoodyGoodie, Inc. ("GoodyGoodie," "we," "us," or "our") operates the GoodyGoodie mobile application and website at goodygoodie.app (collectively, the "Services"). This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our Services. By using GoodyGoodie, you agree to this policy.
          </p>

          <Section title="1. Information We Collect">
            <p><strong className="text-black">Account information.</strong> When you create an account, we collect your name, email address, and the role you select (volunteer, retailer, or nonprofit). Retailers and nonprofits may also provide organization names, addresses, and contact information.</p>
            <p><strong className="text-black">Volunteer activity.</strong> We collect records of your event registrations, check-ins, verified attendance, and #G earn and redemption transactions.</p>
            <p><strong className="text-black">Location data.</strong> With your permission, we may collect approximate location data to show nearby events and retailers. We do not continuously track your precise location.</p>
            <p><strong className="text-black">Device and usage data.</strong> We automatically collect certain information about your device, including device identifiers, operating system, app version, and usage patterns (pages viewed, features used, time spent). This helps us improve the Services.</p>
            <p><strong className="text-black">Communications.</strong> If you contact us by email or through the app, we retain those communications to respond to your inquiry and improve our support.</p>
            <p><strong className="text-black">Payment information.</strong> GoodyGoodie uses third-party payment processors (such as Stripe) to handle retailer sponsorship payments. We do not store full payment card numbers. Payment processors are subject to their own privacy policies.</p>
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Provide, operate, and improve the Services</li>
              <li>Create and manage your account</li>
              <li>Process event registrations, attendance verifications, and #G transactions</li>
              <li>Send transactional notifications (e.g., attendance verified, #Gs awarded)</li>
              <li>Send service announcements, updates, and optional marketing communications (you can opt out at any time)</li>
              <li>Provide analytics to retailers about their sponsorship performance (aggregate or de-identified)</li>
              <li>Detect and prevent fraud, abuse, or violations of our Terms of Service</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p>We do not sell your personal information to third parties.</p>
          </Section>

          <Section title="3. Sharing Your Information">
            <p>We share your information only in the following circumstances:</p>
            <p><strong className="text-black">With other users, as intended by the platform.</strong> When you register for or check in to a volunteer event, the sponsoring retailer and hosting nonprofit can see that attendance occurred and the number of hours verified. Your full name and contact information are not shared with retailers or nonprofits without your consent.</p>
            <p><strong className="text-black">With service providers.</strong> We share information with vendors who help us operate the Services (e.g., cloud hosting, payment processing, email delivery, analytics). These providers are contractually prohibited from using your data for their own purposes.</p>
            <p><strong className="text-black">For legal reasons.</strong> We may disclose your information if required by law, court order, or to protect the rights, property, or safety of GoodyGoodie, our users, or others.</p>
            <p><strong className="text-black">Business transfers.</strong> If GoodyGoodie is involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you via email and/or a prominent notice on our website before your information is transferred and becomes subject to a different privacy policy.</p>
          </Section>

          <Section title="4. #G Points and Financial Data">
            <p>All #G point balances and ledger entries are maintained in our systems and are associated with your account. We retain earn and redemption records as required for accounting and compliance purposes.</p>
            <p>#Gs are retailer-scoped rewards — not cash, cryptocurrency, or transferable financial instruments. Accordingly, we do not treat #G balances as financial account data subject to banking privacy regulations. However, we protect this information with the same care as all other personal data.</p>
          </Section>

          <Section title="5. Data Retention">
            <p>We retain your account information and transaction history for as long as your account is active and for a reasonable period afterward to comply with our legal obligations, resolve disputes, and enforce agreements.</p>
            <p>#G ledger entries are retained indefinitely as part of our accounting records. You may request deletion of your account at any time; upon deletion, we will anonymize or delete your personal information where not required for legal or compliance purposes.</p>
          </Section>

          <Section title="6. Your Rights and Choices">
            <p>Depending on where you live, you may have certain rights regarding your personal information, including the right to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Access, correct, or delete your personal information</li>
              <li>Object to or restrict certain processing</li>
              <li>Receive a portable copy of your data</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal hover:underline">{CONTACT_EMAIL}</a>. We will respond within the timeframe required by applicable law.</p>
            <p><strong className="text-black">Marketing emails.</strong> You can opt out of marketing emails at any time by clicking "unsubscribe" in any marketing email or contacting us directly. Transactional emails (e.g., #G awards, verification confirmations) are not optional while your account is active.</p>
          </Section>

          <Section title="7. Children's Privacy">
            <p>GoodyGoodie is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, contact us immediately at <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal hover:underline">{CONTACT_EMAIL}</a> and we will delete it promptly.</p>
          </Section>

          <Section title="8. Security">
            <p>We use industry-standard security measures — including encryption in transit and at rest, access controls, and regular security reviews — to protect your information. No system is completely secure, however, and we cannot guarantee the absolute security of your data.</p>
          </Section>

          <Section title="9. Third-Party Links and Services">
            <p>The Services may contain links to third-party websites or services. This Privacy Policy does not apply to those third parties. We encourage you to review the privacy policies of any third-party services you access through GoodyGoodie.</p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>We may update this Privacy Policy from time to time. When we make material changes, we will notify you by updating the effective date at the top of this page and, where appropriate, by sending an email to the address on file. Continued use of the Services after changes become effective constitutes your acceptance of the revised policy.</p>
          </Section>

          <Section title="11. Contact Us">
            <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
            <p>
              GoodyGoodie, Inc.<br />
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal hover:underline">{CONTACT_EMAIL}</a>
            </p>
          </Section>
        </div>
      </main>
      <Footer />
    </>
  )
}
