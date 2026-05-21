import { redirect } from 'next/navigation'

// All sign-in flows now land at /portal
export default function DashboardPage() {
  redirect('/portal')
}
