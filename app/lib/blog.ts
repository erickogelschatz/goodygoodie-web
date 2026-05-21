// ─────────────────────────────────────────────────────────────────────────────
//  Blog types, seed content, and Supabase fetch helpers
// ─────────────────────────────────────────────────────────────────────────────

export type ContentBlock =
  | { type: 'paragraph'; content: string }
  | { type: 'heading'; level: 2 | 3; content: string }
  | { type: 'image'; url: string; alt?: string; caption?: string }
  | { type: 'youtube'; videoId: string; caption?: string }
  | { type: 'callout'; content: string }
  | { type: 'divider' }

export type BlogCategory = 'For Retailers' | 'For Nonprofits' | 'Community'

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: ContentBlock[]
  category: BlogCategory
  featured_image_url?: string
  author: string
  published_at: string
  is_published: boolean
  featured: boolean
  read_time: string
}

export const CATEGORIES: BlogCategory[] = ['For Retailers', 'For Nonprofits', 'Community']

export const categoryStyle: Record<BlogCategory, string> = {
  'For Retailers':  'bg-teal-light/60 text-ink',
  'For Nonprofits': 'bg-green-light text-teal',
  'Community':      'bg-teal/10 text-teal',
}

// ─────────────────────────────────────────────────────────────────────────────
//  Seed posts — shown when Supabase table is empty or not yet created
// ─────────────────────────────────────────────────────────────────────────────

export const SEED_POSTS: BlogPost[] = [
  {
    id: 'seed-1',
    slug: 'introducing-goodygoodie',
    category: 'Community',
    title: 'Introducing GoodyGoodie — Volunteer. Earn. Redeem.',
    excerpt: "We built GoodyGoodie because we believe your time has value. Learn how we're closing the loop between volunteers, local businesses, and nonprofits in your community.",
    author: 'GoodyGoodie Team',
    published_at: '2026-05-01',
    is_published: true,
    featured: true,
    read_time: '4 min read',
    content: [
      { type: 'paragraph', content: "We've been thinking about the volunteer experience for a long time. And the thing that keeps coming up is this: people want to give back to their community, but it rarely feels like the community gives back to them. You show up, you work hard, and you go home. That's it." },
      { type: 'heading', level: 2, content: 'The problem with volunteerism today' },
      { type: 'paragraph', content: "The numbers tell a challenging story. Volunteer participation rates have been declining for over a decade. And the reasons people give when they stop aren't shocking — they cite feeling undervalued, not having enough time, or simply not feeling connected to the outcomes of their work. Recognition matters. When effort isn't acknowledged, it stops." },
      { type: 'heading', level: 2, content: 'We built something different' },
      { type: 'paragraph', content: "GoodyGoodie is a community loop that connects three players who already exist in every city: volunteers who want to give their time, local retailers who want to invest in their community, and nonprofits that need consistent help. The difference is what happens in the middle. When a retailer sponsors a volunteer event, volunteers earn #Gs — points worth $1 each at that retailer — for every verified hour they contribute." },
      { type: 'paragraph', content: "It's a closed loop. The retailer gets foot traffic from volunteers who now have a reason to shop there. The nonprofit gets volunteers who feel genuinely rewarded for their time and come back. And the volunteer gets real, tangible value for something they were doing out of goodwill anyway. Nobody loses in this model." },
      { type: 'heading', level: 2, content: "What this isn't" },
      { type: 'paragraph', content: "GoodyGoodie isn't a charity platform. No money flows to nonprofits through us. We don't do micro-donations or round-ups or any of the other well-meaning mechanisms that add friction without delivering clear value. What we do is simpler: retailers put in sponsorship money, volunteers do verified work, and #Gs flow back to the people who earned them — redeemable at the business that made it all possible." },
      { type: 'callout', content: '1 #G = $1 at the sponsoring retailer. Earned in whole integers. Redeemable to the cent. Simple on purpose.' },
      { type: 'heading', level: 2, content: "What's next" },
      { type: 'paragraph', content: "We're starting in select markets and growing deliberately. We want to get the loop right before we get it big. If you're a volunteer, download the app. If you're a local retailer or nonprofit, reach out — we'd love to talk about what a partnership might look like for your community." },
    ],
  },
  {
    id: 'seed-2',
    slug: 'why-retailers-should-sponsor-volunteers',
    category: 'For Retailers',
    title: 'Why local retailers are sponsoring volunteer events — and seeing real ROI',
    excerpt: "Sponsoring a volunteer event isn't charity. It's a closed-loop marketing channel that brings motivated, community-minded customers directly to your store.",
    author: 'GoodyGoodie Team',
    published_at: '2026-05-03',
    is_published: true,
    featured: false,
    read_time: '5 min read',
    content: [
      { type: 'paragraph', content: "Community sponsorship has a reputation problem. When most retailers hear the phrase, they think: expensive logo placement on a banner nobody reads. Or a donation that buys goodwill but doesn't move the needle. We've spent a lot of time thinking about why local marketing feels like a black hole, and the answer usually comes down to the loop not closing." },
      { type: 'heading', level: 2, content: 'The closed-loop difference' },
      { type: 'paragraph', content: "#Gs earned at your sponsored event are redeemable only at your store. That sentence does a lot of work. It means every volunteer who participates has a direct financial reason to walk through your door. It means the community investment you made converts into trackable foot traffic. It means you're not donating — you're deploying capital into a channel with a measurable return." },
      { type: 'paragraph', content: "Traditional advertising borrows attention. GoodyGoodie sponsorship earns it. Volunteers who show up to a community event and receive genuine rewards for their time don't just remember the retailer who made it possible — they feel something about that retailer. Brand affinity built through participation is a different category from brand recognition built through repetition." },
      { type: 'heading', level: 2, content: 'How the math works' },
      { type: 'paragraph', content: "Here's a simplified picture. A retailer sponsors a 4-hour volunteer event with a $500 sponsorship. GoodyGoodie takes 20% as a platform fee ($100). The remaining $400 backs the #G rewards for volunteers. If 20 volunteers each complete 4 hours, each earns 4 #Gs ($4 in store credit). Each of those volunteers now has a reason to visit your store. Acquisition cost per potential customer: $25 — and these aren't cold leads, they're people who just had a positive emotional experience with your brand." },
      { type: 'callout', content: 'The sponsorship funds the rewards. Volunteers earn #Gs for their time. Every #G is only redeemable at the sponsoring retailer. Every dollar of volunteer reward is a dollar of foot traffic incentive.' },
      { type: 'heading', level: 2, content: 'What retailers are saying' },
      { type: 'paragraph', content: "The retailers we work with consistently report that the volunteer customers they see are not just first-time visitors. They come in, they tell the cashier about the event, they talk about the nonprofit they supported. That level of engagement doesn't come from a Facebook ad. It comes from genuine shared experience." },
      { type: 'heading', level: 2, content: 'Getting started' },
      { type: 'paragraph', content: "Getting on GoodyGoodie as a retailer is straightforward. You create a business account, set your sponsorship preferences, and choose which nonprofit events you want to support. When an event goes live, your brand is associated with it. Volunteers who attend earn your #Gs. And when they come in to redeem, you see exactly what your community investment delivered." },
    ],
  },
  {
    id: 'seed-3',
    slug: 'nonprofit-volunteer-retention',
    category: 'For Nonprofits',
    title: "The real reason volunteers don't come back — and how to fix it",
    excerpt: 'Volunteer churn is one of the biggest operational challenges nonprofits face. The research is clear: people are more likely to return when their contribution is meaningfully acknowledged.',
    author: 'GoodyGoodie Team',
    published_at: '2026-05-05',
    is_published: true,
    featured: false,
    read_time: '6 min read',
    content: [
      { type: 'paragraph', content: "Ask any nonprofit program manager about volunteer retention and you'll get a familiar response: a sigh, followed by the statistic they know by heart. Somewhere between 60% and 70% of first-time volunteers don't return for a second event. The nonprofit sector has studied this problem for decades. The interventions tried are well-intentioned — thank-you emails, volunteer appreciation nights, social media shoutouts. They help. But they don't solve the problem." },
      { type: 'heading', level: 2, content: 'What the research actually says' },
      { type: 'paragraph', content: "A consistent finding across volunteer behavior research is that perceived impact and felt recognition are the two strongest predictors of repeat participation. Not the cause. Not the mission statement. People need to feel like their time specifically mattered, and they need to feel like someone noticed." },
      { type: 'paragraph', content: "The gap is structural. Most nonprofits are resource-constrained. The capacity to give every volunteer meaningful, personalized recognition doesn't exist alongside everything else the organization is doing. Technology can close this gap — but only if it's designed for the actual workflow, not bolted onto it." },
      { type: 'heading', level: 2, content: "Why #Gs work when thank-you emails don't" },
      { type: 'paragraph', content: "When a volunteer verifies their attendance through GoodyGoodie, two things happen automatically: their hours are recorded, and their #G award is triggered. They get a notification. They see a number in their wallet. That number represents their time — converted into something they can spend at a real business they already know. The reward is tangible in a way that appreciation often isn't." },
      { type: 'callout', content: "Recognition that feels real to volunteers is recognition that converts into behavior. Showing up once becomes showing up again." },
      { type: 'heading', level: 2, content: 'The compounding effect' },
      { type: 'paragraph', content: "When volunteers earn #Gs, they're more likely to attend the same nonprofit's future events — especially events sponsored by the same retailer, where they can keep building a balance they'll want to spend. That's a retention flywheel. The same volunteer shows up multiple times. They bring friends. Your events fill up faster. Your relationship with your sponsor retailer strengthens." },
      { type: 'heading', level: 2, content: 'What nonprofits need to do' },
      { type: 'paragraph', content: "The operational ask is minimal. Create an account, list your organization with your cause tags, post events with the details volunteers need to show up, and verify attendance by scanning QR codes when volunteers arrive. GoodyGoodie handles the rest — the #G awards, the wallet updates, the notifications. You focus on the event. We handle the reward infrastructure." },
    ],
  },
  {
    id: 'seed-4',
    slug: 'how-gs-work',
    category: 'Community',
    title: 'What are #Gs? A plain-language explainer',
    excerpt: "#Gs are the reward points you earn for volunteering. Here's how they work, how they're valued, and what makes them different from typical loyalty points.",
    author: 'GoodyGoodie Team',
    published_at: '2026-05-06',
    is_published: true,
    featured: false,
    read_time: '3 min read',
    content: [
      { type: 'paragraph', content: "#Gs are the reward points you earn for volunteering through GoodyGoodie. The name is intentional — it's short for GoodyGoodie, but it's also a nod to the idea that doing good should come with something good in return. Here's everything you need to know about how they work." },
      { type: 'heading', level: 2, content: 'How you earn #Gs' },
      { type: 'paragraph', content: 'You earn #Gs by volunteering at events that are sponsored by a local retailer through GoodyGoodie. When you check in at an event via QR code, your attendance is recorded. When the nonprofit verifies your hours, your #Gs are automatically awarded. One verified volunteer hour = one whole #G. No partial hours, no complicated formulas.' },
      { type: 'heading', level: 2, content: 'What #Gs are worth' },
      { type: 'paragraph', content: "Each #G is worth exactly $1 at the retailer that sponsored the event where you earned it. This is a guaranteed floor rate — every #G is worth at least $1 in store credit, not subject to redemption percentages or blackout dates. Some retailers may offer bonus offers on top, but the base value is always $1 per #G." },
      { type: 'callout', content: '1 #G = $1 at the sponsoring retailer. Always.' },
      { type: 'heading', level: 2, content: 'The retailer-scoped rule' },
      { type: 'paragraph', content: "#Gs are tied to the retailer that funded them. #Gs you earn at a Coffee Co-sponsored event can only be redeemed at Coffee Co. They don't transfer to other retailers, they can't be converted to cash, and they can't be gifted. This is by design — it's what makes the loop work and what makes the sponsorship model sustainable." },
      { type: 'heading', level: 2, content: 'How to redeem' },
      { type: 'paragraph', content: "Open the GoodyGoodie app, go to your wallet, select the retailer balance you want to use, and tap 'Redeem.' A QR code appears. Show it to the cashier. They scan it. Your balance is applied as a discount on your purchase. You can spend as many or as few #Gs as you want, down to 0.01 #Gs." },
      { type: 'heading', level: 2, content: 'Do #Gs expire?' },
      { type: 'paragraph', content: '#Gs expire after 24 months of inactivity. If you earn or redeem at least one #G from a given retailer within a 24-month window, the clock resets for that retailer balance. Staying active is easy — just show up for events.' },
    ],
  },
  {
    id: 'seed-5',
    slug: 'community-loop-economy',
    category: 'Community',
    title: 'The community loop economy: how doing good creates a self-reinforcing cycle',
    excerpt: 'When a local business invests in a volunteer event, something unexpected happens: the community starts to invest back. We explore the data and the dynamics.',
    author: 'GoodyGoodie Team',
    published_at: '2026-05-07',
    is_published: true,
    featured: false,
    read_time: '7 min read',
    content: [
      { type: 'paragraph', content: "There's a concept in economics called a multiplier effect. When money is spent in a local economy, it tends to circulate — the barista spends their wage at the farmers market, the farmer spends it at the hardware store, and so on. The dollar doesn't just pass through; it compounds. We think volunteerism has a similar potential, one that the current infrastructure mostly fails to unlock." },
      { type: 'heading', level: 2, content: 'Why local community investment is different' },
      { type: 'paragraph', content: "National advertising creates brand recognition. Local community investment creates something harder to measure but more durable: trust. When a neighborhood business shows up for its community — not with a banner, but with genuine, sustained investment — it builds a kind of goodwill that doesn't fade when the next competitor runs a promotion. Research on community-oriented businesses consistently shows higher net promoter scores, lower customer churn, and more resilient revenue during downturns." },
      { type: 'heading', level: 2, content: 'The three-sided loop' },
      { type: 'paragraph', content: "GoodyGoodie's architecture is designed around what we call the community loop. Three players enter: a retailer with a marketing budget and community values, a nonprofit with meaningful work and a need for consistent volunteers, and volunteers with time and goodwill and a desire to feel their contribution matter. Each one gets something they need from the loop." },
      { type: 'callout', content: "Every dollar a retailer puts into GoodyGoodie creates a volunteer incentive, a nonprofit partner, and a future customer. That's three things most marketing channels can't do once." },
      { type: 'heading', level: 2, content: 'Where the compounding happens' },
      { type: 'paragraph', content: "The interesting thing about the loop is that it gets stronger with repetition. A volunteer who attends one event and earns #Gs is more likely to attend the next one. The nonprofit, now with a reliable pipeline of volunteers, can host more events. More events attract more retailer sponsors. More sponsors mean more events in more places. The whole ecosystem grows because each participant made a rational choice to participate — and was rewarded for it." },
      { type: 'heading', level: 2, content: "What we're building toward" },
      { type: 'paragraph', content: "The version of GoodyGoodie we're launching is the foundation. What we're working toward is a community loop economy where every city has dozens of sponsors, hundreds of nonprofits, and thousands of volunteers in a self-sustaining system that's good for business, good for causes, and genuinely good for the people who make it work. We're not there yet. But we know what the loop looks like when it runs. We've seen it. It's worth building." },
    ],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
//  Fetch helpers (accept any Supabase client)
// ─────────────────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getPublishedPosts(supabase: any): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
    if (error || !data?.length) return SEED_POSTS.filter(p => p.is_published)
    return data as BlogPost[]
  } catch {
    return SEED_POSTS.filter(p => p.is_published)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getPostBySlug(supabase: any, slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()
    if (error || !data) return SEED_POSTS.find(p => p.slug === slug) ?? null
    return data as BlogPost
  } catch {
    return SEED_POSTS.find(p => p.slug === slug) ?? null
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getAllPostsAdmin(supabase: any): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return []
  return data as BlogPost[]
}

// ─────────────────────────────────────────────────────────────────────────────
//  Setup SQL (displayed in admin if table doesn't exist)
// ─────────────────────────────────────────────────────────────────────────────

export const SETUP_SQL = `-- Run in your Supabase SQL editor → https://supabase.com/dashboard

CREATE TABLE IF NOT EXISTS blog_posts (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug               text UNIQUE NOT NULL,
  title              text NOT NULL,
  excerpt            text,
  content            jsonb NOT NULL DEFAULT '[]',
  category           text NOT NULL DEFAULT 'Community',
  featured_image_url text,
  author             text NOT NULL DEFAULT 'GoodyGoodie Team',
  published_at       timestamptz DEFAULT now(),
  is_published       boolean NOT NULL DEFAULT true,
  featured           boolean NOT NULL DEFAULT false,
  read_time          text,
  created_at         timestamptz DEFAULT now(),
  updated_at         timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published"
  ON blog_posts FOR SELECT USING (is_published = true);

CREATE POLICY "Admins full access"
  ON blog_posts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    )
  );

-- Storage bucket (run separately in Supabase dashboard or SQL editor):
-- INSERT INTO storage.buckets (id, name, public)
--   VALUES ('blog-images', 'blog-images', true)
-- ON CONFLICT DO NOTHING;`
