'use client'

import { useEffect, useState } from 'react'

interface PortalGreetingProps {
  userId: string
  firstName: string
  description: string
}

export default function PortalGreeting({ userId, firstName, description }: PortalGreetingProps) {
  const [prefix, setPrefix] = useState<'Hello' | 'Welcome back'>('Hello')

  useEffect(() => {
    const key = `gg_welcomed_${userId}`
    try {
      const seen = localStorage.getItem(key)
      if (seen) {
        setPrefix('Welcome back')
      } else {
        localStorage.setItem(key, '1')
        setPrefix('Hello')
      }
    } catch {
      // localStorage unavailable (SSR, private browsing) — default to Hello
    }
  }, [userId])

  return (
    <div className="mb-10">
      <h1 className="font-heading text-3xl font-bold text-black mb-2">
        {prefix}, {firstName}!
      </h1>
      <p className="text-mid text-base leading-relaxed max-w-lg">{description}</p>
    </div>
  )
}
