'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  IoPersonOutline, IoStorefrontOutline, IoHeartOutline,
  IoMailOutline, IoChatbubbleOutline, IoWarningOutline,
  IoCheckmarkCircleOutline, IoArrowForwardOutline,
  IoBulbOutline, IoBugOutline, IoThumbsUpOutline, IoHelpCircleOutline,
} from '@/app/components/Icons'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

// ─────────────────────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────────────────────

type Category = 'general' | 'bug' | 'feature' | 'compliment' | 'other'
type Role = 'volunteer' | 'retailer' | 'nonprofit' | 'other'

// ─────────────────────────────────────────────────────────────────────────────
//  FIELD WRAPPER
// ─────────────────────────────────────────────────────────────────────────────

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-semibold text-black">{label}</label>
        {hint && <span className="text-xs text-mid/70">{hint}</span>}
      </div>
      {children}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  FEEDBACK FORM
// ─────────────────────────────────────────────────────────────────────────────

const feedbackCategories: { value: Category; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { value: 'general',    label: 'General feedback',  icon: IoChatbubbleOutline },
  { value: 'bug',        label: 'Report a bug',       icon: IoBugOutline        },
  { value: 'feature',    label: 'Feature request',    icon: IoBulbOutline       },
  { value: 'compliment', label: 'Compliment',         icon: IoThumbsUpOutline   },
  { value: 'other',      label: 'Other',              icon: IoHelpCircleOutline },
]

const roles: { value: Role; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { value: 'volunteer',  label: 'Volunteer',  icon: IoPersonOutline      },
  { value: 'retailer',   label: 'Retailer',   icon: IoStorefrontOutline  },
  { value: 'nonprofit',  label: 'Nonprofit',  icon: IoHeartOutline       },
  { value: 'other',      label: 'Other',      icon: IoPersonOutline      },
]

export default function FeedbackPage() {
  const [category, setCategory] = useState<Category>('general')
  const [role, setRole] = useState<Role>('volunteer')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')
    setErrorMessage('')

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, role, name, email, subject, message }),
      })

      if (!res.ok) throw new Error('Server error')
      setStatus('success')
      setName(''); setEmail(''); setSubject(''); setMessage('')
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again or email us directly at admin@goodygoodie.app.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Nav />
      <main className="bg-gray-light min-h-screen">
        {/* Hero */}
        <section className="bg-white pt-20 pb-12 px-6 border-b border-gray-light">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-teal mb-3">We're listening</p>
            <h1 className="text-5xl md:text-6xl font-extrabold text-black tracking-tight leading-none mb-5">
              Send feedback
            </h1>
            <p className="text-lg text-mid leading-relaxed max-w-lg mx-auto">
              Bug reports, feature ideas, compliments, or anything else — we read every message.
            </p>
          </div>
        </section>

        <section className="py-12 px-6">
          <div className="max-w-2xl mx-auto">

            {status === 'success' ? (
              <div className="bg-white rounded-3xl border border-gray-light shadow-sm p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-green-light flex items-center justify-center mx-auto mb-5">
                  <IoCheckmarkCircleOutline size={30} className="text-teal" />
                </div>
                <h2 className="text-2xl font-extrabold text-black mb-2">Message received</h2>
                <p className="text-mid text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                  Thanks for taking the time to write in. We'll review your message and get back to you within one business day.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    onClick={() => setStatus('idle')}
                    className="inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-teal rounded-full px-6 py-3 hover:opacity-90 transition-opacity"
                  >
                    Send another message
                  </button>
                  <Link href="/help" className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-mid rounded-full px-6 py-3 border border-gray-light hover:border-teal transition-colors">
                    Visit Help Center
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-gray-light shadow-sm p-8 md:p-10">

                {status === 'error' && (
                  <div className="mb-6 flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-2xl p-4 text-sm text-red-700">
                    <IoWarningOutline size={16} className="shrink-0 mt-0.5" />
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-7">

                  {/* Feedback type */}
                  <Field label="What kind of feedback is this?">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {feedbackCategories.map(({ value, label, icon: Icon }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setCategory(value)}
                          className={`flex items-center gap-2.5 rounded-xl px-4 py-3 border-2 text-sm font-semibold transition-all text-left ${
                            category === value
                              ? 'border-teal bg-green-light text-teal'
                              : 'border-gray-light bg-white text-mid hover:border-teal/40'
                          }`}
                        >
                          <Icon size={15} className={category === value ? 'text-teal' : 'text-mid/70'} />
                          {label}
                        </button>
                      ))}
                    </div>
                  </Field>

                  {/* Role */}
                  <Field label="I'm using GoodyGoodie as a…">
                    <div className="grid grid-cols-4 gap-2.5">
                      {roles.map(({ value, label, icon: Icon }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setRole(value)}
                          className={`flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 border-2 text-xs font-semibold transition-all ${
                            role === value
                              ? 'border-teal bg-green-light text-teal'
                              : 'border-gray-light bg-white text-mid hover:border-teal/40'
                          }`}
                        >
                          <Icon size={16} />
                          {label}
                        </button>
                      ))}
                    </div>
                  </Field>

                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Your name" hint="Optional">
                      <div className="relative">
                        <IoPersonOutline size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mid/70" />
                        <input
                          type="text"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="First Last"
                          autoComplete="name"
                          className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-light text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition"
                        />
                      </div>
                    </Field>
                    <Field label="Email address" hint="For follow-up">
                      <div className="relative">
                        <IoMailOutline size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mid/70" />
                        <input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          autoComplete="email"
                          className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-light text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition"
                        />
                      </div>
                    </Field>
                  </div>

                  {/* Subject */}
                  <Field label="Subject">
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      placeholder="Brief summary of your feedback"
                      className="w-full px-4 py-3 rounded-xl border border-gray-light text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition"
                    />
                  </Field>

                  {/* Message */}
                  <Field label="Message" hint="Required">
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Tell us what's on your mind. The more detail, the better."
                      className="w-full px-4 py-3 rounded-xl border border-gray-light text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal transition resize-none"
                    />
                    <span className="text-xs text-mid/70 text-right">{message.length} / 2000</span>
                  </Field>

                  <button
                    type="submit"
                    disabled={loading || message.trim().length === 0 || subject.trim().length === 0}
                    className="w-full flex items-center justify-center gap-2 bg-teal text-white font-bold text-sm rounded-full py-4 hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {loading ? 'Sending…' : (<>Send feedback <IoArrowForwardOutline size={15} /></>)}
                  </button>

                  <p className="text-center text-xs text-mid/70">
                    Or email us directly at{' '}
                    <a href="mailto:hello@goodygoodie.app" className="text-teal hover:underline">hello@goodygoodie.app</a>
                  </p>
                </form>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
