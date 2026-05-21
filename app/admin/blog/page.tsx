import Link from 'next/link'
import { createClient } from '@/app/lib/supabase/server'
import { getAllPostsAdmin, categoryStyle, SETUP_SQL, type BlogPost } from '@/app/lib/blog'
import AdminPostActions from './_components/AdminPostActions'

// ─────────────────────────────────────────────────────────────────────────────
//  Setup panel — shown if blog_posts table doesn't exist yet
// ─────────────────────────────────────────────────────────────────────────────

function SetupPanel() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="bg-white rounded-3xl border border-gray-light shadow-sm p-8 md:p-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center text-xl">⚙️</div>
          <div>
            <h2 className="text-lg font-bold text-black">Database setup required</h2>
            <p className="text-sm text-mid">The blog_posts table doesn&apos;t exist yet in your Supabase project.</p>
          </div>
        </div>
        <p className="text-sm text-mid leading-relaxed mb-6">
          Copy the SQL below and run it in your{' '}
          <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-teal font-semibold underline">
            Supabase SQL editor
          </a>
          . Once the table is created, come back here to start writing posts.
        </p>
        <pre className="bg-ink text-teal/90 rounded-2xl p-6 text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap font-mono select-all">
          {SETUP_SQL}
        </pre>
        <p className="text-xs text-mid/70 mt-4">
          After running the SQL, refresh this page. You can also optionally create a <code className="bg-gray-light px-1.5 py-0.5 rounded text-xs">blog-images</code> bucket in Supabase Storage for image uploads.
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  Post row
// ─────────────────────────────────────────────────────────────────────────────

function PostRow({ post }: { post: BlogPost }) {
  const color = categoryStyle[post.category] ?? 'bg-gray-light text-mid'
  const date = new Date(post.published_at).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })

  return (
    <tr className="border-b border-gray-light hover:bg-gray-light/40 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-black text-sm leading-snug">{post.title}</span>
          <span className="text-xs text-mid/70 font-mono">/blog/{post.slug}</span>
        </div>
      </td>
      <td className="px-4 py-4 hidden md:table-cell">
        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${color}`}>
          {post.category}
        </span>
      </td>
      <td className="px-4 py-4 hidden lg:table-cell">
        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          post.is_published ? 'bg-green-100 text-green-700' : 'bg-amber-50 text-amber-600'
        }`}>
          {post.is_published ? 'Published' : 'Draft'}
        </span>
        {post.featured && (
          <span className="ml-2 inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold bg-teal/10 text-teal">
            Featured
          </span>
        )}
      </td>
      <td className="px-4 py-4 hidden lg:table-cell text-xs text-mid/70">{date}</td>
      <td className="px-4 py-4 text-right">
        <AdminPostActions postId={post.id} slug={post.slug} isPublished={post.is_published} />
      </td>
    </tr>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  Page
// ─────────────────────────────────────────────────────────────────────────────

export default async function AdminBlogPage() {
  const supabase = await createClient()

  // Try to fetch posts; catch error to detect missing table
  let posts: BlogPost[] = []
  let tableExists = true

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    if (error?.code === '42P01') {
      tableExists = false
    } else {
      posts = data ?? []
    }
  } catch {
    tableExists = false
  }

  if (!tableExists) return <SetupPanel />

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-black">Blog Posts</h1>
          <p className="text-sm text-mid mt-1">{posts.length} post{posts.length !== 1 ? 's' : ''} total</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 text-sm font-bold bg-teal text-white rounded-full px-5 py-2.5 hover:opacity-90 transition-opacity"
        >
          + New Post
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-gray-light shadow-sm overflow-hidden">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-mid/70 text-sm mb-4">No posts yet.</p>
            <Link
              href="/admin/blog/new"
              className="inline-flex items-center gap-2 text-sm font-bold bg-teal text-white rounded-full px-5 py-2.5 hover:opacity-90 transition-opacity"
            >
              Write your first post
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-light bg-gray-light/50">
                <th className="px-6 py-3 text-left text-xs font-bold text-mid/70 uppercase tracking-widest">Title</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-mid/70 uppercase tracking-widest hidden md:table-cell">Category</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-mid/70 uppercase tracking-widest hidden lg:table-cell">Status</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-mid/70 uppercase tracking-widest hidden lg:table-cell">Date</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-mid/70 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <PostRow key={post.id} post={post} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
