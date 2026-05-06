import Link from 'next/link'
import type { Metadata } from 'next'
import {
  IoPersonOutline, IoStorefrontOutline, IoHeartOutline,
  IoLocationOutline, IoSwapHorizontalOutline, IoBarChartOutline,
  IoCalendarOutline, IoCheckmarkCircleOutline, IoBriefcaseOutline,
  IoShieldCheckmarkOutline, IoClipboardOutline, IoStarOutline,
} from '@/app/components/Icons'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'GoodyGoodie — Volunteer. Earn. Redeem.',
  description:
    'GoodyGoodie connects volunteers, local retailers, and nonprofits in a community loop that rewards doing good — with real value.',
  openGraph: {
    title: 'GoodyGoodie — Volunteer. Earn. Redeem.',
    description: 'Volunteer at sponsored events, earn #Gs, and redeem them at local businesses that care.',
    url: 'https://goodygoodie.app',
  },
}

// ─────────────────────────────────────────────────────────────────────────────
//  HERO
// ─────────────────────────────────────────────────────────────────────────────

function AudienceCard({
  icon: Icon, role, headline, body, ctaLabel, ctaHref, primary = false,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>
  role: string; headline: string; body: string
  ctaLabel: string; ctaHref: string; primary?: boolean
}) {
  return (
    <div className={`rounded-3xl p-8 flex flex-col gap-5 border ${primary ? 'bg-teal border-teal' : 'bg-white border-gray-light'}`}>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${primary ? 'bg-white/20' : 'bg-green-light'}`}>
        <Icon size={24} className={primary ? 'text-white' : 'text-teal'} />
      </div>
      <div>
        <p className={`text-xs font-bold uppercase tracking-widest mb-1.5 ${primary ? 'text-white/60' : 'text-mid/70'}`}>{role}</p>
        <h3 className={`text-xl font-extrabold leading-snug ${primary ? 'text-white' : 'text-black'}`}>{headline}</h3>
      </div>
      <p className={`text-sm leading-relaxed flex-1 ${primary ? 'text-white/80' : 'text-mid'}`}>{body}</p>
      <Link
        href={ctaHref}
        className={`inline-flex items-center gap-1.5 text-sm font-bold rounded-full px-5 py-2.5 self-start hover:opacity-90 transition-opacity ${primary ? 'bg-white text-teal' : 'bg-green-light text-teal'}`}
      >
        {ctaLabel} →
      </Link>
    </div>
  )
}

function Hero() {
  return (
    <section className="bg-white pt-20 pb-28 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-green-light text-teal rounded-full px-4 py-1.5 text-sm font-semibold mb-8">
          <IoStarOutline size={14} />
          Volunteer · Earn #Gs · Do Good
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-black tracking-tight leading-none mb-5">
          Be Goody.<br /><span className="text-teal">Get Goodies.</span>
        </h1>
        <p className="text-lg md:text-xl text-mid max-w-2xl mx-auto mb-16 leading-relaxed">
          A community loop connecting volunteers, local retailers, and nonprofits —
          where doing good comes with real rewards.
        </p>
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
          <AudienceCard icon={IoPersonOutline} role="Volunteers" headline="Volunteer and earn rewards" body="Give your time, earn #Gs, and redeem them at local businesses that sponsor your cause." ctaLabel="Download the app" ctaHref="/home" primary />
          <AudienceCard icon={IoStorefrontOutline} role="Retailers" headline="Build loyalty through community" body="Sponsor local volunteer events. Volunteers earn your rewards — redeemable only at your store." ctaLabel="Become a sponsor" ctaHref="/for-retailers" />
          <AudienceCard icon={IoHeartOutline} role="Nonprofits" headline="Attract more volunteers" body="Post events, get paired with sponsors, and reward your volunteers automatically — no cash required." ctaLabel="List your org" ctaHref="/for-nonprofits" />
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  HOW IT WORKS
// ─────────────────────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: IoStorefrontOutline,
      title: 'Retailer sponsors an event',
      body: 'A local business funds a volunteer event through GoodyGoodie, choosing which nonprofits and events to support. Their sponsorship backs the #G rewards volunteers will earn.',
    },
    {
      number: '02',
      icon: IoClipboardOutline,
      title: 'Nonprofit hosts, volunteers show up',
      body: "A nonprofit posts the event. Volunteers register, show up, and log their hours. The nonprofit verifies attendance directly in the app — no paperwork.",
    },
    {
      number: '03',
      icon: IoStarOutline,
      title: 'Earn #Gs and redeem them',
      body: "Each verified hour earns whole #Gs (1 #G = $1 at the sponsoring retailer). Volunteers spend them in-store, closing a loop that's good for everyone.",
    },
  ]

  return (
    <section className="py-24 px-6 bg-gray-light">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-teal mb-3">The Loop</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-4">How GoodyGoodie works</h2>
          <p className="text-mid text-lg max-w-xl mx-auto">Three players. One community loop. Real value for everyone.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(({ number, icon: Icon, title, body }) => (
            <div key={number} className="bg-white rounded-3xl p-8 border border-gray-light shadow-sm flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-green-light text-teal flex items-center justify-center text-sm font-black">{number}</div>
                <div className="w-10 h-10 rounded-xl bg-gray-light flex items-center justify-center">
                  <Icon size={20} className="text-mid/70" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-black leading-snug mb-2">{title}</h3>
                <p className="text-mid text-sm leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/how-it-works" className="inline-flex items-center gap-2 text-sm font-bold rounded-full px-6 py-3 border-2 border-teal text-teal hover:bg-green-light transition-colors">
            See the full explainer →
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  FOR RETAILERS
// ─────────────────────────────────────────────────────────────────────────────

function ForRetailers() {
  const features = [
    { icon: IoLocationOutline,        title: 'Hyper-local reach',    body: 'Your sponsorship funds events in your community — reaching people who already live and shop nearby.' },
    { icon: IoSwapHorizontalOutline,  title: 'Closed-loop rewards',  body: '#Gs earned at your sponsored events can only be redeemed at your store. Every volunteer is a potential return customer.' },
    { icon: IoBarChartOutline,        title: 'Real-time analytics',  body: 'Track volunteer hours, #Gs issued, redemption rates, and ROI from your retailer dashboard.' },
    { icon: IoHeartOutline,           title: 'You choose the cause', body: 'Select which nonprofits and events to support. Build a brand story rooted in genuine community investment.' },
  ]

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-teal mb-4">For Retailers</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight leading-tight mb-6">Turn community investment into loyal customers</h2>
            <p className="text-mid text-lg leading-relaxed mb-4">Sponsoring local volunteer events isn't charity — it's smart marketing. You fund the rewards. Volunteers earn them at your events. And they can only spend them at your store.</p>
            <p className="text-mid text-lg leading-relaxed mb-10">The result: new foot traffic, stronger brand affinity, and a community that associates your name with doing good.</p>
            <Link href="/for-retailers" className="inline-flex items-center gap-2 text-base font-bold text-white bg-teal rounded-full px-7 py-3.5 hover:opacity-90 transition-opacity">
              Learn more for retailers →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {features.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl p-6 bg-gray-light border border-gray-light">
                <div className="w-9 h-9 rounded-xl bg-green-light flex items-center justify-center mb-3">
                  <Icon size={18} className="text-teal" />
                </div>
                <h4 className="font-bold text-black text-sm mb-2">{title}</h4>
                <p className="text-mid text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  FOR NONPROFITS
// ─────────────────────────────────────────────────────────────────────────────

function ForNonprofits() {
  const features = [
    { icon: IoCalendarOutline,          title: 'Post events in minutes',     body: 'Create events with volunteer caps, cause tags, and verification settings — live instantly.' },
    { icon: IoCheckmarkCircleOutline,   title: 'Verify attendance in-app',   body: 'Scan volunteer QR codes on arrival. Verified hours trigger #G awards automatically — no spreadsheets.' },
    { icon: IoBriefcaseOutline,         title: 'Pitch to local retailers',   body: 'Request sponsorships directly from retailers in the app. When accepted, your volunteers earn #Gs for every hour.' },
    { icon: IoShieldCheckmarkOutline,   title: 'No cash, no compliance risk',body: "GoodyGoodie funds never pass through your organization. Clean, simple, and built to stay that way." },
  ]

  return (
    <section className="py-24 px-6 bg-green-light">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-3">
            {features.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white rounded-2xl p-5 flex gap-4 shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-green-light flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-teal" />
                </div>
                <div>
                  <h4 className="font-bold text-black text-sm mb-1">{title}</h4>
                  <p className="text-mid text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-teal mb-4">For Nonprofits</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight leading-tight mb-6">Give your volunteers a reason to keep coming back</h2>
            <p className="text-mid text-lg leading-relaxed mb-4">When volunteers earn real rewards for their time, they show up more consistently — and they bring their friends.</p>
            <p className="text-mid text-lg leading-relaxed mb-10">GoodyGoodie handles the reward logistics so you can stay focused on your mission.</p>
            <Link href="/for-nonprofits" className="inline-flex items-center gap-2 text-base font-bold rounded-full px-7 py-3.5 border-2 border-teal text-teal hover:bg-white transition-colors">
              Learn more for nonprofits →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  CTA BANNER
// ─────────────────────────────────────────────────────────────────────────────

function CtaBanner() {
  return (
    <section className="py-28 px-6 bg-ink">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
          Ready to do good<br /><span className="text-teal">and get rewarded for it?</span>
        </h2>
        <p className="text-mid/70 text-lg mb-12 leading-relaxed max-w-xl mx-auto">
          Join GoodyGoodie as a volunteer, a retailer, or a nonprofit. Every role makes the loop work.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/home" className="inline-flex items-center justify-center gap-2 text-base font-bold text-black bg-white rounded-full px-8 py-4 hover:opacity-90 transition-opacity">
            Get the app →
          </Link>
          <Link href="/for-retailers" className="inline-flex items-center justify-center gap-2 text-base font-bold text-teal rounded-full px-8 py-4 border border-white/20 hover:border-white/20 transition-colors">
            Sponsor your first event
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  ROOT
// ─────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <ForRetailers />
        <ForNonprofits />
        <CtaBanner />
      </main>
      <Footer />
    </>
  )
}
