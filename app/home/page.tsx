'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  IoPersonOutline, IoStorefrontOutline, IoHeartOutline,
  IoMailOutline, IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline,
  IoArrowForwardOutline, IoWarningOutline, IoCheckmarkCircleOutline,
} from '@/app/components/Icons'
import { createClient } from '@/app/lib/supabase/client'

// ─────────────────────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────────────────────

type Role = 'user' | 'retailer' | 'nonprofit'
type Stage = 'role' | 'details' | 'verify'

// ─────────────────────────────────────────────────────────────────────────────
//  ROLE CARD
// ─────────────────────────────────────────────────────────────────────────────

const ROLES: { value: Role; label: string; sublabel: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { value: 'user',      label: 'Volunteer',   sublabel: 'Earn #Gs for your time',         icon: IoPersonOutline      },
  { value: 'retailer',  label: 'Retailer',    sublabel: 'Sponsor events, drive foot traffic', icon: IoStorefrontOutline  },
  { value: 'nonprofit', label: 'Nonprofit',   sublabel: 'Post events, attract volunteers', icon: IoHeartOutline       },
]

function RoleCard({
  role, selected, onSelect,
}: {
  role: typeof ROLES[0]
  selected: boolean
  onSelect: () => void
}) {
  const Icon = role.icon
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`aspect-square flex flex-col items-center justify-center gap-2.5 rounded-2xl p-5 border-2 transition-all text-center w-full ${selected ? 'border-teal bg-green-light' : 'border-gray-light bg-white hover:border-teal/40'}`}
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${selected ? 'bg-teal' : 'bg-gray-light'}`}>
        <Icon size={20} className={selected ? 'text-white' : 'text-mid'} />
      </div>
      <div>
        <p className={`text-sm font-bold ${selected ? 'text-teal' : 'text-black'}`}>{role.label}</p>
        <p className={`text-xs mt-0.5 leading-tight ${selected ? 'text-teal/70' : 'text-mid/70'}`}>{role.sublabel}</p>
      </div>
      {selected && (
        <IoCheckmarkCircleOutline size={16} className="text-teal" />
      )}
    </button>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  FIELD WRAPPER
// ─────────────────────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-black">{label}</label>
      {children}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  GET STARTED PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function GetStartedPage() {
  const router = useRouter()
  const supabase = createClient()

  const searchParams = useSearchParams()

  const [stage, setStage] = useState<Stage>('role')
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [name, setName] = useState('')
  const [orgName, setOrgName] = useState('')
  const [email, setEmail] = useState(() => searchParams.get('email') ?? '')

  // Keep email in sync if the URL param changes (e.g. back-navigation)
  useEffect(() => {
    const param = searchParams.get('email')
    if (param) setEmail(param)
  }, [searchParams])
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ── Stage 1: Role selection ──────────────────────────────────────────────

  function handleRoleNext() {
    if (!selectedRole) return
    setStage('details')
  }

  // ── Stage 2: Account details ──────────────────────────────────────────────

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)

    const displayName = selectedRole === 'user' ? name : orgName

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: selectedRole,
          display_name: displayName,
        },
      },
    })

    setLoading(false)

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    setStage('verify')
  }

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-light flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-light px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2" aria-label="GoodyGoodie home">
          <Image src="/icon.png" alt="" width={32} height={32} className="h-8 w-8" />
          <span className="font-heading font-medium text-base tracking-tight text-black">GoodyGoodie</span>
        </Link>
        <span className="text-sm text-mid">
          Already have an account?{' '}
          <Link href="/signin" className="text-teal font-semibold hover:text-teal transition-colors">
            Sign in
          </Link>
        </span>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className={`w-full bg-white rounded-3xl border border-gray-light shadow-sm p-8 ${stage === 'role' ? 'max-w-lg' : 'max-w-sm'}`}>

          {/* ── Stage: verify ── */}
          {stage === 'verify' && (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-2xl bg-green-light flex items-center justify-center mx-auto mb-5">
                <IoCheckmarkCircleOutline size={28} className="text-teal" />
              </div>
              <h1 className="text-2xl font-extrabold text-black mb-2">Check your email</h1>
              <p className="text-mid text-sm leading-relaxed mb-6">
                We sent a confirmation link to <strong className="text-black">{email}</strong>. Click it to activate your account.
              </p>
              <p className="text-xs text-mid/70 mb-6">
                Didn't get it? Check your spam folder, or{' '}
                <button
                  type="button"
                  className="text-teal hover:underline"
                  onClick={async () => {
                    await supabase.auth.resend({ type: 'signup', email })
                  }}
                >
                  resend
                </button>
                .
              </p>
              <Link href="/signin" className="inline-flex items-center gap-1.5 text-sm font-bold text-teal hover:text-teal transition-colors">
                Go to sign in <IoArrowForwardOutline size={13} />
              </Link>
            </div>
          )}

          {/* ── Stage: role ── */}
          {stage === 'role' && (
            <>
              <div className="mb-8 text-center">
                <h1 className="text-2xl font-extrabold text-black mb-1">Get started</h1>
                <p className="text-mid text-sm">Who are you joining as?</p>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-8">
                {ROLES.map(role => (
                  <RoleCard
                    key={role.value}
                    role={role}
                    selected={selectedRole === role.value}
                    onSelect={() => setSelectedRole(role.value)}
                  />
                ))}
              </div>

              <button
                type="button"
                disabled={!selectedRole}
                onClick={handleRoleNext}
                className="w-full flex items-center justify-center gap-2 bg-teal text-white font-bold text-sm rounded-full py-3.5 hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                Continue <IoArrowForwardOutline size={15} />
              </button>

              <p className="text-center text-xs text-mid/70 mt-5">
                Already have an account?{' '}
                <Link href="/signin" className="text-teal font-semibold hover:underline">Sign in</Link>
              </p>
            </>
          )}

          {/* ── Stage: details ── */}
          {stage === 'details' && (
            <>
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => { setStage('role'); setError(null) }}
                  className="text-xs text-mid/70 hover:text-mid transition-colors mb-4 block"
                >
                  ← Change role
                </button>
                <h1 className="text-2xl font-extrabold text-black mb-1">Create your account</h1>
                <p className="text-mid text-sm">
                  Joining as a{' '}
                  <span className="font-semibold text-teal capitalize">
                    {selectedRole === 'user' ? 'volunteer' : selectedRole}
                  </span>
                </p>
              </div>

              {error && (
                <div className="mb-5 flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-2xl p-3.5 text-sm text-red-700">
                  <IoWarningOutline size={16} className="shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                {selectedRole === 'user' ? (
                  <Field label="Your name">
                    <div className="relative">
                      <IoPersonOutline size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mid/70" />
                      <input
                        type="text"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="First Last"
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-light text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition"
                      />
                    </div>
                  </Field>
                ) : (
                  <Field label={selectedRole === 'retailer' ? 'Business name' : 'Organization name'}>
                    <div className="relative">
                      {selectedRole === 'retailer'
                        ? <IoStorefrontOutline size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mid/70" />
                        : <IoHeartOutline size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mid/70" />
                      }
                      <input
                        type="text"
                        required
                        value={orgName}
                        onChange={e => setOrgName(e.target.value)}
                        placeholder={selectedRole === 'retailer' ? 'Acme Coffee Co.' : 'Community Food Bank'}
                        className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-light text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition"
                      />
                    </div>
                  </Field>
                )}

                <Field label="Email address">
                  <div className="relative">
                    <IoMailOutline size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mid/70" />
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-light text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition"
                    />
                  </div>
                </Field>

                <Field label="Password">
                  <div className="relative">
                    <IoLockClosedOutline size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mid/70" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="new-password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      className="w-full pl-9 pr-10 py-3 rounded-xl border border-gray-light text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-mid/70 hover:text-mid transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <IoEyeOffOutline size={16} /> : <IoEyeOutline size={16} />}
                    </button>
                  </div>
                </Field>

                <Field label="Confirm password">
                  <div className="relative">
                    <IoLockClosedOutline size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mid/70" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-light text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition"
                    />
                  </div>
                </Field>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-teal text-white font-bold text-sm rounded-full py-3.5 hover:opacity-90 transition-opacity disabled:opacity-60 mt-1"
                >
                  {loading ? 'Creating account…' : (
                    <>Create account <IoArrowForwardOutline size={15} /></>
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-mid/70 mt-5">
                By creating an account you agree to our{' '}
                <Link href="/terms" className="underline hover:text-mid">Terms</Link>
                {' '}and{' '}
                <Link href="/privacy" className="underline hover:text-mid">Privacy Policy</Link>.
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  )
}
