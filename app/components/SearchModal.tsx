'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { IoSearchOutline, IoCloseOutline, IoArrowForwardOutline } from '@/app/components/Icons'
import { searchIndex, SEARCH_INDEX, type SearchItem } from '@/app/lib/searchIndex'

// ── Category badge colours ────────────────────────────────────────────────────

const CATEGORY_STYLE: Record<string, string> = {
  'Pages':          'bg-gray-100 text-gray-500',
  'For Retailers':  'bg-teal/10 text-teal',
  'For Nonprofits': 'bg-green-light text-teal',
  'Blog':           'bg-lime/30 text-ink',
  'Account':        'bg-blue-50 text-blue-600',
  'Legal':          'bg-gray-100 text-gray-500',
}

// ── Quick-links shown before the user types ───────────────────────────────────

const QUICK_LINKS = SEARCH_INDEX.filter(i =>
  ['/', '/how-it-works', '/for-retailers', '/for-nonprofits', '/blog'].includes(i.href)
)

// ─────────────────────────────────────────────────────────────────────────────

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)

  const results = query.trim() ? searchIndex(query) : QUICK_LINKS

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIdx(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Reset active index when results change
  useEffect(() => { setActiveIdx(0) }, [query])

  // Close on Escape, navigate with arrow keys + Enter
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[activeIdx]) {
      e.preventDefault()
      router.push(results[activeIdx].href)
      onClose()
    }
  }, [results, activeIdx, router, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden"
        onKeyDown={handleKeyDown}
      >
        {/* Search input row */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100">
          <IoSearchOutline size={18} className="text-mid/60 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search GoodyGoodie…"
            className="flex-1 text-sm text-black placeholder:text-mid/50 bg-transparent focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-mid/50 hover:text-mid p-0.5 transition-colors"
              aria-label="Clear"
            >
              <IoCloseOutline size={16} />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-gray-200 px-1.5 py-0.5 text-[10px] font-medium text-mid/50">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {results.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-mid/60">
              No results for <span className="font-semibold text-black">"{query}"</span>
            </div>
          ) : (
            <>
              {!query && (
                <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-mid/40">
                  Quick links
                </p>
              )}
              {query && (
                <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-mid/40">
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </p>
              )}
              <ul className="pb-2">
                {results.map((item, idx) => (
                  <li key={item.href + item.title}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                        idx === activeIdx ? 'bg-gray-50' : 'hover:bg-gray-50'
                      }`}
                      onMouseEnter={() => setActiveIdx(idx)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-sm font-semibold text-black truncate">{item.title}</span>
                          <span className={`shrink-0 text-[10px] font-bold rounded-full px-2 py-0.5 ${CATEGORY_STYLE[item.category] ?? 'bg-gray-100 text-gray-500'}`}>
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-mid/70 line-clamp-1">{item.description}</p>
                      </div>
                      <IoArrowForwardOutline size={14} className="shrink-0 text-mid/30" />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Footer hint */}
        <div className="border-t border-gray-100 px-4 py-2.5 flex items-center gap-4 text-[10px] text-mid/40">
          <span><kbd className="font-medium">↑↓</kbd> navigate</span>
          <span><kbd className="font-medium">↵</kbd> open</span>
          <span><kbd className="font-medium">ESC</kbd> close</span>
        </div>
      </div>
    </div>
  )
}
