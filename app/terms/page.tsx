import type { Metadata } from 'next'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'GoodyGoodie Terms of Service — the rules for using our platform.',
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

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <p className="text-sm font-bold uppercase tracking-widest text-teal mb-3">Legal</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-4">Terms of Service</h1>
            <p className="text-mid/70 text-sm">Effective date: {EFFECTIVE_DATE}</p>
          </div>

          <p className="text-mid leading-relaxed mb-10 text-sm">
            These Terms of Service ("Terms") govern your access to and use of the GoodyGoodie mobile application and website at goodygoodie.app (collectively, the "Services") operated by GoodyGoodie, Inc. ("GoodyGoodie," "we," "us," or "our"). By creating an account or using the Services, you agree to these Terms. If you do not agree, do not use the Services.
          </p>

          <Section title="1. Eligibility">
            <p>You must be at least 13 years old to use GoodyGoodie. If you are under 18, you may only use the Services with the involvement of a parent or legal guardian. By using the Services, you represent that you meet these eligibility requirements.</p>
            <p>Organizations registering as nonprofits represent that they are duly organized and in good standing under applicable law.</p>
          </Section>

          <Section title="2. Accounts">
            <p>You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.</p>
            <p>GoodyGoodie reserves the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or are determined to present risk to the platform or other users.</p>
            <p>You may not create more than one personal account. Retailers and nonprofits may create organization accounts in addition to personal accounts used for those roles.</p>
          </Section>

          <Section title="3. The GoodyGoodie Platform">
            <p>GoodyGoodie operates a community platform that connects:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong className="text-black">Volunteers</strong> who participate in sponsored events and earn #G points redeemable at sponsoring retailers</li>
              <li><strong className="text-black">Retailers</strong> who sponsor volunteer events and accept #G redemptions in their stores</li>
              <li><strong className="text-black">Nonprofits</strong> who host volunteer events and verify attendance</li>
            </ul>
            <p>GoodyGoodie is a technology platform and loyalty program operator. We are not a nonprofit, a charitable organization, or a financial institution. No use of the Services constitutes a charitable contribution.</p>
          </Section>

          <Section title="4. #G Points">
            <p><strong className="text-black">Earning #Gs.</strong> Volunteers earn #G points when a nonprofit verifies their attendance at a sponsored volunteer event. #Gs are earned in whole integers (1 #G per verified hour, subject to any nonprofit-set multipliers).</p>
            <p><strong className="text-black">Value.</strong> Each #G is worth $1.00 USD in redemption value at the retailer that sponsored the event where it was earned. #Gs are redeemable to 0.01 #G precision.</p>
            <p><strong className="text-black">Retailer-scoped.</strong> #Gs are tied to the sponsoring retailer and may only be redeemed at that specific retailer's store. They cannot be transferred to another retailer, combined across retailers, or converted to cash.</p>
            <p><strong className="text-black">Non-transferable.</strong> #Gs may not be transferred, sold, or gifted between users. Any attempt to do so will result in forfeiture and may result in account termination.</p>
            <p><strong className="text-black">Expiration.</strong> #G balances for a specific retailer expire after 24 consecutive months of inactivity (no earn or redemption activity at that retailer). Once expired, #Gs cannot be reinstated.</p>
            <p><strong className="text-black">No cash value.</strong> #Gs have no cash redemption value. They are non-cash, retailer-scoped discount instruments, not securities, currency, or financial instruments of any kind.</p>
            <p><strong className="text-black">Errors and corrections.</strong> GoodyGoodie reserves the right to correct erroneous #G awards or deduct #Gs that were fraudulently obtained.</p>
          </Section>

          <Section title="5. Volunteer Responsibilities">
            <p>Volunteers agree to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Register for and attend events in good faith</li>
              <li>Not attempt to earn #Gs through fraudulent check-ins, falsified hours, or any deceptive means</li>
              <li>Comply with all rules and requirements set by the hosting nonprofit for any event</li>
              <li>Not abuse the referral program (one referral per lifetime; see Section 8)</li>
            </ul>
          </Section>

          <Section title="6. Retailer Responsibilities">
            <p>Retailers agree to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Honor valid #G redemptions presented at their store by volunteers with sufficient balances</li>
              <li>Use the GoodyGoodie cashier app (or approved equivalent) to validate redemption QR codes</li>
              <li>Not attempt to manipulate sponsorship structures, redemption rates, or analytics data</li>
              <li>Maintain accurate store information in their retailer profile</li>
              <li>Comply with all applicable laws related to their business operations, including those governing promotional offers and discount programs</li>
            </ul>
          </Section>

          <Section title="7. Nonprofit Responsibilities">
            <p>Nonprofits agree to:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Post only legitimate volunteer events that will occur as described</li>
              <li>Verify attendance accurately — only scanning QR codes for volunteers who actually participated</li>
              <li>Not falsify volunteer hours or attendance records</li>
              <li>Maintain accurate organization information in their profile</li>
              <li>Comply with all applicable laws governing their nonprofit operations</li>
            </ul>
            <p>GoodyGoodie does not disburse funds to nonprofits. No funds pass through nonprofit organizations via the platform.</p>
          </Section>

          <Section title="8. Referral Program">
            <p>Each user account is entitled to refer exactly one (1) new user during the lifetime of that account. Upon the referred user's completion of their first verified volunteer shift, the referring user receives a one-time referral bonus of 10 #Gs, attributed to an eligible sponsoring retailer.</p>
            <p>After the referral is used, the referral feature is permanently removed from that user's account. Referral bonuses may not be obtained through the creation of fake accounts or any other fraudulent means.</p>
          </Section>

          <Section title="9. Payments (Retailers)">
            <p>Retailer sponsorship payments are processed by third-party payment processors. By submitting a payment, you authorize GoodyGoodie to charge your payment method for the stated sponsorship amount.</p>
            <p>GoodyGoodie manages sponsorship funds as a loyalty program operator. A portion of each sponsorship is recognized as a platform fee; the remainder backs the #G reward pool for the sponsored event. Specific terms are disclosed at the time of sponsorship.</p>
            <p>All payments are in USD. Taxes, if applicable, are your responsibility.</p>
          </Section>

          <Section title="10. Intellectual Property">
            <p>GoodyGoodie and its licensors own all right, title, and interest in the Services, including the software, design, trademarks, and content. These Terms do not grant you any ownership interest in the Services.</p>
            <p>You may not copy, modify, distribute, sell, or create derivative works from any part of the Services without our prior written consent.</p>
          </Section>

          <Section title="11. User Content">
            <p>You may submit content to GoodyGoodie, including event descriptions, organization profiles, and communications. By submitting content, you grant GoodyGoodie a non-exclusive, worldwide, royalty-free license to use, display, and distribute that content in connection with operating the Services.</p>
            <p>You represent that you have the right to submit any content you provide and that it does not violate any third-party rights or applicable law.</p>
          </Section>

          <Section title="12. Prohibited Conduct">
            <p>You may not:</p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Use the Services for any unlawful purpose or in violation of these Terms</li>
              <li>Impersonate any person or organization</li>
              <li>Interfere with the operation of the Services or attempt to gain unauthorized access</li>
              <li>Scrape, crawl, or extract data from the Services without our written consent</li>
              <li>Use automated bots to register accounts, earn #Gs, or otherwise interact with the platform</li>
              <li>Engage in any conduct that GoodyGoodie reasonably determines is harmful to the platform, other users, or third parties</li>
            </ul>
          </Section>

          <Section title="13. Disclaimers">
            <p>THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND. GOODYGOODIE DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
            <p>GoodyGoodie does not warrant that the Services will be uninterrupted, error-free, or free from viruses or other harmful components.</p>
          </Section>

          <Section title="14. Limitation of Liability">
            <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, GOODYGOODIE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, LOSS OF DATA, OR LOSS OF GOODWILL, ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR YOUR USE OF THE SERVICES.</p>
            <p>GOODYGOODIE'S TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF THESE TERMS SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNTS YOU PAID TO GOODYGOODIE IN THE TWELVE MONTHS PRECEDING THE CLAIM, OR (B) $100 USD.</p>
          </Section>

          <Section title="15. Indemnification">
            <p>You agree to indemnify, defend, and hold harmless GoodyGoodie and its officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of your use of the Services, your violation of these Terms, or your violation of any third-party rights.</p>
          </Section>

          <Section title="16. Termination">
            <p>You may delete your account at any time. GoodyGoodie may suspend or terminate your access to the Services at any time, with or without cause, with or without notice.</p>
            <p>Upon termination, your #G balances are forfeited. Sections of these Terms that by their nature should survive termination (including Sections 10, 13, 14, 15, and 18) will survive.</p>
          </Section>

          <Section title="17. Changes to These Terms">
            <p>We may update these Terms from time to time. Material changes will be communicated by updating the effective date at the top of this page and, where appropriate, by email. Continued use of the Services after changes take effect constitutes your acceptance of the revised Terms.</p>
          </Section>

          <Section title="18. Governing Law and Dispute Resolution">
            <p>These Terms are governed by the laws of the State of Delaware, without regard to conflict of law principles. Any dispute arising from these Terms or the Services will be resolved through binding individual arbitration under the rules of the American Arbitration Association, except that either party may seek injunctive or other equitable relief in a court of competent jurisdiction.</p>
            <p>You waive any right to participate in a class action lawsuit or class-wide arbitration.</p>
          </Section>

          <Section title="19. Contact">
            <p>Questions about these Terms? Contact us at:</p>
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
