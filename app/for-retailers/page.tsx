import type { Metadata } from 'next'
import Link from 'next/link'
import {
  IoStorefrontOutline, IoLocationOutline, IoSwapHorizontalOutline,
  IoBarChartOutline, IoHeartOutline, IoCheckmarkCircleOutline,
  IoArrowForwardOutline, IoPeopleOutline, IoTrendingUpOutline,
  IoStarOutline, IoCalendarOutline, IoCashOutline, IoShieldCheckmarkOutline,
} from '@/app/components/Icons'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'For Retailers — Sponsor Local Volunteer Events',
  description: 'Sponsor volunteer events in your community. Volunteers earn rewards redeemable only at your store — driving real foot traffic and brand loyalty.',
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
              <IoStorefrontOutline size={14} />
              For Local Retailers
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-black tracking-tight leading-none mb-6">
              Community investment.<br /><span className="text-teal">Real customers.</span>
            </h1>
            <p className="text-mid text-lg leading-relaxed mb-4">
              Sponsoring local volunteer events isn't charity — it's smart marketing. You fund the rewards. Volunteers earn them at your sponsored events. And they can only spend them at your store.
            </p>
            <p className="text-mid text-lg leading-relaxed mb-10">
              The result: new foot traffic, stronger brand affinity, and a community that associates your name with doing good.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/home" className="inline-flex items-center justify-center gap-2 text-base font-bold text-white bg-teal rounded-full px-7 py-3.5 hover:opacity-90 transition-opacity">
                Get started <IoArrowForwardOutline size={16} />
              </Link>
              <Link href="/how-it-works" className="inline-flex items-center justify-center gap-2 text-base font-semibold text-mid rounded-full px-7 py-3.5 border border-gray-light hover:border-teal transition-colors">
                See how it works
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: IoPeopleOutline,      label: 'Volunteers become customers' },
              { icon: IoLocationOutline,    label: 'Hyper-local reach'           },
              { icon: IoSwapHorizontalOutline, label: 'Closed-loop redemption'   },
              { icon: IoBarChartOutline,    label: 'Real-time analytics'         },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="rounded-2xl p-6 bg-gray-light border border-gray-light flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-light flex items-center justify-center">
                  <Icon size={20} className="text-teal" />
                </div>
                <p className="font-semibold text-black text-sm leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  HOW IT WORKS FOR RETAILERS
// ─────────────────────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: IoStorefrontOutline,
      title: 'Create your retailer account',
      body: 'Sign up for GoodyGoodie and set up your store profile. Add your location, business category, and a short description so volunteers know who you are.',
    },
    {
      number: '02',
      icon: IoHeartOutline,
      title: 'Browse and sponsor events',
      body: 'Explore volunteer events posted by nonprofits in your area. Filter by cause, date, or proximity. When you find the right fit, set your sponsorship amount — your funds back the #G rewards volunteers will earn.',
    },
    {
      number: '03',
      icon: IoStarOutline,
      title: 'Volunteers earn and redeem at your store',
      body: 'Every verified hour earns volunteers #Gs — worth $1 each, redeemable only at your store. When they come in to spend them, they\'re already familiar with your brand. Their discount is applied at the register in seconds.',
    },
    {
      number: '04',
      icon: IoBarChartOutline,
      title: 'Track your ROI',
      body: 'Your retailer dashboard shows volunteer hours funded, #Gs issued, redemption rates, and in-store visits tied to your sponsorships. Know exactly what your community investment is returning.',
    },
  ]

  return (
    <section className="py-20 px-6 bg-gray-light">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-teal mb-3">Your journey</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-4">How it works for retailers</h2>
          <p className="text-mid text-lg max-w-xl mx-auto">From signup to redemption — everything you need to know.</p>
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
      icon: IoLocationOutline,
      title: 'Hyper-local reach',
      body: 'Your sponsorship funds events in your community — reaching people who already live and shop nearby. These aren\'t anonymous impressions. These are your neighbors.',
    },
    {
      icon: IoSwapHorizontalOutline,
      title: 'Closed-loop rewards',
      body: '#Gs earned at your sponsored events can only be redeemed at your store. Every volunteer you fund is a potential return customer with a reason to walk through your door.',
    },
    {
      icon: IoHeartOutline,
      title: 'You choose the cause',
      body: 'Select which nonprofits and events to support. Build a brand story rooted in genuine community investment — not generic corporate giving.',
    },
    {
      icon: IoPeopleOutline,
      title: 'Motivated new customers',
      body: 'Volunteers who earn #Gs at your sponsored event already have a positive association with your brand. They come in to spend, and they bring their community.',
    },
    {
      icon: IoBarChartOutline,
      title: 'Real-time analytics',
      body: 'Track volunteer hours, #Gs issued, redemption rates, and ROI from your retailer dashboard. See exactly what your sponsorship is generating.',
    },
    {
      icon: IoTrendingUpOutline,
      title: 'Repeatable sponsorships',
      body: 'Successful events can be re-sponsored. Build an ongoing relationship with a nonprofit, run the same event each quarter, and build a loyal base of returning customers.',
    },
  ]

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-teal mb-3">Why GoodyGoodie</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-4">What you get</h2>
          <p className="text-mid text-lg max-w-xl mx-auto">GoodyGoodie turns community investment into measurable business results.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl p-6 bg-gray-light border border-gray-light">
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
//  PRICING / STRUCTURE NOTE
// ─────────────────────────────────────────────────────────────────────────────

function HowFunding() {
  return (
    <section className="py-20 px-6 bg-green-light">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-bold uppercase tracking-widest text-teal mb-3">The financials</p>
          <h2 className="text-4xl font-extrabold text-black tracking-tight mb-4">How your sponsorship funds rewards</h2>
          <p className="text-mid text-lg max-w-xl mx-auto">
            Your sponsorship directly backs the #G rewards volunteers earn. When they redeem at your store, it closes the loop.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: IoCashOutline,            title: 'You set the amount',           body: 'Choose how much to put behind a specific event or nonprofit. No minimums required to get started.' },
            { icon: IoStarOutline,            title: 'Volunteers earn #Gs',          body: 'Each verified hour earns a whole number of #Gs — worth $1 each, redeemable only at your store.' },
            { icon: IoShieldCheckmarkOutline, title: 'GoodyGoodie handles the rest', body: 'We manage the reward logistics, verification, and redemption infrastructure so you can focus on your business.' },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-white">
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
//  FAQ
// ─────────────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'Do I need a POS integration?',
    a: 'No. GoodyGoodie uses a cashier scanner app that your staff uses to validate redemption QR codes. Discounts are applied as manual line items — no POS integration required.',
  },
  {
    q: 'What if volunteers don\'t redeem their #Gs?',
    a: '#Gs that are never redeemed are subject to breakage accounting — you\'re not on the hook for perpetual liability. GoodyGoodie manages the lifecycle of unredeemed rewards.',
  },
  {
    q: 'Can I sponsor multiple nonprofits?',
    a: 'Yes. You can sponsor any event from any nonprofit on the platform. Many retailers choose to support a few recurring causes for consistent brand alignment.',
  },
  {
    q: 'Can I set a cap on how many #Gs volunteers can earn?',
    a: 'Yes. When sponsoring an event, you control the total sponsorship amount and any per-volunteer caps. You\'ll never be surprised by your liability.',
  },
  {
    q: 'Is there a minimum spend to get started?',
    a: 'There is no set minimum to start. Reach out to our team for current sponsorship tiers and pricing.',
  },
]

function FAQ() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-black tracking-tight mb-4">Retailer FAQ</h2>
        </div>
        <div className="divide-y divide-gray-light">
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
          Ready to sponsor your<br /><span className="text-teal">first event?</span>
        </h2>
        <p className="text-mid/70 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
          Join local retailers who are turning community investment into loyal customers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/home" className="inline-flex items-center justify-center gap-2 text-base font-bold text-black bg-white rounded-full px-8 py-4 hover:opacity-90 transition-opacity">
            Create retailer account <IoArrowForwardOutline size={16} />
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

export default function ForRetailersPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <ValueProps />
        <HowFunding />
        <FAQ />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
