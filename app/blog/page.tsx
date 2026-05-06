import type { Metadata } from 'next'
import Link from 'next/link'
import {
  IoArrowForwardOutline, IoTimeOutline, IoPersonOutline,
} from '@/app/components/Icons'
import Nav from '@/app/components/Nav'
import Footer from '@/app/components/Footer'

export const metadata: Metadata = {
  title: 'Blog — GoodyGoodie',
  description: 'News, stories, and insights from the GoodyGoodie community.',
}

// ─────────────────────────────────────────────────────────────────────────────
//  PLACEHOLDER POSTS
// ─────────────────────────────────────────────────────────────────────────────

const posts = [
  {
    slug: 'introducing-goodygoodie',
    category: 'Company',
    title: 'Introducing GoodyGoodie — Volunteer. Earn. Redeem.',
    excerpt: 'We built GoodyGoodie because we believe your time has value. Learn how we\'re closing the loop between volunteers, local businesses, and nonprofits in your community.',
    author: 'GoodyGoodie Team',
    date: 'May 2026',
    readTime: '4 min read',
    featured: true,
  },
  {
    slug: 'why-retailers-should-sponsor-volunteers',
    category: 'For Retailers',
    title: 'Why local retailers are sponsoring volunteer events — and seeing real ROI',
    excerpt: 'Sponsoring a volunteer event isn\'t charity. It\'s a closed-loop marketing channel that brings motivated, community-minded customers directly to your store.',
    author: 'GoodyGoodie Team',
    date: 'May 2026',
    readTime: '5 min read',
    featured: false,
  },
  {
    slug: 'nonprofit-volunteer-retention',
    category: 'For Nonprofits',
    title: 'The real reason volunteers don\'t come back — and how to fix it',
    excerpt: 'Volunteer churn is one of the biggest operational challenges nonprofits face. The research is clear: people are more likely to return when their contribution is meaningfully acknowledged.',
    author: 'GoodyGoodie Team',
    date: 'May 2026',
    readTime: '6 min read',
    featured: false,
  },
  {
    slug: 'how-gs-work',
    category: 'Product',
    title: 'What are #Gs? A plain-language explainer',
    excerpt: '#Gs are the reward points you earn for volunteering. Here\'s how they work, how they\'re valued, and what makes them different from typical loyalty points.',
    author: 'GoodyGoodie Team',
    date: 'May 2026',
    readTime: '3 min read',
    featured: false,
  },
  {
    slug: 'community-loop-economy',
    category: 'Community',
    title: 'The community loop economy: how doing good creates a self-reinforcing cycle',
    excerpt: 'When a local business invests in a volunteer event, something unexpected happens: the community starts to invest back. We explore the data and the dynamics.',
    author: 'GoodyGoodie Team',
    date: 'May 2026',
    readTime: '7 min read',
    featured: false,
  },
]

const categoryColors: Record<string, string> = {
  Company:        'bg-green-light text-teal',
  'For Retailers':'bg-blue-50 text-blue-700',
  'For Nonprofits':'bg-purple-50 text-purple-700',
  Product:        'bg-amber-50 text-amber-700',
  Community:      'bg-green-50 text-green-700',
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
          Stories from the loop
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

function FeaturedPost({ post }: { post: typeof posts[0] }) {
  return (
    <div className="bg-teal rounded-3xl p-10 md:p-12 flex flex-col gap-5 mb-8">
      <div className="flex items-center gap-3">
        <span className="bg-white/20 text-white rounded-full px-3 py-1 text-xs font-bold">{post.category}</span>
        <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">Featured</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug max-w-2xl">{post.title}</h2>
      <p className="text-white/80 leading-relaxed max-w-2xl">{post.excerpt}</p>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4 text-white/60 text-sm">
          <span className="flex items-center gap-1.5"><IoPersonOutline size={13} /> {post.author}</span>
          <span className="flex items-center gap-1.5"><IoTimeOutline size={13} /> {post.readTime}</span>
          <span>{post.date}</span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-bold bg-white text-teal rounded-full px-5 py-2.5 hover:opacity-90 transition-opacity"
        >
          Read post <IoArrowForwardOutline size={13} />
        </Link>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  POST CARD
// ─────────────────────────────────────────────────────────────────────────────

function PostCard({ post }: { post: typeof posts[0] }) {
  const colorClass = categoryColors[post.category] ?? 'bg-gray-light text-mid'
  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-light shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
      <span className={`self-start rounded-full px-3 py-1 text-xs font-bold ${colorClass}`}>{post.category}</span>
      <h3 className="text-lg font-extrabold text-black leading-snug">{post.title}</h3>
      <p className="text-mid text-sm leading-relaxed flex-1">{post.excerpt}</p>
      <div className="flex items-center justify-between flex-wrap gap-3 pt-2 border-t border-gray-light">
        <div className="flex items-center gap-3 text-mid/70 text-xs">
          <span className="flex items-center gap-1"><IoTimeOutline size={12} /> {post.readTime}</span>
          <span>{post.date}</span>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-teal hover:text-teal transition-colors"
        >
          Read <IoArrowForwardOutline size={12} />
        </Link>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  POSTS GRID
// ─────────────────────────────────────────────────────────────────────────────

function PostsGrid() {
  const featured = posts.find(p => p.featured)
  const rest = posts.filter(p => !p.featured)

  return (
    <section className="py-12 pb-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {featured && <FeaturedPost post={featured} />}
        <div className="grid md:grid-cols-2 gap-6">
          {rest.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        <div className="text-center mt-16">
          <p className="text-mid/70 text-sm">More posts coming soon. Follow us or check back for new stories from the community.</p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  ROOT
// ─────────────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero />
        <PostsGrid />
      </main>
      <Footer />
    </>
  )
}
