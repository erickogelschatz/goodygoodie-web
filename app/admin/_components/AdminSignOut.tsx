'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/client'

export default function AdminSignOut() {
  const router = useRouter()
  const supabase = createClient()

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/signin')
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-white/70 hover:text-white transition-colors text-sm font-medium"
    >
      Sign out
    </button>
  )
}
