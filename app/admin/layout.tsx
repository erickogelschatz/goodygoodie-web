import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/app/lib/supabase/server'
import AdminSignOut from './_components/AdminSignOut'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/signin')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, display_name')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') redirect('/')

  return (
    <div className="min-h-screen bg-gray-light flex flex-col">
      {/* Admin top bar */}
      <header className="bg-ink sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link href="/admin/blog" className="flex items-center gap-2.5">
              <Image src="/icon.png" alt="" width={28} height={28} className="h-7 w-7" style={{ filter: 'brightness(0) invert(1)' }} />
              <span className="font-heading font-medium text-sm text-white tracking-tight">Admin</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/admin/blog" className="text-white/70 hover:text-white transition-colors font-medium">
                Blog Posts
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-white/50">{profile.display_name ?? user.email}</span>
            <Link href="/" className="text-white/70 hover:text-white transition-colors">
              ← View site
            </Link>
            <AdminSignOut />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
