'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/client'
import {
  IoHomeOutline, IoHeartOutline, IoStorefrontOutline,
  IoSwapVerticalOutline, IoTimeOutline, IoCalendarOutline,
  IoCheckmarkCircleOutline, IoPeopleOutline, IoGiftOutline,
  IoPricetagOutline, IoBarChartOutline, IoWalletOutline,
  IoBriefcaseOutline, IoCashOutline, IoGridOutline,
  IoHelpCircleOutline, IoSettingsOutline, IoLogOutOutline,
  IoMenuOutline, IoCloseOutline, IoSearchOutline,
} from '@/app/components/Icons'

// ── Types ─────────────────────────────────────────────────────────────────────

type Profile = {
  role: string
  display_name: string | null
  first_name?: string | null
}

type NavItem = {
  href: string
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

type NavSection = {
  title?: string
  items: NavItem[]
}

// ── Role-based nav sections ───────────────────────────────────────────────────

const ROLE_LABEL: Record<string, string> = {
  user:      'Volunteer',
  retailer:  'Retailer',
  nonprofit: 'Nonprofit',
  admin:     'Admin',
}

function getSections(role: string): NavSection[] {
  switch (role) {
    case 'retailer':
      return [
        {
          items: [
            { href: '/portal',                    label: 'Home',             icon: IoHomeOutline      },
            { href: '/portal/analytics',          label: 'Analytics',        icon: IoBarChartOutline  },
          ],
        },
        {
          title: 'Be Goody',
          items: [
            { href: '/for-nonprofits',            label: 'Nonprofits',       icon: IoHeartOutline     },
            { href: '/for-nonprofits',            label: 'Events',           icon: IoCalendarOutline  },
          ],
        },
        {
          title: 'My Business',
          items: [
            { href: '/portal/sponsorships',       label: 'Sponsorships',     icon: IoPeopleOutline    },
            { href: '/portal/offers',             label: 'Offers',           icon: IoPricetagOutline  },
            { href: '/portal/payment-methods',    label: 'Payment Methods',  icon: IoCashOutline      },
          ],
        },
        {
          title: 'Account',
          items: [
            { href: '/portal/profile',            label: 'Business Profile', icon: IoBriefcaseOutline },
            { href: '/help',                      label: 'Help & Support',   icon: IoHelpCircleOutline},
          ],
        },
      ]

    case 'nonprofit':
      return [
        {
          items: [
            { href: '/portal',                    label: 'Home',                icon: IoHomeOutline            },
            { href: '/portal/transaction-history',label: 'Transaction History', icon: IoTimeOutline            },
          ],
        },
        {
          title: 'Be Goody',
          items: [
            { href: '/portal/volunteers',         label: 'Volunteers',          icon: IoPeopleOutline          },
            { href: '/portal/verify',             label: 'Verify Attendance',   icon: IoCheckmarkCircleOutline },
            { href: '/portal/events',             label: 'Events',              icon: IoCalendarOutline        },
          ],
        },
        {
          title: 'Partnerships',
          items: [
            { href: '/portal/sponsorships',       label: 'Sponsorships',        icon: IoStorefrontOutline      },
          ],
        },
        {
          title: 'Account',
          items: [
            { href: '/portal/profile',            label: 'Org Profile',         icon: IoHeartOutline           },
            { href: '/help',                      label: 'Help & Support',      icon: IoHelpCircleOutline      },
          ],
        },
      ]

    case 'admin':
      return [
        {
          items: [
            { href: '/portal',           label: 'Home',             icon: IoHomeOutline   },
          ],
        },
        {
          title: 'Content',
          items: [
            { href: '/admin/blog',       label: 'Blog Posts',       icon: IoGridOutline   },
          ],
        },
        {
          title: 'Account',
          items: [
            { href: '/help',             label: 'Help & Support',   icon: IoHelpCircleOutline },
          ],
        },
      ]

    default: // user / volunteer
      return [
        {
          items: [
            { href: '/portal',                    label: 'Home',                icon: IoHomeOutline         },
            { href: '/portal/wallet',             label: 'Wallet',              icon: IoWalletOutline       },
            { href: '/portal/earn-redeem',        label: 'Earn & Redeem',       icon: IoSwapVerticalOutline },
            { href: '/portal/transaction-history',label: 'Transaction History', icon: IoTimeOutline         },
          ],
        },
        {
          title: 'Be Goody',
          items: [
            { href: '/for-nonprofits',            label: 'Nonprofits',          icon: IoHeartOutline        },
            { href: '/for-nonprofits',            label: 'Events',              icon: IoCalendarOutline     },
            { href: '/portal/referral',           label: 'Referral',            icon: IoGiftOutline         },
          ],
        },
        {
          title: 'Get Goodies',
          items: [
            { href: '/for-retailers',             label: 'Retailers',           icon: IoStorefrontOutline   },
            { href: '/for-retailers',             label: 'Offers',              icon: IoPricetagOutline     },
          ],
        },
        {
          title: 'Account',
          items: [
            { href: '/portal/settings',           label: 'Settings',            icon: IoSettingsOutline     },
            { href: '/help',                      label: 'Help & Support',      icon: IoHelpCircleOutline   },
          ],
        },
      ]
  }
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

function Sidebar({
  profile, onClose, mobile,
}: {
  profile: Profile
  onClose?: () => void
  mobile?: boolean
}) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const sections = getSections(profile.role)
  const roleLabel = ROLE_LABEL[profile.role] ?? profile.role
  const name =
    profile.first_name?.trim() ||
    profile.display_name?.split(' ')[0]?.trim() ||
    'Account'

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className={`flex flex-col h-full text-white ${mobile ? 'w-72' : 'w-60'}`} style={{ backgroundColor: '#65BEAD' }}>
      {/* Logo + close (mobile) */}
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <Link href="/portal" className="flex items-center gap-2.5" onClick={onClose}>
          <Image
            src="/icon.png" alt="" width={32} height={32}
            style={{ width: 32, height: 32, objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
          />
          <span className="font-heading font-semibold text-base tracking-tight text-white">GoodyGoodie</span>
        </Link>
        {mobile && (
          <button onClick={onClose} className="text-white/60 hover:text-white p-1">
            <IoCloseOutline size={22} />
          </button>
        )}
      </div>

      {/* User identity */}
      <div className="px-4 pb-4">
        <div className="rounded-xl px-3 py-2.5 flex items-center gap-2.5" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 font-bold text-sm" style={{ color: '#65BEAD' }}>
            {name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{name}</p>
            <p className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>{roleLabel}</p>
          </div>
        </div>
      </div>

      <div className="h-px mx-4 mb-2" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />

      {/* Nav sections */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-5">
        {sections.map((section, si) => (
          <div key={si}>
            {section.title && (
              <p className="text-[10px] font-bold uppercase tracking-widest px-2 mb-1.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {section.title}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = pathname === item.href
                const Icon = item.icon
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      active
                        ? 'text-white'
                        : 'text-white/80 hover:text-white'
                    }`}
                    style={active ? { backgroundColor: 'rgba(255,255,255,0.22)' } : undefined}
                  >
                    <Icon size={18} className="shrink-0" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Sign out */}
      <div className="p-3" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors hover:text-white"
          style={{ color: '#FFD0CF' }}
        >
          <IoLogOutOutline size={18} className="shrink-0" />
          Sign out
        </button>
      </div>
    </div>
  )
}

// ── App Shell ─────────────────────────────────────────────────────────────────

export default function AppShell({
  profile,
  title,
  children,
}: {
  profile: Profile
  title?: string
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-light overflow-hidden">

      {/* ── Desktop sidebar (always visible) ────────────────────────────── */}
      <div className="hidden md:flex flex-col shrink-0 h-full overflow-y-auto">
        <Sidebar profile={profile} />
      </div>

      {/* ── Mobile sidebar overlay ───────────────────────────────────────── */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <div className="relative z-10">
            <Sidebar profile={profile} onClose={() => setSidebarOpen(false)} mobile />
          </div>
        </div>
      )}

      {/* ── Main area ────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="bg-white border-b border-gray-light px-5 h-14 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              className="md:hidden text-mid hover:text-black"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <IoMenuOutline size={22} />
            </button>
            <h1 className="font-heading font-semibold text-base text-black">
              {title ?? 'Home'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold text-mid hover:text-black transition-colors"
            >
              ← Marketing site
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
