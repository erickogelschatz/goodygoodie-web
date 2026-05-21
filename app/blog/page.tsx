import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/app/lib/supabase/server'
import { getPublishedPosts, categoryStyle, type BlogPost } from '@/app/lib/blog'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'
import { IoArrowForwardOutline, IoTimeOutline, IoPersonOutline } from '@/app/components/Icons'

export const metadata: Metadata = {
  title: 'Blog — GoodyGoodie',
  description: 'News, stories, and insights from the GoodyGoodie community.',
}

// ─────────────────────────────────────────────────────────────────────────────
//  HERO
// ─────────────────────────────────────────────────────────────────────────────

function PageHero() {
  return (
    <section className="bg-white pt-20 pb-12 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-teal mb-3">Blog</p>
        <h1 className="text-5xl md:text-6xl font-extrabold text-black tracking-tight leading-none mb-5">
          Good stories for good people
        </h1>
        <p className="text-lg text-mid leading-relaxed">
          News, insights, and real stories from volunteers, retailers, and nonprofits building community with GoodyGoodie.
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  FEATURED POST
// ─────────────────────────────────────────────────────────────────────────────

function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="bg-teal rounded-3xl overflow-hidden mb-8">
        {post.featured_image_url && (
          <div className="relative w-full aspect-[3/1] overflow-hidden">
            <Image
              src={post.featured_image_url}
              alt={post.title}
              fill
              className="object-cover opacity-30 group-hover:opacity-40 transition-opacity"
              sizes="(max-width: 1280px) 100vw, 1152px"
            />
          </div>
        )}
        <div className="p-10 md:p-12 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="bg-white/20 text-white rounded-full px-3 py-1 text-xs font-bold">{post.category}</span>
            <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">Featured</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug max-w-2xl group-hover:opacity-90 transition-opacity">
            {post.title}
          </h2>
          <p className="text-white/80 leading-relaxed max-w-2xl">{post.excerpt}</p>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <span className="flex items-center gap-1.5"><IoPersonOutline size={13} /> {post.author}</span>
              <span className="flex items-center gap-1.5"><IoTimeOutline size={13} /> {post.read_time}</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-bold bg-white text-teal rounded-full px-5 py-2.5">
              Read post <IoArrowForwardOutline size={13} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  POST CARD
// ─────────────────────────────────────────────────────────────────────────────

function PostCard({ post }: { post: BlogPost }) {
  const colorClass = categoryStyle[post.category] ?? 'bg-gray-light text-mid'
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="bg-white rounded-3xl border border-gray-light shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow h-full overflow-hidden">
        {post.featured_image_url && (
          <div className="relative w-full aspect-[16/7] overflow-hidden bg-gray-light">
            <Image
              src={post.featured_image_url}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
        <div className="p-8 flex flex-col gap-4 flex-1">
          <span className={`self-start rounded-full px-3 py-1 text-xs font-bold ${colorClass}`}>
            {post.category}
          </span>
          <h3 className="text-lg font-extrabold text-black leading-snug group-hover:text-teal transition-colors">
            {post.title}
          </h3>
          <p className="text-mid text-sm leading-relaxed flex-1">{post.excerpt}</p>
          <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-gray-light">
            <div className="flex items-center gap-3 text-mid/70 text-xs">
              <span className="flex items-center gap-1"><IoTimeOutline size={12} /> {post.read_time}</span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-teal">
              Read <IoArrowForwardOutline size={12} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  ROOT
// ─────────────────────────────────────────────────────────────────────────────

export default async function BlogPage() {
  const supabase = await createClient()
  const posts = await getPublishedPosts(supabase)

  const featured = posts.find(p => p.featured)
  const rest = posts.filter(p => !p.featured)

  return (
    <>
      <Nav />
      <main>
        <PageHero />

        <section className="py-12 pb-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            {featured && <FeaturedPost post={featured} />}

            <div className="grid md:grid-cols-2 gap-6">
              {rest.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>

            {posts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-mid/70 text-sm">No posts yet. Check back soon.</p>
              </div>
            )}

            <div className="text-center mt-16">
              <p className="text-mid/70 text-sm">
                More posts coming soon. Follow us for new stories from the community.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
