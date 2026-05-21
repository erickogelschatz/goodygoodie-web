import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/app/lib/supabase/server'

// ─────────────────────────────────────────────────────────────────────────────
//  Helper — verify admin session
// ─────────────────────────────────────────────────────────────────────────────

async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { supabase, user: null, error: 'Unauthorized' }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!profile || profile.role !== 'admin') {
    return { supabase, user: null, error: 'Forbidden' }
  }

  return { supabase, user, error: null }
}

// ─────────────────────────────────────────────────────────────────────────────
//  GET /api/blog — fetch all posts (admin only)
// ─────────────────────────────────────────────────────────────────────────────

export async function GET() {
  const { supabase, error } = await requireAdmin()
  if (error) return NextResponse.json({ error }, { status: error === 'Unauthorized' ? 401 : 403 })

  const { data, error: dbError } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })
  return NextResponse.json(data)
}

// ─────────────────────────────────────────────────────────────────────────────
//  POST /api/blog — create new post (admin only)
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const { supabase, error } = await requireAdmin()
  if (error) return NextResponse.json({ error }, { status: error === 'Unauthorized' ? 401 : 403 })

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Validate required fields
  if (!body.title || !body.slug) {
    return NextResponse.json({ error: 'title and slug are required' }, { status: 400 })
  }

  const now = new Date().toISOString()
  const insert = {
    title: body.title,
    slug: body.slug,
    excerpt: body.excerpt ?? '',
    category: body.category ?? 'Community',
    author: body.author ?? 'GoodyGoodie Team',
    read_time: body.read_time ?? '',
    featured_image_url: body.featured_image_url ?? null,
    featured: body.featured ?? false,
    is_published: body.is_published ?? false,
    content: body.content ?? [],
    published_at: now,
    created_at: now,
    updated_at: now,
  }

  const { data, error: dbError } = await supabase
    .from('blog_posts')
    .insert(insert)
    .select()
    .single()

  if (dbError) {
    // Duplicate slug
    if (dbError.code === '23505') {
      return NextResponse.json({ error: 'A post with that slug already exists.' }, { status: 409 })
    }
    return NextResponse.json({ error: dbError.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
