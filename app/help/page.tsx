import type { Metadata } from 'next'
import Link from 'next/link'
import {
  IoPersonOutline, IoStorefrontOutline, IoHeartOutline,
  IoWalletOutline, IoQrCodeOutline, IoLockClosedOutline,
  IoSearchOutline, IoChatbubbleOutline, IoMailOutline,
  IoStarOutline, IoSwapHorizontalOutline, IoTimeOutline,
  IoShieldCheckmarkOutline, IoPhonePortraitOutline,
} from '@/app/components/Icons'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'Help Center',
  description: 'Find answers to common questions about GoodyGoodie — for volunteers, retailers, and nonprofits.',
}

// ─────────────────────────────────────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────────────────────────────────────

const categories = [
  {
    icon: IoPersonOutline,
    label: 'Volunteers',
    id: 'volunteers',
    color: 'bg-green-light text-teal',
  },
  {
    icon: IoStorefrontOutline,
    label: 'Retailers',
    id: 'retailers',
    color: 'bg-green-light text-teal',
  },
  {
    icon: IoHeartOutline,
    label: 'Nonprofits',
    id: 'nonprofits',
    color: 'bg-green-light text-teal',
  },
  {
    icon: IoWalletOutline,
    label: '#G Points',
    id: 'points',
    color: 'bg-green-light text-teal',
  },
  {
    icon: IoLockClosedOutline,
    label: 'Account & Security',
    id: 'account',
    color: 'bg-green-light text-teal',
  },
  {
    icon: IoPhonePortraitOutline,
    label: 'App & Technical',
    id: 'technical',
    color: 'bg-green-light text-teal',
  },
]

const sections: { id: string; title: string; icon: React.ComponentType<{ size?: number; className?: string }>; faqs: { q: string; a: string }[] }[] = [
  {
    id: 'volunteers',
    title: 'Volunteers',
    icon: IoPersonOutline,
    faqs: [
      {
        q: 'How do I get started as a volunteer?',
        a: 'Download the GoodyGoodie app, create a free account, and choose "Volunteer" as your role. You can immediately browse upcoming events near you, register, and start earning #Gs for your time.',
      },
      {
        q: 'How do I register for a volunteer event?',
        a: 'Open the app and go to the Events tab. Browse or filter events by cause, date, or distance. Tap an event to see details and tap "Register." You\'ll receive a confirmation and a personal QR code to use at check-in.',
      },
      {
        q: 'How do I check in at an event?',
        a: 'When you arrive, open the app and navigate to the event. Show your QR code to the nonprofit volunteer coordinator, who will scan it on their device. Once scanned, your attendance is recorded.',
      },
      {
        q: 'When do I receive my #Gs after an event?',
        a: 'You receive #Gs once the nonprofit verifies your attendance — typically within a few hours of the event ending. You\'ll get a push notification when #Gs are added to your wallet.',
      },
      {
        q: 'Can I cancel my registration?',
        a: 'Yes. Open the event in the app and tap "Cancel registration." We ask that you cancel at least 24 hours before the event start time when possible so the nonprofit can manage volunteer caps.',
      },
      {
        q: 'What if I attended an event but my hours weren\'t verified?',
        a: 'Contact the nonprofit directly through the app or reach out to us at hello@goodygoodie.app with the event name and date. We\'ll work with the nonprofit to resolve it.',
      },
    ],
  },
  {
    id: 'retailers',
    title: 'Retailers',
    icon: IoStorefrontOutline,
    faqs: [
      {
        q: 'How do I sponsor a volunteer event?',
        a: 'Create a retailer account, then go to the Sponsorships tab. Browse events posted by nonprofits in your area, select the events that align with your brand, and set your sponsorship amount. Your funds back the #G rewards volunteers will earn.',
      },
      {
        q: 'How does redemption work at my store?',
        a: 'GoodyGoodie provides a cashier scanner app your staff uses to validate volunteer redemption QR codes. When a volunteer presents their QR code, your staff scans it and applies the discount as a manual line item. No POS integration is required.',
      },
      {
        q: 'Can I limit how much a single volunteer can earn at my sponsored event?',
        a: 'Yes. When setting up a sponsorship, you can configure per-volunteer earning caps in addition to your total sponsorship budget.',
      },
      {
        q: 'What happens to #Gs that are never redeemed?',
        a: '#G balances expire after 24 months of inactivity. Unredeemed #Gs are subject to breakage accounting — they\'re not a perpetual liability. GoodyGoodie manages the lifecycle.',
      },
      {
        q: 'Can I choose which nonprofits to support?',
        a: 'Yes. You select which nonprofit events to sponsor — there\'s no obligation to sponsor any specific organization. Many retailers build ongoing relationships with causes that align with their brand.',
      },
      {
        q: 'How do I track my sponsorship performance?',
        a: 'Your retailer dashboard shows volunteer hours funded, #Gs issued, #Gs redeemed, redemption rates, and in-store visit data associated with your sponsorships, updated in real time.',
      },
    ],
  },
  {
    id: 'nonprofits',
    title: 'Nonprofits',
    icon: IoHeartOutline,
    faqs: [
      {
        q: 'Is GoodyGoodie free for nonprofits?',
        a: 'Yes. Listing your organization and posting volunteer events is completely free. The retailer sponsorship structure funds all rewards — your nonprofit never pays.',
      },
      {
        q: 'How do I post a volunteer event?',
        a: 'From the Events tab, tap "Create Event." Fill in the event name, date, volunteer cap, cause tags, and attendance verification settings. Events go live immediately.',
      },
      {
        q: 'How do I find a retailer sponsor?',
        a: 'Go to the Sponsorships tab and browse local retailers. You can send a sponsorship pitch request to any retailer. When they accept, your event is funded and volunteers can earn #Gs.',
      },
      {
        q: 'How do I verify volunteer attendance?',
        a: 'On event day, open the Verify tab and select your event. Scan each volunteer\'s QR code as they arrive. Verified hours are automatically converted to #Gs for each volunteer.',
      },
      {
        q: 'Does GoodyGoodie send money to our organization?',
        a: 'No. GoodyGoodie does not disburse funds to nonprofits. The retailer sponsorship funds the #G rewards that volunteers earn and redeem at the sponsoring retailer. You never handle the money.',
      },
      {
        q: 'What if a volunteer\'s QR code won\'t scan?',
        a: 'Ask the volunteer to open the app and refresh their QR code. If the issue persists, you can manually enter their check-in from the event verification screen by entering their registered email address.',
      },
    ],
  },
  {
    id: 'points',
    title: '#G Points',
    icon: IoStarOutline,
    faqs: [
      {
        q: 'What are #Gs?',
        a: '#Gs are reward points you earn for verified volunteer hours. Each #G is worth $1.00 at the retailer that sponsored the event where you earned it.',
      },
      {
        q: 'Where can I redeem my #Gs?',
        a: '#Gs are retailer-scoped — they can only be redeemed at the specific retailer that sponsored the event where you earned them. Open your Wallet to see your balance broken down by retailer.',
      },
      {
        q: 'How do I redeem #Gs in-store?',
        a: 'Open the app, go to your Wallet, select the retailer balance you want to use, and tap "Redeem." Show the QR code to the cashier. They\'ll scan it and apply your discount at the register.',
      },
      {
        q: 'Do #Gs expire?',
        a: 'Yes. Each retailer-scoped balance expires after 24 consecutive months of inactivity. Any earn or redemption activity at that retailer resets the clock. You\'ll receive a reminder before expiration.',
      },
      {
        q: 'Can I transfer or cash out my #Gs?',
        a: 'No. #Gs are non-transferable and cannot be converted to cash. They\'re retailer-scoped discount credits — not currency or financial instruments.',
      },
      {
        q: 'I think my #G balance is wrong. What do I do?',
        a: 'Check your transaction history in the app (Wallet → Transaction History) to see all earn and redemption activity. If you believe there\'s an error, contact us at hello@goodygoodie.app.',
      },
    ],
  },
  {
    id: 'account',
    title: 'Account & Security',
    icon: IoLockClosedOutline,
    faqs: [
      {
        q: 'How do I reset my password?',
        a: 'On the sign-in screen, tap "Forgot password?" and enter your email address. You\'ll receive a reset link within a few minutes. Check your spam folder if it doesn\'t arrive.',
      },
      {
        q: 'How do I set up two-factor authentication?',
        a: 'Go to Settings → Security in the app and enable two-factor authentication. You\'ll be guided through linking an authenticator app (such as Google Authenticator or Authy). We strongly recommend enabling 2FA.',
      },
      {
        q: 'How do I change my email address?',
        a: 'Go to Settings → Personal Information (volunteers) or Settings → Organization Profile (retailers/nonprofits). Enter your new email and confirm it via the verification link sent to the new address.',
      },
      {
        q: 'How do I delete my account?',
        a: 'Go to Settings → Account and scroll to "Delete account." Your personal information will be removed from our systems, and any unredeemed #G balances will be forfeited. This action is permanent.',
      },
      {
        q: 'I think my account has been compromised. What should I do?',
        a: 'Change your password immediately and enable two-factor authentication. Then contact us at hello@goodygoodie.app and we\'ll help secure your account and review recent activity.',
      },
      {
        q: 'How is my data used?',
        a: 'We use your data to operate the platform — processing events, #G transactions, and communications. We never sell your personal information. See our full Privacy Policy at goodygoodie.app/privacy.',
      },
    ],
  },
  {
    id: 'technical',
    title: 'App & Technical',
    icon: IoPhonePortraitOutline,
    faqs: [
      {
        q: 'Which devices does GoodyGoodie support?',
        a: 'GoodyGoodie is available on iOS (16 and later) and Android (13 and later). The web app at goodygoodie.app works on any modern browser.',
      },
      {
        q: 'The app is crashing or not loading. What should I try?',
        a: 'Try force-closing and reopening the app. If that doesn\'t help, check for an update in the App Store or Google Play. Still having issues? Contact us at hello@goodygoodie.app with your device model and OS version.',
      },
      {
        q: 'My QR code isn\'t working. How do I fix it?',
        a: 'QR codes expire periodically for security. Pull down to refresh on the QR screen to generate a new one. Make sure your device screen brightness is turned up for scanning.',
      },
      {
        q: 'I\'m not receiving push notifications.',
        a: 'Check that notification permissions are enabled for GoodyGoodie in your device settings (Settings → GoodyGoodie → Notifications on iOS; Settings → Apps → GoodyGoodie → Notifications on Android). You can also manage preferences in-app under Settings → Notifications.',
      },
      {
        q: 'Does GoodyGoodie work offline?',
        a: 'The app requires an internet connection for most features, including event check-in, QR redemption, and wallet balance. An active connection is needed at the time of check-in and redemption.',
      },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
//  COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function PageHero() {
  return (
    <section className="bg-white pt-20 pb-12 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-teal mb-3">Support</p>
        <h1 className="text-5xl md:text-6xl font-extrabold text-black tracking-tight leading-none mb-5">
          Help Center
        </h1>
        <p className="text-lg text-mid leading-relaxed max-w-xl mx-auto">
          Answers to common questions for volunteers, retailers, and nonprofits.
        </p>
      </div>
    </section>
  )
}

function CategoryNav() {
  return (
    <section className="py-8 px-6 bg-gray-light border-b border-gray-light">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map(({ icon: Icon, label, id, color }) => (
            <a
              key={id}
              href={`#${id}`}
              className="flex flex-col items-center gap-2 rounded-2xl p-4 bg-white border border-gray-light hover:border-teal transition-colors text-center group"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color} group-hover:bg-teal group-hover:text-white transition-colors`}>
                <Icon size={18} />
              </div>
              <span className="text-xs font-semibold text-mid group-hover:text-black transition-colors leading-tight">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqSection({ section }: { section: typeof sections[0] }) {
  const Icon = section.icon
  return (
    <section id={section.id} className="scroll-mt-20 mb-14">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-green-light flex items-center justify-center">
          <Icon size={18} className="text-teal" />
        </div>
        <h2 className="text-xl font-extrabold text-black">{section.title}</h2>
      </div>
      <div className="divide-y divide-gray-light border border-gray-light rounded-2xl overflow-hidden bg-white">
        {section.faqs.map(({ q, a }) => (
          <details key={q} className="group">
            <summary className="flex items-start justify-between gap-4 px-6 py-5 cursor-pointer list-none">
              <span className="font-semibold text-black text-sm leading-snug">{q}</span>
              <span className="text-mid/70 group-open:rotate-45 transition-transform shrink-0 mt-0.5 text-lg font-light">+</span>
            </summary>
            <div className="px-6 pb-5 text-mid text-sm leading-relaxed border-t border-gray-light pt-3">
              {a}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}

function StillNeedHelp() {
  return (
    <section className="py-16 px-6 bg-green-light mt-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <IoChatbubbleOutline size={20} className="text-teal" />
          </div>
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
            <IoMailOutline size={20} className="text-teal" />
          </div>
        </div>
        <h2 className="text-2xl font-extrabold text-black mb-2">Still need help?</h2>
        <p className="text-mid text-sm mb-8 leading-relaxed max-w-md mx-auto">
          Can't find what you're looking for? Send us a message and we'll get back to you within one business day.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/feedback"
            className="inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-teal rounded-full px-6 py-3 hover:opacity-90 transition-opacity"
          >
            Send us a message
          </Link>
          <a
            href="mailto:hello@goodygoodie.app"
            className="inline-flex items-center justify-center gap-2 text-sm font-bold text-teal rounded-full px-6 py-3 border-2 border-teal hover:bg-white transition-colors"
          >
            <IoMailOutline size={14} />
            hello@goodygoodie.app
          </a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  ROOT
// ─────────────────────────────────────────────────────────────────────────────

export default function HelpPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero />
        <CategoryNav />
        <section className="py-16 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            {sections.map(section => (
              <FaqSection key={section.id} section={section} />
            ))}
          </div>
        </section>
        <StillNeedHelp />
      </main>
      <Footer />
    </>
  )
}
