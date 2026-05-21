'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function AdminPostActions({
  postId,
  slug,
  isPublished,
}: {
  postId: string
  slug: string
  isPublished: boolean
}) {
  const router = useRouter()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function togglePublish() {
    setBusy(true)
    setError('')
    try {
      const res = await fetch(`/api/blog/${postId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: !isPublished }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        setError(j.error ?? 'Failed to update post.')
        return
      }
      router.refresh()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  async function deletePost() {
    if (!confirm('Delete this post? This cannot be undone.')) return
    setBusy(true)
    setError('')
    try {
      const res = await fetch(`/api/blog/${postId}`, { method: 'DELETE' })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        setError(j.error ?? 'Failed to delete post.')
        return
      }
      router.refresh()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      {error && <p className="text-xs text-red-500">{error}</p>}
      <div className="flex items-center gap-2">
      <a
        href={`/blog/${slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-mid/70 hover:text-mid transition-colors px-2 py-1 rounded-lg hover:bg-gray-light"
      >
        View
      </a>
      <Link
        href={`/admin/blog/${postId}/edit`}
        className="text-xs font-semibold text-teal hover:text-teal/80 transition-colors px-2 py-1 rounded-lg hover:bg-green-light"
      >
        Edit
      </Link>
      <button
        onClick={togglePublish}
        disabled={busy}
        className="text-xs font-semibold text-mid hover:text-black transition-colors px-2 py-1 rounded-lg hover:bg-gray-light disabled:opacity-40"
      >
        {isPublished ? 'Unpublish' : 'Publish'}
      </button>
      <button
        onClick={deletePost}
        disabled={busy}
        className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors px-2 py-1 rounded-lg hover:bg-red-50 disabled:opacity-40"
      >
        Delete
      </button>
      </div>
    </div>
  )
}
