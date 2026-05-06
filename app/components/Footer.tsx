import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-light">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-4" aria-label="GoodyGoodie home">
              <Image src="/icon.png" alt="" width={40} height={40} className="h-10 w-10" />
              <span className="font-heading font-medium text-lg tracking-tight text-black">GoodyGoodie</span>
            </Link>
            <p className="text-mid/70 text-sm leading-relaxed">
              A community loop that rewards volunteering with real value at local businesses.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="font-bold text-black mb-3">Product</p>
              <ul className="space-y-2.5 text-mid">
                <li><Link href="/how-it-works"   className="hover:text-black transition-colors">How it works</Link></li>
                <li><Link href="/for-retailers"  className="hover:text-black transition-colors">For Retailers</Link></li>
                <li><Link href="/for-nonprofits" className="hover:text-black transition-colors">For Nonprofits</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-black mb-3">Company</p>
              <ul className="space-y-2.5 text-mid">
                <li><Link href="/blog" className="hover:text-black transition-colors">Blog</Link></li>
                <li>
                  <a href="mailto:hello@goodygoodie.app" className="hover:text-black transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-black mb-3">Account</p>
              <ul className="space-y-2.5 text-mid">
                <li><Link href="/signin" className="hover:text-black transition-colors">Sign in</Link></li>
                <li><Link href="/home"   className="hover:text-black transition-colors">Get started</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-gray-light flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-mid/70">© {year} GoodyGoodie. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-mid/70">
            <Link href="/privacy" className="hover:text-mid transition-colors">Privacy Policy</Link>
            <Link href="/terms"   className="hover:text-mid transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
