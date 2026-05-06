import type { Metadata } from 'next'
import Link from 'next/link'
import {
  IoHeartOutline, IoCalendarOutline, IoCheckmarkCircleOutline,
  IoBriefcaseOutline, IoShieldCheckmarkOutline, IoPeopleOutline,
  IoArrowForwardOutline, IoQrCodeOutline, IoStarOutline,
  IoStorefrontOutline, IoBarChartOutline, IoNotificationsOutline,
} from '@/app/components/Icons'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'For Nonprofits — Attract More Volunteers',
  description: 'Post events, get paired with retail sponsors, and reward your volunteers automatically. GoodyGoodie handles the logistics so you can focus on your mission.',
}

// ─────────────────────────────────────────────────────────────────────────────
//  HERO
// ─────────────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="bg-white pt-20 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-light text-teal rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <IoHeartOutline size={14} />
              For Nonprofits
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-black tracking-tight leading-none mb-6">
              More volunteers.<br /><span className="text-teal">No overhead.</span>
            </h1>
            <p className="text-mid text-lg leading-relaxed mb-4">
              When volunteers earn real rewards for their time, they show up more consistently — and they bring their friends.
            </p>
            <p className="text-mid text-lg leading-relaxed mb-10">
              GoodyGoodie handles the reward logistics so you can stay focused on your mission. Listing your organization and posting events is completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/home" className="inline-flex items-center justify-center gap-2 text-base font-bold text-white bg-teal rounded-full px-7 py-3.5 hover:opacity-90 transition-opacity">
                List your organization <IoArrowForwardOutline size={16} />
              </Link>
              <Link href="/how-it-works" className="inline-flex items-center justify-center gap-2 text-base font-semibold text-mid rounded-full px-7 py-3.5 border border-gray-light hover:border-teal transition-colors">
                See how it works
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { icon: IoCalendarOutline,        text: 'Post events in minutes — live instantly' },
              { icon: IoQrCodeOutline,           text: 'Verify attendance with a QR scan' },
              { icon: IoBriefcaseOutline,        text: 'Pitch local retailers for sponsorship' },
              { icon: IoShieldCheckmarkOutline,  text: 'No cash through your org — zero compliance risk' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-4 bg-gray-light rounded-2xl px-5 py-4 border border-gray-light">
                <div className="w-9 h-9 rounded-xl bg-green-light flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-teal" />
                </div>
                <p className="font-semibold text-black text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  HOW IT WORKS FOR NONPROFITS
// ─────────────────────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: IoHeartOutline,
      title: 'Create your nonprofit profile',
      body: 'Sign up, describe your mission, and list your organization on GoodyGoodie. Volunteers and retailers browsing the platform will be able to find and follow you.',
    },
    {
      number: '02',
      icon: IoCalendarOutline,
      title: 'Post a volunteer event',
      body: 'Create an event with a date, volunteer cap, cause tags, and attendance verification settings. Events go live instantly. Volunteers can register directly from the app.',
    },
    {
      number: '03',
      icon: IoBriefcaseOutline,
      title: 'Pitch a local retailer for sponsorship',
      body: 'Browse retailers on the platform and send a sponsorship request. When a retailer accepts, their funds back the #G rewards your volunteers will earn — you never touch the money.',
    },
    {
      number: '04',
      icon: IoQrCodeOutline,
      title: 'Verify attendance in the app',
      body: 'On event day, scan volunteer QR codes to verify attendance. That\'s it. Verified hours automatically trigger #G awards to each volunteer\'s wallet — no spreadsheets, no forms.',
    },
  ]

  return (
    <section className="py-20 px-6 bg-gray-light">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-teal mb-3">Your journey</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-4">How it works for nonprofits</h2>
          <p className="text-mid text-lg max-w-xl mx-auto">From profile to verified hours — everything is handled in the app.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {steps.map(({ number, icon: Icon, title, body }) => (
            <div key={number} className="bg-white rounded-3xl p-8 border border-gray-light shadow-sm flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-teal text-white flex items-center justify-center text-sm font-black">{number}</div>
                <div className="w-10 h-10 rounded-xl bg-green-light flex items-center justify-center">
                  <Icon size={20} className="text-teal" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-black leading-snug mb-2">{title}</h3>
                <p className="text-mid text-sm leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  VALUE PROPS
// ─────────────────────────────────────────────────────────────────────────────

function ValueProps() {
  const features = [
    {
      icon: IoPeopleOutline,
      title: 'More consistent volunteers',
      body: 'When volunteers earn real, tangible rewards for their time, they show up more reliably — and recruit others. Incentives change behavior.',
    },
    {
      icon: IoCalendarOutline,
      title: 'Event management in one place',
      body: 'Post events, manage registrations, set volunteer caps, and track attendance — all from the GoodyGoodie app. No third-party tools required.',
    },
    {
      icon: IoQrCodeOutline,
      title: 'QR-based attendance verification',
      body: 'Scan volunteer QR codes on arrival. Verification is instant, and verified hours automatically trigger #G awards. No manual follow-up.',
    },
    {
      icon: IoBriefcaseOutline,
      title: 'Direct retailer pitch tool',
      body: 'Browse local retailers and send sponsorship requests directly from the app. When a retailer accepts, your event is funded and reward-backed.',
    },
    {
      icon: IoShieldCheckmarkOutline,
      title: 'Zero cash through your org',
      body: 'GoodyGoodie funds never pass through your organization. No financial compliance complexity, no charitable-solicitation registration triggered by this structure.',
    },
    {
      icon: IoBarChartOutline,
      title: 'Volunteer engagement data',
      body: 'See which events attract repeat volunteers, track attendance rates, and understand your most engaged supporters — without any manual data entry.',
    },
  ]

  return (
    <section className="py-20 px-6 bg-green-light">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-teal mb-3">Why GoodyGoodie</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-4">Built for nonprofits</h2>
          <p className="text-mid text-lg max-w-xl mx-auto">Everything you need to attract, reward, and retain volunteers — and nothing you don't.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-green-light flex items-center justify-center mb-4">
                <Icon size={20} className="text-teal" />
              </div>
              <h4 className="font-bold text-black mb-2">{title}</h4>
              <p className="text-mid text-sm leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  THE SPONSORSHIP MODEL
// ─────────────────────────────────────────────────────────────────────────────

function SponsorshipModel() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-widest text-teal mb-3">The funding model</p>
          <h2 className="text-4xl font-extrabold text-black tracking-tight mb-4">How rewards get funded</h2>
          <p className="text-mid text-lg max-w-xl mx-auto">
            GoodyGoodie uses a retailer-sponsorship model. You never handle money — and your volunteers still get rewarded.
          </p>
        </div>
        <div className="bg-gray-light rounded-3xl p-8 md:p-10 border border-gray-light">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-green-light flex items-center justify-center">
                <IoStorefrontOutline size={26} className="text-teal" />
              </div>
              <h4 className="font-bold text-black">1. Retailer sponsors</h4>
              <p className="text-mid text-sm leading-relaxed">A local retailer chooses your event and sets a sponsorship amount. Their funds back the reward pool.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-green-light flex items-center justify-center">
                <IoCheckmarkCircleOutline size={26} className="text-teal" />
              </div>
              <h4 className="font-bold text-black">2. You verify hours</h4>
              <p className="text-mid text-sm leading-relaxed">Volunteers check in, you verify attendance via QR scan. Verified hours trigger automatic #G awards.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-green-light flex items-center justify-center">
                <IoStarOutline size={26} className="text-teal" />
              </div>
              <h4 className="font-bold text-black">3. Volunteers get rewarded</h4>
              <p className="text-mid text-sm leading-relaxed">#Gs land in each volunteer's wallet — worth $1 each, redeemable at the sponsoring retailer. You never touch the funds.</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-light flex items-start gap-3">
            <IoShieldCheckmarkOutline size={20} className="text-teal shrink-0 mt-0.5" />
            <p className="text-mid text-sm leading-relaxed">
              <strong className="text-black">No cash passes through your organization.</strong> GoodyGoodie manages the funds between retailer payment and volunteer redemption. This structure keeps your nonprofit clean from a financial compliance standpoint.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  FAQ
// ─────────────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'Is GoodyGoodie free for nonprofits?',
    a: 'Yes. Listing your organization and posting events is completely free. The retailer sponsorship covers the reward costs — nonprofits never pay.',
  },
  {
    q: 'What if we can\'t find a sponsor?',
    a: 'You can still post events and recruit volunteers without sponsorship. Volunteers won\'t earn #Gs for unsponsored events, but you can still use GoodyGoodie for event management and attendance tracking.',
  },
  {
    q: 'Does GoodyGoodie give money to our organization?',
    a: 'No. GoodyGoodie does not disburse funds to nonprofits. The retailer sponsorship backs the #G rewards that volunteers earn. Nonprofits benefit from more motivated, consistent volunteers — not from direct payments.',
  },
  {
    q: 'Do we need to register as a commercial co-venture?',
    a: 'The GoodyGoodie structure is designed to avoid traditional commercial co-venture (CCV) triggers, since no funds pass through your organization. However, CCV laws vary by state and we recommend a brief review with legal counsel before broad launch in your region.',
  },
  {
    q: 'How many events can we post?',
    a: 'There\'s no hard limit on events. Post as many as you need, with different volunteer caps, cause tags, and sponsorship statuses.',
  },
  {
    q: 'What happens to unclaimed #Gs?',
    a: '#Gs expire after 24 months of inactivity per volunteer-retailer pair. Unclaimed points are managed by GoodyGoodie — they don\'t create any ongoing liability for your organization.',
  },
]

function FAQ() {
  return (
    <section className="py-20 px-6 bg-gray-light">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-black tracking-tight mb-4">Nonprofit FAQ</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {faqs.map(({ q, a }) => (
            <div key={q} className="py-6">
              <h3 className="text-base font-bold text-black mb-2">{q}</h3>
              <p className="text-mid leading-relaxed text-sm">{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  CTA
// ─────────────────────────────────────────────────────────────────────────────

function Cta() {
  return (
    <section className="py-24 px-6 bg-ink">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
          Give your volunteers a reason<br /><span className="text-teal">to keep coming back.</span>
        </h2>
        <p className="text-mid/70 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
          Join nonprofits using GoodyGoodie to attract more motivated volunteers — for free.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/home" className="inline-flex items-center justify-center gap-2 text-base font-bold text-black bg-white rounded-full px-8 py-4 hover:opacity-90 transition-opacity">
            List your organization <IoArrowForwardOutline size={16} />
          </Link>
          <Link href="/how-it-works" className="inline-flex items-center justify-center gap-2 text-base font-bold text-teal rounded-full px-8 py-4 border border-white/20 hover:border-white/20 transition-colors">
            See how it works
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  ROOT
// ─────────────────────────────────────────────────────────────────────────────

export default function ForNonprofitsPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <ValueProps />
        <SponsorshipModel />
        <FAQ />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
