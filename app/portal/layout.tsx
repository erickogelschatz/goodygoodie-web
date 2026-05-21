import { redirect } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/server'
import AppShell from '@/app/components/AppShell'

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/signin')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, display_name, first_name')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/signin')

  return (
    <AppShell profile={profile}>
      {children}
    </AppShell>
  )
}
