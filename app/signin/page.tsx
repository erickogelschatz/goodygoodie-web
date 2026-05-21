'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  IoMailOutline, IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline,
  IoKeypadOutline, IoArrowForwardOutline, IoWarningOutline,
} from '@/app/components/Icons'
import { createClient } from '@/app/lib/supabase/client'

// ─────────────────────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────────────────────

type Stage = 'credentials' | 'otp'

// ─────────────────────────────────────────────────────────────────────────────
//  FIELD WRAPPER
// ─────────────────────────────────────────────────────────────────────────────

function Field({
  label, children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-black">{label}</label>
      {children}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  SIGN-IN PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function SignInPage() {
  const router = useRouter()
  const supabase = createClient()

  const [stage, setStage] = useState<Stage>('credentials')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ── Step 1: email + password ──────────────────────────────────────────────

  async function handleCredentials(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (signInError) {
      // Check for MFA required — Supabase returns code 'mfa_challenge_required'
      // or error type string containing 'mfa' for users with MFA enrolled
      const needsMfa =
        (signInError as { code?: string }).code === 'mfa_challenge_required' ||
        signInError.message.toLowerCase().includes('mfa') ||
        signInError.message.toLowerCase().includes('aal2')
      if (needsMfa) {
        // MFA required — advance to OTP stage
        setStage('otp')
      } else {
        setError(signInError.message)
      }
      return
    }

    // No MFA configured — signed in directly.
    // Full page load ensures the auth cookie is sent to the server
    // before the portal layout's getUser() check runs.
    window.location.assign('/portal')
  }

  // ── Step 2: OTP (TOTP / email OTP) ───────────────────────────────────────

  async function handleOtp(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Get current MFA factors
    const { data: factorsData } = await supabase.auth.mfa.listFactors()
    const totpFactor = factorsData?.totp?.[0]

    if (totpFactor) {
      // TOTP challenge
      const { data: challengeData, error: challengeError } =
        await supabase.auth.mfa.challenge({ factorId: totpFactor.id })

      if (challengeError) {
        setError(challengeError.message)
        setLoading(false)
        return
      }

      const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId: totpFactor.id,
        challengeId: challengeData.id,
        code: otp,
      })

      if (verifyError) {
        setError('Invalid code. Please try again.')
        setLoading(false)
        return
      }

      setLoading(false)
      window.location.assign('/portal')
    } else {
      // No TOTP factor found — cannot complete MFA
      setError('No authenticator app is set up for this account. Please contact support.')
      setLoading(false)
    }
  }

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-light flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-light px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2" aria-label="GoodyGoodie home">
          <Image src="/icon.png" alt="" width={32} height={32} style={{ width: 32, height: 32, objectFit: 'contain' }} />
          <span className="font-heading font-medium text-base tracking-tight text-black">GoodyGoodie</span>
        </Link>
        <span className="text-sm text-mid">
          New here?{' '}
          <Link href="/home" className="text-teal font-semibold hover:text-teal transition-colors">
            Create account
          </Link>
        </span>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-light shadow-sm p-8">

          {stage === 'credentials' ? (
            <>
              <div className="mb-8 text-center">
                <div className="w-12 h-12 rounded-2xl bg-green-light flex items-center justify-center mx-auto mb-4">
                  <IoLockClosedOutline size={22} className="text-teal" />
                </div>
                <h1 className="text-2xl font-extrabold text-black mb-1">Welcome back</h1>
                <p className="text-mid text-sm">Sign in to your GoodyGoodie account</p>
              </div>

              {error && (
                <div className="mb-5 flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-2xl p-3.5 text-sm text-red-700">
                  <IoWarningOutline size={16} className="shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              <form onSubmit={handleCredentials} className="flex flex-col gap-5">
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
                      autoComplete="current-password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-teal text-white font-bold text-sm rounded-full py-3.5 hover:opacity-90 transition-opacity disabled:opacity-60 mt-1"
                >
                  {loading ? 'Signing in…' : (
                    <>Sign in <IoArrowForwardOutline size={15} /></>
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-mid/70 mt-6">
                By signing in you agree to our{' '}
                <Link href="/terms" className="underline hover:text-mid">Terms</Link>
                {' '}and{' '}
                <Link href="/privacy" className="underline hover:text-mid">Privacy Policy</Link>.
              </p>
            </>
          ) : (
            <>
              <div className="mb-8 text-center">
                <div className="w-12 h-12 rounded-2xl bg-green-light flex items-center justify-center mx-auto mb-4">
                  <IoKeypadOutline size={22} className="text-teal" />
                </div>
                <h1 className="text-2xl font-extrabold text-black mb-1">Two-step verification</h1>
                <p className="text-mid text-sm">Enter the 6-digit code from your authenticator app</p>
              </div>

              {error && (
                <div className="mb-5 flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-2xl p-3.5 text-sm text-red-700">
                  <IoWarningOutline size={16} className="shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              <form onSubmit={handleOtp} className="flex flex-col gap-5">
                <Field label="Verification code">
                  <div className="relative">
                    <IoKeypadOutline size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mid/70" />
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      required
                      autoComplete="one-time-code"
                      value={otp}
                      onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-light text-sm tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition"
                    />
                  </div>
                </Field>

                <button
                  type="submit"
                  disabled={loading || otp.length < 6}
                  className="w-full flex items-center justify-center gap-2 bg-teal text-white font-bold text-sm rounded-full py-3.5 hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {loading ? 'Verifying…' : (
                    <>Verify <IoArrowForwardOutline size={15} /></>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => { setStage('credentials'); setError(null); setOtp('') }}
                  className="text-center text-sm text-mid/70 hover:text-mid transition-colors"
                >
                  ← Back to sign in
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
