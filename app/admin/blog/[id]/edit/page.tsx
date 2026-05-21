import { notFound } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/server'
import { getPostBySlug, type BlogPost } from '@/app/lib/blog'
import PostEditor from '../../_components/PostEditor'

export const metadata = { title: 'Edit Post — Admin' }

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // Try to fetch by UUID id first
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    notFound()
  }

  const post = data as BlogPost

  return <PostEditor post={post} />
}
