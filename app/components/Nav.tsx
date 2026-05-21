'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useCallback } from 'react'
import { IoMenuOutline, IoCloseOutline, IoSearchOutline } from '@/app/components/Icons'
import SearchModal from '@/app/components/SearchModal'

const links = [
  { href: '/how-it-works',   label: 'How it works'   },
  { href: '/for-retailers',  label: 'For Retailers'  },
  { href: '/for-nonprofits', label: 'For Nonprofits' },
  { href: '/blog',           label: 'Blog'           },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  // ⌘K / Ctrl+K shortcut
  const handleGlobalKey = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setSearchOpen(true)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleGlobalKey)
    return () => window.removeEventListener('keydown', handleGlobalKey)
  }, [handleGlobalKey])

  return (
    <>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-light">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
          {/* Logo — icon only */}
          <Link href="/" className="shrink-0" aria-label="GoodyGoodie home">
            <Image
              src="/icon.png" alt="GoodyGoodie" width={36} height={36}
              style={{ width: 36, height: 36, objectFit: 'contain' }}
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-mid">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="hover:text-black transition-colors">{l.label}</Link>
            ))}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Search icon */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="flex items-center justify-center w-9 h-9 rounded-full text-mid hover:text-black hover:bg-gray-100 transition-colors"
            >
              <IoSearchOutline size={18} />
            </button>

            <Link href="/signin" className="text-sm font-semibold text-mid hover:text-black transition-colors">Sign in</Link>
            <Link href="/home" className="text-sm font-semibold text-white bg-teal rounded-full px-5 py-2 hover:opacity-90 transition-opacity">Sign up</Link>
          </div>

          {/* Mobile: search + hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="p-2 text-mid hover:text-black transition-colors"
            >
              <IoSearchOutline size={22} />
            </button>
            <button className="p-1 text-mid" onClick={() => setOpen(o => !o)} aria-label={open ? 'Close menu' : 'Open menu'}>
              {open ? <IoCloseOutline size={26} /> : <IoMenuOutline size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="md:hidden bg-white border-t border-gray-light px-6 pb-6 pt-4 flex flex-col gap-4">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="text-base font-medium text-black" onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
            <div className="flex flex-col gap-3 pt-2 border-t border-gray-light">
              <Link href="/signin" onClick={() => setOpen(false)} className="text-base font-semibold text-mid">Sign in</Link>
              <Link href="/home" onClick={() => setOpen(false)} className="text-base font-semibold text-white bg-teal rounded-full px-5 py-3 text-center">Sign up</Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
