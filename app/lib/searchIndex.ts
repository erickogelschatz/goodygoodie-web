// ─────────────────────────────────────────────────────────────────────────────
//  Static search index for the GoodyGoodie marketing site.
//  Add new pages/sections here as the site grows.
// ─────────────────────────────────────────────────────────────────────────────

export interface SearchItem {
  title: string
  description: string
  href: string
  category: 'Pages' | 'For Retailers' | 'For Nonprofits' | 'Blog' | 'Account' | 'Legal'
  keywords?: string[]
}

export const SEARCH_INDEX: SearchItem[] = [
  // ── Core pages ──────────────────────────────────────────────────────────────
  {
    title: 'Home',
    description: 'Learn how GoodyGoodie rewards volunteers with real value at local businesses.',
    href: '/',
    category: 'Pages',
    keywords: ['volunteer', 'rewards', 'points', '#gs', 'community', 'loop'],
  },
  {
    title: 'How it works',
    description: 'See how volunteers earn #Gs, how retailers sponsor events, and how nonprofits connect with both.',
    href: '/how-it-works',
    category: 'Pages',
    keywords: ['earn', 'redeem', 'points', 'hours', 'events', 'sponsorship', 'loop'],
  },
  {
    title: 'Blog',
    description: 'Good stories for good people — news, tips, and community highlights.',
    href: '/blog',
    category: 'Pages',
    keywords: ['news', 'stories', 'articles', 'updates'],
  },
  {
    title: 'Help & Support',
    description: 'Answers to common questions about GoodyGoodie for volunteers, retailers, and nonprofits.',
    href: '/help',
    category: 'Pages',
    keywords: ['faq', 'support', 'questions', 'contact', 'help'],
  },
  {
    title: 'Feedback',
    description: 'Share your thoughts and help us improve GoodyGoodie.',
    href: '/feedback',
    category: 'Pages',
    keywords: ['suggestion', 'improve', 'report', 'idea'],
  },

  // ── For Retailers ────────────────────────────────────────────────────────────
  {
    title: 'For Retailers',
    description: 'Sponsor volunteer events, build community loyalty, and drive foot traffic to your store.',
    href: '/for-retailers',
    category: 'For Retailers',
    keywords: ['sponsor', 'business', 'loyalty', 'foot traffic', 'offers', 'store', 'cashier', 'scanner'],
  },
  {
    title: 'Sponsorships',
    description: 'Choose which nonprofit events to sponsor and back the #Gs volunteers earn.',
    href: '/for-retailers',
    category: 'For Retailers',
    keywords: ['sponsor', 'fund', 'event', 'nonprofit', 'backing'],
  },
  {
    title: 'Offers for volunteers',
    description: 'Publish special offers for volunteers who redeem their #Gs at your store.',
    href: '/for-retailers',
    category: 'For Retailers',
    keywords: ['discount', 'deal', 'promo', 'offer', 'redeem'],
  },
  {
    title: 'Cashier scanner',
    description: 'Use the GoodyGoodie app to scan and verify volunteer redemption QR codes at the register.',
    href: '/for-retailers',
    category: 'For Retailers',
    keywords: ['qr', 'scan', 'register', 'pos', 'cashier', 'redemption'],
  },

  // ── For Nonprofits ────────────────────────────────────────────────────────────
  {
    title: 'For Nonprofits',
    description: 'Create and manage volunteer events, attract retail sponsors, and track volunteer hours.',
    href: '/for-nonprofits',
    category: 'For Nonprofits',
    keywords: ['nonprofit', 'events', 'volunteers', 'hours', 'sponsor', 'community', 'charity'],
  },
  {
    title: 'Create volunteer events',
    description: 'Post events and pitch them to local retailers for sponsorship.',
    href: '/for-nonprofits',
    category: 'For Nonprofits',
    keywords: ['event', 'create', 'post', 'pitch', 'retailer'],
  },
  {
    title: 'Verify volunteer attendance',
    description: 'Use the GoodyGoodie app to scan volunteers and verify their hours in real time.',
    href: '/for-nonprofits',
    category: 'For Nonprofits',
    keywords: ['verify', 'scan', 'attendance', 'check-in', 'hours', 'qr'],
  },
  {
    title: 'Find sponsors',
    description: 'Browse local retailers and send sponsorship pitch requests directly from the app.',
    href: '/for-nonprofits',
    category: 'For Nonprofits',
    keywords: ['sponsor', 'retailer', 'pitch', 'funding', 'partnership'],
  },

  // ── Blog posts (seed) ────────────────────────────────────────────────────────
  {
    title: 'Introducing GoodyGoodie — Volunteer. Earn. Redeem.',
    description: "We built GoodyGoodie because we believe your time has value. Learn how we're closing the loop between volunteers, businesses, and nonprofits.",
    href: '/blog/introducing-goodygoodie',
    category: 'Blog',
    keywords: ['launch', 'intro', 'mission', 'loop', 'volunteer', 'earn', 'redeem'],
  },
  {
    title: 'Why retailers are investing in volunteer sponsorships',
    description: 'Community investment is becoming a strategic advantage. Here\'s why forward-thinking retailers are sponsoring volunteer events.',
    href: '/blog/why-retailers-invest-in-volunteer-sponsorships',
    category: 'Blog',
    keywords: ['retailer', 'invest', 'sponsor', 'community', 'loyalty', 'roi'],
  },
  {
    title: 'How nonprofits can attract more volunteers (and keep them)',
    description: 'Retention is the real challenge in volunteering. These strategies help nonprofits build a reliable, motivated volunteer base.',
    href: '/blog/how-nonprofits-attract-volunteers',
    category: 'Blog',
    keywords: ['nonprofit', 'recruit', 'retain', 'volunteer', 'strategy'],
  },

  // ── Account ──────────────────────────────────────────────────────────────────
  {
    title: 'Sign in',
    description: 'Sign in to your GoodyGoodie account.',
    href: '/signin',
    category: 'Account',
    keywords: ['login', 'log in', 'sign in', 'account', 'password'],
  },
  {
    title: 'Sign up',
    description: 'Create your GoodyGoodie account as a volunteer, retailer, or nonprofit.',
    href: '/home',
    category: 'Account',
    keywords: ['register', 'create account', 'join', 'sign up', 'get started'],
  },

  // ── Legal ────────────────────────────────────────────────────────────────────
  {
    title: 'Privacy Policy',
    description: 'How GoodyGoodie collects, uses, and protects your data.',
    href: '/privacy',
    category: 'Legal',
    keywords: ['privacy', 'data', 'gdpr', 'personal information'],
  },
  {
    title: 'Terms of Service',
    description: 'The terms and conditions governing your use of GoodyGoodie.',
    href: '/terms',
    category: 'Legal',
    keywords: ['terms', 'conditions', 'legal', 'agreement'],
  },
]

// ─────────────────────────────────────────────────────────────────────────────
//  Simple search — scores items by how well they match the query
// ─────────────────────────────────────────────────────────────────────────────

export function searchIndex(query: string): SearchItem[] {
  const q = query.toLowerCase().trim()
  if (!q) return []

  const scored = SEARCH_INDEX.map(item => {
    const haystack = [
      item.title,
      item.description,
      ...(item.keywords ?? []),
    ].join(' ').toLowerCase()

    // Exact title match → highest score
    let score = 0
    if (item.title.toLowerCase().startsWith(q)) score += 10
    if (item.title.toLowerCase().includes(q))   score += 5
    if (haystack.includes(q))                   score += 2

    // Partial word matches
    const words = q.split(/\s+/)
    for (const word of words) {
      if (word.length >= 2 && haystack.includes(word)) score += 1
    }

    return { item, score }
  })

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(s => s.item)
}
