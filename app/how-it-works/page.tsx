import type { Metadata } from 'next'
import Link from 'next/link'
import {
  IoStorefrontOutline, IoClipboardOutline, IoStarOutline,
  IoPersonOutline, IoHeartOutline, IoCheckmarkCircleOutline,
  IoQrCodeOutline, IoWalletOutline, IoTrophyOutline,
  IoArrowForwardOutline, IoHelpCircleOutline,
} from '@/app/components/Icons'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'How GoodyGoodie Works',
  description: 'Learn how GoodyGoodie connects volunteers, local retailers, and nonprofits in a community loop that rewards doing good.',
}

// ─────────────────────────────────────────────────────────────────────────────
//  PAGE HERO
// ─────────────────────────────────────────────────────────────────────────────

function PageHero() {
  return (
    <section className="bg-white pt-20 pb-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-teal mb-3">The Loop</p>
        <h1 className="text-5xl md:text-6xl font-extrabold text-black tracking-tight leading-none mb-5">
          How GoodyGoodie works
        </h1>
        <p className="text-lg text-mid leading-relaxed">
          Three players. One community loop. Real value for everyone involved.
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  THE THREE STEPS
// ─────────────────────────────────────────────────────────────────────────────

function TheLoop() {
  const steps = [
    {
      number: '01',
      icon: IoStorefrontOutline,
      title: 'A retailer sponsors a volunteer event',
      body: 'A local business discovers volunteer events in the GoodyGoodie platform and chooses which nonprofits and events to support. When they sponsor an event, their funds back the #G rewards that volunteers will earn for their time — creating a direct connection between the business and the community it serves.',
      aside: 'Retailers pick their cause. Their brand story follows.',
    },
    {
      number: '02',
      icon: IoClipboardOutline,
      title: 'Nonprofit hosts, volunteers show up',
      body: "A nonprofit posts the event on GoodyGoodie and volunteers register. On event day, volunteers check in via QR code — the nonprofit verifies attendance directly in the app. No paperwork, no spreadsheets. The verified hours are the trigger for everything that happens next.",
      aside: 'Verification happens in seconds. No admin overhead.',
    },
    {
      number: '03',
      icon: IoStarOutline,
      title: 'Volunteers earn #Gs and redeem at the sponsor',
      body: "Each verified volunteer hour earns #Gs — points worth $1 each at the retailer that sponsored the event. Volunteers spend them in-store like a discount, right at the register. The retailer sees real foot traffic. The volunteer gets real value. The nonprofit gets more consistent volunteers.",
      aside: '#Gs are redeemable only at the sponsoring retailer.',
    },
  ]

  return (
    <section className="py-20 px-6 bg-gray-light">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-8">
          {steps.map(({ number, icon: Icon, title, body, aside }, i) => (
            <div key={number} className="bg-white rounded-3xl p-8 md:p-10 border border-gray-light shadow-sm">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex items-center gap-4 md:flex-col md:items-center md:gap-3 md:w-20 shrink-0">
                  <div className="w-12 h-12 rounded-full bg-teal text-white flex items-center justify-center text-lg font-black">{number}</div>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block w-px h-8 bg-mid/20 mx-auto" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-green-light flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={18} className="text-teal" />
                    </div>
                    <h3 className="text-xl font-extrabold text-black leading-snug">{title}</h3>
                  </div>
                  <p className="text-mid leading-relaxed mb-4">{body}</p>
                  <div className="inline-flex items-center gap-2 bg-green-light text-teal rounded-full px-4 py-1.5 text-sm font-semibold">
                    <IoCheckmarkCircleOutline size={14} />
                    {aside}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  BY ROLE
// ─────────────────────────────────────────────────────────────────────────────

function ByRole() {
  const roles = [
    {
      icon: IoPersonOutline,
      role: 'Volunteers',
      color: 'bg-teal text-white',
      steps: [
        'Download the GoodyGoodie app and create a free account.',
        'Browse volunteer events near you. Filter by cause, date, or retailer.',
        'Register for an event and show up. Check in with your QR code.',
        'Earn #Gs for every verified hour — worth $1 each at the sponsoring retailer.',
        'Open your wallet, pick a retailer balance, and redeem in-store.',
      ],
    },
    {
      icon: IoStorefrontOutline,
      role: 'Retailers',
      color: 'bg-white text-black border border-gray-light',
      steps: [
        'Create a retailer account on GoodyGoodie.',
        'Browse volunteer events posted by local nonprofits.',
        'Choose which events and causes match your brand. Set a sponsorship amount.',
        'Volunteers earn #Gs at your sponsored events — redeemable only at your store.',
        'Track redemptions, foot traffic, and ROI from your retailer dashboard.',
      ],
    },
    {
      icon: IoHeartOutline,
      role: 'Nonprofits',
      color: 'bg-white text-black border border-gray-light',
      steps: [
        'Create a nonprofit account and list your organization.',
        'Post volunteer events — set caps, dates, causes, and verification settings.',
        'Browse local retailers and send sponsorship pitch requests.',
        'When a retailer accepts, your event is funded. Volunteers earn #Gs for every hour.',
        'Verify attendance in the app by scanning volunteer QR codes. That\'s it.',
      ],
    },
  ]

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-widest text-teal mb-3">Your role</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-4">Step-by-step</h2>
          <p className="text-mid text-lg max-w-xl mx-auto">GoodyGoodie works a little differently depending on who you are.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {roles.map(({ icon: Icon, role, color, steps }) => (
            <div key={role} className={`rounded-3xl p-8 flex flex-col gap-5 ${color}`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color.includes('bg-teal') ? 'bg-white/20' : 'bg-green-light'}`}>
                <Icon size={22} className={color.includes('bg-teal') ? 'text-white' : 'text-teal'} />
              </div>
              <p className={`text-xs font-bold uppercase tracking-widest ${color.includes('bg-teal') ? 'text-white/70' : 'text-mid/70'}`}>{role}</p>
              <ol className="space-y-3">
                {steps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${color.includes('bg-teal') ? 'bg-white/20 text-white' : 'bg-green-light text-teal'}`}>{i + 1}</span>
                    <span className={color.includes('bg-teal') ? 'text-white/80' : 'text-mid'}>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  WHAT ARE #Gs
// ─────────────────────────────────────────────────────────────────────────────

function WhatAreGs() {
  const points = [
    { icon: IoWalletOutline,         title: '1 #G = $1',                   body: 'Each #G is worth exactly $1 at the retailer that sponsored the event where you earned it.' },
    { icon: IoQrCodeOutline,         title: 'Redeem at the register',       body: 'Open the app, select your balance, show the QR code. The cashier scans it and your discount is applied instantly.' },
    { icon: IoTrophyOutline,         title: 'Earned for verified hours',    body: 'You earn #Gs only after the nonprofit verifies your attendance — typically within hours of the event ending.' },
    { icon: IoCheckmarkCircleOutline, title: 'Retailer-scoped',             body: '#Gs earned at a Coffee Co-sponsored event can only be spent at Coffee Co. They don\'t transfer between retailers or convert to cash.' },
  ]

  return (
    <section className="py-20 px-6 bg-gray-light">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-teal mb-4">The reward currency</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight leading-tight mb-6">What are #Gs?</h2>
            <p className="text-mid text-lg leading-relaxed mb-4">
              #Gs are the reward points you earn for volunteering. Each one is worth $1 at the local retailer that sponsored your event — making them a direct, tangible thank-you for your time.
            </p>
            <p className="text-mid text-lg leading-relaxed">
              They're not cryptocurrency, they're not transferable, and they don't expire as long as you stay active. They're just a straightforward way to say: your time has value.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {points.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-white rounded-2xl p-5 flex gap-4 border border-gray-light shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-green-light flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-teal" />
                </div>
                <div>
                  <h4 className="font-bold text-black text-sm mb-1">{title}</h4>
                  <p className="text-mid text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
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
    q: 'Do #Gs expire?',
    a: '#Gs expire after 24 months of inactivity. Any time you earn or redeem #Gs at a specific retailer, the clock resets for that retailer balance.',
  },
  {
    q: 'Can I use #Gs at any store?',
    a: 'No — #Gs are retailer-scoped. The #Gs you earn at a Coffee Co-sponsored event can only be redeemed at Coffee Co. This is by design: it creates a direct, meaningful loop between volunteers and the business that funded their rewards.',
  },
  {
    q: 'Is GoodyGoodie available in my city?',
    a: 'GoodyGoodie is launching in select markets. Download the app or create an account to see which retailers and nonprofits are active near you.',
  },
  {
    q: 'Does money go to nonprofits through GoodyGoodie?',
    a: 'No. GoodyGoodie does not disburse funds to nonprofits. Retailers choose which nonprofits and events to sponsor — their sponsorship backs the rewards volunteers earn. Nonprofits benefit from more consistent, motivated volunteers, not from direct payments.',
  },
  {
    q: 'What does it cost for nonprofits?',
    a: 'Listing your organization and posting events on GoodyGoodie is free. Nonprofits never pay to participate — the retailer sponsorship funds the entire reward structure.',
  },
  {
    q: 'How do I know my hours were verified?',
    a: 'You\'ll get a notification in the app when a nonprofit verifies your attendance. Verified hours are converted to #Gs and added to your wallet, broken down by retailer balance.',
  },
]

function FAQ() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-teal mb-3">
            <IoHelpCircleOutline size={20} />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight mb-4">Frequently asked questions</h2>
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
          Ready to join the loop?
        </h2>
        <p className="text-mid/70 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
          Whether you volunteer, run a local business, or lead a nonprofit — there's a place for you in GoodyGoodie.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/home" className="inline-flex items-center justify-center gap-2 text-base font-bold text-black bg-white rounded-full px-8 py-4 hover:opacity-90 transition-opacity">
            Get the app <IoArrowForwardOutline size={16} />
          </Link>
          <Link href="/for-retailers" className="inline-flex items-center justify-center gap-2 text-base font-bold text-teal rounded-full px-8 py-4 border border-white/20 hover:border-white/20 transition-colors">
            I'm a retailer
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  ROOT
// ─────────────────────────────────────────────────────────────────────────────

export default function HowItWorksPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero />
        <TheLoop />
        <ByRole />
        <WhatAreGs />
        <FAQ />
        <Cta />
      </main>
      <Footer />
    </>
  )
}
