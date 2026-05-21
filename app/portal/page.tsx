import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/app/lib/supabase/server'
import {
  IoHeartOutline, IoStorefrontOutline, IoCalendarOutline,
  IoSwapVerticalOutline, IoCheckmarkCircleOutline, IoPhonePortraitOutline,
  IoPeopleOutline, IoGridOutline,
} from '@/app/components/Icons'
import PortalGreeting from './_components/PortalGreeting'

// ── Role configs ──────────────────────────────────────────────────────────────

const ROLE_CONFIG: Record<string, {
  greeting: string
  description: string
  cards: { icon: React.ComponentType<{ size?: number; className?: string }>; title: string; body: string; href: string; cta: string }[]
}> = {
  user: {
    greeting: 'Welcome back, volunteer.',
    description: 'Your app is where the action is — volunteer for events, earn #Gs, and redeem at your sponsoring retailer.',
    cards: [
      { icon: IoHeartOutline,        title: 'Find events',        body: 'Browse volunteer events in your community posted by nonprofits near you.',   href: '/for-nonprofits', cta: 'Explore nonprofits' },
      { icon: IoSwapVerticalOutline, title: 'Earn & Redeem',      body: 'Every verified volunteer hour earns you #Gs redeemable at the sponsoring retailer.', href: '/how-it-works', cta: 'How it works' },
      { icon: IoPhonePortraitOutline, title: 'Open the app',      body: 'Sign in on your phone to check in to events, see your wallet, and redeem #Gs.', href: '/', cta: 'Get the app' },
    ],
  },
  retailer: {
    greeting: 'Welcome back.',
    description: 'Sponsor local volunteer events, build community loyalty, and drive foot traffic — all from the GoodyGoodie platform.',
    cards: [
      { icon: IoPeopleOutline,       title: 'Sponsorships',       body: 'Select the nonprofit events you want to sponsor. Your funding backs the #Gs volunteers earn.', href: '/for-retailers', cta: 'Learn more' },
      { icon: IoStorefrontOutline,   title: 'Offers',             body: 'Publish special offers for volunteers who redeem their #Gs at your store.',   href: '/for-retailers', cta: 'View offers' },
      { icon: IoPhonePortraitOutline, title: 'Cashier scanner',   body: 'The GoodyGoodie app lets your staff scan and verify redemption QR codes at the register.', href: '/for-retailers', cta: 'For retailers' },
    ],
  },
  nonprofit: {
    greeting: 'Welcome back.',
    description: 'Create and manage your volunteer events, attract sponsors, and track the hours your volunteers put in.',
    cards: [
      { icon: IoCalendarOutline,     title: 'Your events',        body: 'Create and manage volunteer events. Pitch them to local retailers for sponsorship.',  href: '/for-nonprofits', cta: 'For nonprofits' },
      { icon: IoCheckmarkCircleOutline, title: 'Verify attendance', body: 'Use the GoodyGoodie app to scan volunteers and verify their hours in real time.', href: '/for-nonprofits', cta: 'Learn more' },
      { icon: IoStorefrontOutline,   title: 'Find sponsors',      body: 'Browse local retailers and send sponsorship pitch requests directly from the app.',    href: '/for-retailers', cta: 'For retailers' },
    ],
  },
  admin: {
    greeting: 'Welcome back, admin.',
    description: 'Manage blog content, review pending items, and keep the GoodyGoodie platform running smoothly.',
    cards: [
      { icon: IoGridOutline,         title: 'Blog posts',         body: 'Create, edit, and publish blog posts for the GoodyGoodie marketing site.',           href: '/admin/blog', cta: 'Go to blog admin' },
      { icon: IoHeartOutline,        title: 'Marketing site',     body: 'View the live GoodyGoodie.app marketing site as visitors and prospective users see it.', href: '/', cta: 'View site' },
      { icon: IoPhonePortraitOutline, title: 'Mobile app',        body: 'The full admin panel — event approvals, user management, and financial views — lives in the mobile app.', href: '/', cta: 'Open app' },
    ],
  },
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function PortalHomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/signin')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, display_name, first_name')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/signin')

  const role = profile.role ?? 'user'
  const config = ROLE_CONFIG[role] ?? ROLE_CONFIG.user
  // Prefer first_name, then first word of display_name, then email local-part
  const name =
    profile.first_name?.trim() ||
    profile.display_name?.split(' ')[0]?.trim() ||
    user.email?.split('@')[0] ||
    'there'

  return (
    <div className="p-6 md:p-10 max-w-4xl">

      {/* Greeting */}
      <PortalGreeting
        userId={user.id}
        firstName={name.split(' ')[0]}
        description={config.description}
      />

      {/* Quick action cards */}
      <div className="grid md:grid-cols-3 gap-5 mb-10">
        {config.cards.map((card) => {
          const Icon = card.icon
          return (
            <div key={card.title} className="bg-white rounded-2xl border border-gray-light p-5 flex flex-col gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-light flex items-center justify-center">
                <Icon size={20} className="text-teal" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-black mb-1">{card.title}</p>
                <p className="text-xs text-mid leading-relaxed">{card.body}</p>
              </div>
              <Link
                href={card.href}
                className="text-xs font-bold text-teal hover:text-teal/80 transition-colors"
              >
                {card.cta} →
              </Link>
            </div>
          )
        })}
      </div>

      {/* App download CTA */}
      <div className="bg-ink rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="font-heading font-semibold text-white text-base mb-1">Most features live in the app</p>
          <p className="text-white/60 text-sm">Download GoodyGoodie for iOS or Android to access your full account.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold rounded-full px-4 py-2">
            App Store
          </span>
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold rounded-full px-4 py-2">
            Google Play
          </span>
        </div>
      </div>
    </div>
  )
}
