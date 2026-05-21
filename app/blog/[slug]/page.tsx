import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { createClient } from '@/app/lib/supabase/server'
import {
  getPostBySlug, getPublishedPosts,
  categoryStyle, type ContentBlock, type BlogPost,
} from '@/app/lib/blog'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import { IoTimeOutline, IoPersonOutline, IoArrowForwardOutline } from '@/app/components/Icons'

// ─────────────────────────────────────────────────────────────────────────────
//  Static params + metadata
// ─────────────────────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  // Only called at build time; seed slugs always available
  const supabase = await createClient()
  const posts = await getPublishedPosts(supabase)
  return posts.map(p => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const post = await getPostBySlug(supabase, slug)
  if (!post) return { title: 'Post not found' }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featured_image_url ? [post.featured_image_url] : [],
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  Content block renderers
// ─────────────────────────────────────────────────────────────────────────────

function extractYouTubeId(input: string): string {
  // Accepts a videoId or full URL
  const match = input.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  )
  return match ? match[1] : input
}

function RenderBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'paragraph':
      return <p className="text-[1.05rem] text-mid leading-[1.85] mb-6">{block.content}</p>

    case 'heading':
      return block.level === 2
        ? <h2 className="font-heading text-2xl md:text-3xl font-semibold text-black mt-10 mb-4 tracking-tight">{block.content}</h2>
        : <h3 className="font-heading text-xl font-semibold text-black mt-8 mb-3 tracking-tight">{block.content}</h3>

    case 'callout':
      return (
        <blockquote className="my-8 border-l-4 border-teal bg-green-light rounded-r-2xl px-6 py-5">
          <p className="text-[1.05rem] font-medium text-black leading-relaxed">{block.content}</p>
        </blockquote>
      )

    case 'image':
      return (
        <figure className="my-8">
          <div className="relative w-full rounded-2xl overflow-hidden bg-gray-light aspect-[16/9]">
            <Image
              src={block.url}
              alt={block.alt ?? ''}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          {block.caption && (
            <figcaption className="text-center text-sm text-mid/70 mt-3">{block.caption}</figcaption>
          )}
        </figure>
      )

    case 'youtube': {
      const videoId = extractYouTubeId(block.videoId)
      return (
        <figure className="my-8">
          <div className="relative w-full rounded-2xl overflow-hidden aspect-video bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title={block.caption ?? 'Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          {block.caption && (
            <figcaption className="text-center text-sm text-mid/70 mt-3">{block.caption}</figcaption>
          )}
        </figure>
      )
    }

    case 'divider':
      return <hr className="my-10 border-gray-light" />

    default:
      return null
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  Related posts sidebar
// ─────────────────────────────────────────────────────────────────────────────

function RelatedPosts({ current, all }: { current: BlogPost; all: BlogPost[] }) {
  const related = all
    .filter(p => p.slug !== current.slug && p.category === current.category)
    .slice(0, 2)
  const others = all
    .filter(p => p.slug !== current.slug && !related.includes(p))
    .slice(0, 2 - related.length)
  const posts = [...related, ...others].slice(0, 2)
  if (!posts.length) return null

  return (
    <div className="mt-12 pt-10 border-t border-gray-light">
      <p className="text-xs font-bold uppercase tracking-widest text-mid/70 mb-6">More from the blog</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {posts.map(p => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group bg-gray-light hover:bg-green-light rounded-2xl p-5 flex flex-col gap-2 transition-colors"
          >
            <span className={`self-start rounded-full px-2.5 py-0.5 text-xs font-bold ${categoryStyle[p.category]}`}>
              {p.category}
            </span>
            <h4 className="text-sm font-bold text-black leading-snug group-hover:text-teal transition-colors line-clamp-2">
              {p.title}
            </h4>
            <span className="text-xs text-mid/70 flex items-center gap-1 mt-auto">
              <IoTimeOutline size={11} /> {p.read_time}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  Page
// ─────────────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()
  const [post, allPosts] = await Promise.all([
    getPostBySlug(supabase, slug),
    getPublishedPosts(supabase),
  ])

  if (!post) notFound()

  const formattedDate = new Date(post.published_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <>
      <Nav />
      <main>
        {/* Hero */}
        <section className="bg-white pt-14 pb-10 px-6 border-b border-gray-light">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-mid/70 mb-8">
              <Link href="/blog" className="hover:text-teal transition-colors">Blog</Link>
              <span>/</span>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${categoryStyle[post.category]}`}>
                {post.category}
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-black tracking-tight leading-tight mb-5">
              {post.title}
            </h1>

            <p className="text-lg text-mid leading-relaxed mb-8">{post.excerpt}</p>

            {/* Meta */}
            <div className="flex items-center gap-5 text-sm text-mid/70 pb-8">
              <span className="flex items-center gap-1.5"><IoPersonOutline size={14} /> {post.author}</span>
              <span className="flex items-center gap-1.5"><IoTimeOutline size={14} /> {post.read_time}</span>
              <span>{formattedDate}</span>
            </div>
          </div>
        </section>

        {/* Featured image */}
        {post.featured_image_url && (
          <div className="bg-gray-light">
            <div className="max-w-5xl mx-auto px-6 py-8">
              <div className="relative w-full rounded-3xl overflow-hidden aspect-[2/1]">
                <Image
                  src={post.featured_image_url}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1024px"
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {/* Body */}
        <section className="py-14 px-6 bg-white">
          <div className="max-w-3xl mx-auto">
            {/* Content blocks */}
            <article>
              {post.content.map((block, i) => (
                <RenderBlock key={i} block={block} />
              ))}
            </article>

            {/* Related */}
            <RelatedPosts current={post} all={allPosts} />

            {/* Back link */}
            <div className="mt-12 pt-8 border-t border-gray-light">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-teal hover:text-teal/80 transition-colors"
              >
                ← Back to all posts
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-6 bg-ink">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-semibold text-white mb-4">
              Ready to join the loop?
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Volunteer, earn #Gs, and redeem them at local businesses — or bring GoodyGoodie to your community.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/home"
                className="inline-flex items-center justify-center gap-2 text-sm font-bold bg-white text-black rounded-full px-6 py-3 hover:opacity-90 transition-opacity"
              >
                Get the app <IoArrowForwardOutline size={14} />
              </Link>
              <Link
                href="/for-retailers"
                className="inline-flex items-center justify-center gap-2 text-sm font-bold border border-white/20 text-teal rounded-full px-6 py-3 hover:border-white/40 transition-colors"
              >
                Become a sponsor
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
