'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

// ── iPhone mockup with simulated app screen ───────────────────────────────────

function PhoneMockup() {
  // SVG chart path matching the actual app's line graph shape
  const W = 240, H = 72, pad = 6
  const pts = [4,18,10,22,16,14,21,19,28,12,35,16,42,11,50,18,58,9,66,15,74,8,82,13,90,7,100,10,112,6,124,9,136,5,150,8,162,4,172,7,182,3].reduce((acc: {x:number,y:number}[], v, i, arr) => {
    if (i % 2 === 0) acc.push({ x: pad + (arr[i] / 182) * (W - pad*2), y: pad + (arr[i+1] / 28) * (H - pad*2) })
    return acc
  }, [])
  let line = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
  for (let i = 1; i < pts.length; i++) {
    const dx = (pts[i].x - pts[i-1].x) * 0.45
    line += ` C ${(pts[i-1].x+dx).toFixed(1)} ${pts[i-1].y.toFixed(1)} ${(pts[i].x-dx).toFixed(1)} ${pts[i].y.toFixed(1)} ${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)}`
  }
  const last = pts[pts.length - 1]
  const area = `${line} L ${last.x.toFixed(1)} ${H} L ${pts[0].x.toFixed(1)} ${H} Z`

  return (
    <div className="relative mx-auto" style={{ width: 275, height: 570 }}>
      {/* Phone shell — light silver, Coinbase-style */}
      <div
        className="absolute inset-0 rounded-[44px]"
        style={{
          background: 'linear-gradient(160deg, #ffffff 0%, #e8f4f2 60%, #d8eeea 100%)',
          boxShadow: '0 20px 48px rgba(25,63,58,0.22), 0 2px 8px rgba(0,0,0,0.08), inset 0 0 0 1.5px rgba(101,190,173,0.25)',
        }}
      />

      {/* Screen area */}
      <div
        className="absolute overflow-hidden"
        style={{ top: 8, left: 8, right: 8, bottom: 8, borderRadius: 38, background: '#f2f4f7' }}
      >
        {/* App content */}
        <div className="absolute inset-0 flex flex-col" style={{ paddingTop: 20 }}>

          {/* Header row */}
          <div className="flex items-center justify-between px-4 pb-2">
            {/* Hamburger */}
            <div className="flex flex-col gap-[3px]">
              {[0,1,2].map(i => <div key={i} className="w-4 h-[2px] rounded-full bg-gray-800" />)}
            </div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#111' }}>GoodyGoodie</p>
            {/* Bell */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2" strokeLinecap="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          </div>

          {/* Page title */}
          <p style={{ fontSize: 15, fontWeight: 800, color: '#111', paddingLeft: 14, paddingBottom: 8 }}>Be Goody. Get Goodies.</p>

          {/* Metric card — graph view, matching the app */}
          <div className="mx-3 rounded-2xl overflow-hidden" style={{ backgroundColor: '#65BEAD' }}>
            {/* Card header */}
            <div className="flex items-center justify-between px-3 pt-3 pb-1">
              <p style={{ fontSize: 7.5, fontWeight: 700, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>#Gs Earned</p>
              {/* List icon */}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="2.5">
                <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                <circle cx="3" cy="6" r="1.5" fill="rgba(255,255,255,0.75)" stroke="none"/>
                <circle cx="3" cy="12" r="1.5" fill="rgba(255,255,255,0.75)" stroke="none"/>
                <circle cx="3" cy="18" r="1.5" fill="rgba(255,255,255,0.75)" stroke="none"/>
              </svg>
            </div>
            <p style={{ fontSize: 28, fontWeight: 800, color: '#fff', paddingLeft: 12, lineHeight: 1.1, letterSpacing: -0.5 }}>73 <span style={{ fontSize: 18 }}>#Gs</span></p>

            {/* SVG chart */}
            <div style={{ marginTop: 4 }}>
              <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', width: '100%' }}>
                <defs>
                  <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#fff" stopOpacity="0.18"/>
                    <stop offset="1" stopColor="#fff" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d={area} fill="url(#cg)"/>
                <path d={line} fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx={last.x} cy={last.y} r="4" fill="#fff"/>
                <circle cx={last.x} cy={last.y} r="8" fill="#fff" fillOpacity="0.18"/>
              </svg>
            </div>

            {/* Range row */}
            <div className="flex items-center justify-between px-2 pb-2.5" style={{ marginTop: 2 }}>
              <div className="flex gap-0.5">
                {['1D','1W','1M','1Y','All'].map(r => (
                  <div key={r} style={{
                    paddingLeft: 7, paddingRight: 7, paddingTop: 3, paddingBottom: 3,
                    borderRadius: 999,
                    backgroundColor: r === '1M' ? 'rgba(255,255,255,0.22)' : 'transparent',
                  }}>
                    <span style={{ fontSize: 7.5, fontWeight: 700, color: r === '1M' ? '#fff' : 'rgba(255,255,255,0.5)' }}>{r}</span>
                  </div>
                ))}
              </div>
              {/* Options icon */}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round">
                <line x1="4" y1="6" x2="20" y2="6"/><circle cx="8" cy="6" r="2" fill="rgba(255,255,255,0.6)" stroke="none"/>
                <line x1="4" y1="12" x2="20" y2="12"/><circle cx="16" cy="12" r="2" fill="rgba(255,255,255,0.6)" stroke="none"/>
                <line x1="4" y1="18" x2="20" y2="18"/><circle cx="10" cy="18" r="2" fill="rgba(255,255,255,0.6)" stroke="none"/>
              </svg>
            </div>
          </div>

          {/* Quick actions */}
          <div className="flex justify-around px-3 py-3">
            {[
              { label: 'Earn /\nRedeem', primary: true,
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><path d="M7 16L17 8M17 8H11M17 8v6"/><path d="M17 16L7 8M7 8h6M7 8v6" opacity="0.6"/></svg> },
              { label: 'Volunteer',
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#65BEAD" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
              { label: 'Find\nRetailers',
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#65BEAD" strokeWidth="2" strokeLinecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg> },
              { label: 'Transaction\nHistory',
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#65BEAD" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
            ].map(({ label, primary, icon }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <div className="w-11 h-11 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: primary ? '#65BEAD' : '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.1)' }}>
                  {icon}
                </div>
                <p style={{ fontSize: 7, textAlign: 'center', lineHeight: 1.3, color: '#555', fontWeight: 500, whiteSpace: 'pre-line' }}>{label}</p>
              </div>
            ))}
          </div>

          {/* My Goodies heading */}
          <p style={{ fontSize: 11, fontWeight: 800, color: '#111', paddingLeft: 14 }}>My Goodies</p>
        </div>
      </div>
    </div>
  )
}

// ── Hero email form ────────────────────────────────────────────────────────────

export default function HeroSection() {
  const router = useRouter()
  const [email, setEmail] = useState('')

  function handleSignUp(e: FormEvent) {
    e.preventDefault()
    const encoded = encodeURIComponent(email.trim())
    router.push(`/home${encoded ? `?email=${encoded}` : ''}`)
  }

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: '#ffffff',
        minHeight: '100vh',
      }}
    >

      <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-0 min-h-screen flex items-center">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center w-full">

          {/* ── Column 1: Phone mockup in teal box ─────────────────────── */}
          <div className="flex items-center justify-center order-2 md:order-1">
            <div
              className="relative w-full flex justify-center items-start"
              style={{
                background: 'linear-gradient(145deg, #3DA898 0%, #65BEAD 40%, #4CB8A6 70%, #2E9485 100%)',
                borderRadius: 36,
                paddingTop: 20,
                overflow: 'hidden',
                height: 452,
              }}
            >
              {/* Top-left highlight glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 75% 55% at 25% 15%, rgba(255,255,255,0.22) 0%, transparent 60%)',
                }}
              />
              {/* Bottom-right depth shadow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse 60% 50% at 80% 90%, rgba(0,0,0,0.12) 0%, transparent 65%)',
                }}
              />
              <div style={{ position: 'relative', flexShrink: 0, transform: 'scale(1.22)', transformOrigin: 'top center' }}>
                <PhoneMockup />
              </div>
            </div>
          </div>

          {/* ── Column 2: Copy + sign-up form ──────────────────────────── */}
          <div className="order-1 md:order-2 flex flex-col gap-6">
            {/* H1 */}
            <h1
              className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-none"
              style={{ color: '#193F3A' }}
            >
              Be Goody.<br />
              <span style={{ color: '#65BEAD' }}>Get Goodies.</span>
            </h1>

            {/* Body */}
            <p className="text-base md:text-lg leading-relaxed max-w-md" style={{ color: '#4B6B66' }}>
              GoodyGoodie is a community loop connecting volunteers, local retailers, and nonprofits — where doing good comes with real rewards.
            </p>

            {/* Sign up form */}
            <div className="mt-2">
              <p className="text-sm font-bold mb-3" style={{ color: '#9BB8B4', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Sign up today
              </p>
              <form onSubmit={handleSignUp} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#65BEAD] text-[#193F3A] placeholder:text-gray-400"
                  style={{
                    backgroundColor: '#F3F8F7',
                    border: '1.5px solid #D0E8E4',
                  }}
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#65BEAD' }}
                >
                  Sign up
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
