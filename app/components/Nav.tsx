'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { IoMenuOutline, IoCloseOutline } from '@/app/components/Icons'

const links = [
  { href: '/how-it-works',   label: 'How it works'   },
  { href: '/for-retailers',  label: 'For Retailers'  },
  { href: '/for-nonprofits', label: 'For Nonprofits' },
  { href: '/blog',           label: 'Blog'           },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-light">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2.5" aria-label="GoodyGoodie home">
          <Image src="/icon.png" alt="" width={36} height={36} className="h-9 w-9" priority />
          <span className="font-heading font-medium text-[1.1rem] tracking-tight text-black">GoodyGoodie</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-mid">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="hover:text-black transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link href="/signin" className="text-sm font-semibold text-mid hover:text-black transition-colors">
            Sign in
          </Link>
          <Link href="/home" className="text-sm font-semibold text-white bg-teal rounded-full px-5 py-2 hover:opacity-90 transition-opacity">
            Get started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1 text-mid"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open
            ? <IoCloseOutline size={26} />
            : <IoMenuOutline  size={26} />
          }
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-light px-6 pb-6 pt-4 flex flex-col gap-4">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-base font-medium text-black hover:text-black transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-2 border-t border-gray-light">
            <Link href="/signin" onClick={() => setOpen(false)} className="text-base font-semibold text-mid hover:text-black transition-colors">
              Sign in
            </Link>
            <Link href="/home" onClick={() => setOpen(false)} className="text-base font-semibold text-white bg-teal rounded-full px-5 py-3 text-center hover:opacity-90 transition-opacity">
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
