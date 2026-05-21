'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { CATEGORIES, type ContentBlock, type BlogPost, type BlogCategory } from '@/app/lib/blog'
import { createClient } from '@/app/lib/supabase/client'

// ─────────────────────────────────────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────────────────────────────────────

type EditorBlock = ContentBlock & { id: string }

function newId() {
  return Math.random().toString(36).slice(2)
}

function toEditorBlocks(blocks: ContentBlock[]): EditorBlock[] {
  return blocks.map(b => ({ ...b, id: newId() } as EditorBlock))
}

function toContentBlocks(blocks: EditorBlock[]): ContentBlock[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return blocks.map(({ id, ...rest }) => rest as ContentBlock)
}

function extractYouTubeId(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  )
  return match ? match[1] : url
}

// ─────────────────────────────────────────────────────────────────────────────
//  Block editors
// ─────────────────────────────────────────────────────────────────────────────

function BlockEditor({
  block,
  onChange,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: {
  block: EditorBlock
  onChange: (b: EditorBlock) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
  isFirst: boolean
  isLast: boolean
}) {
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadError('')
    try {
      const ext = file.name.split('.').pop()
      const path = `blog/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error } = await supabase.storage.from('blog-images').upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })
      if (error) throw error
      const { data } = supabase.storage.from('blog-images').getPublicUrl(path)
      if (block.type === 'image') {
        onChange({ ...block, url: data.publicUrl })
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed'
      setUploadError(msg.includes('not found') || msg.includes('bucket')
        ? 'Storage bucket "blog-images" not set up yet. Use a URL instead, or create the bucket in Supabase Storage.'
        : msg)
    } finally {
      setUploading(false)
    }
  }

  const controls = (
    <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        type="button"
        onClick={onMoveUp}
        disabled={isFirst}
        className="w-6 h-6 rounded flex items-center justify-center text-mid/70 hover:text-black hover:bg-gray-light disabled:opacity-30 text-xs"
        title="Move up"
      >↑</button>
      <button
        type="button"
        onClick={onMoveDown}
        disabled={isLast}
        className="w-6 h-6 rounded flex items-center justify-center text-mid/70 hover:text-black hover:bg-gray-light disabled:opacity-30 text-xs"
        title="Move down"
      >↓</button>
      <button
        type="button"
        onClick={onDelete}
        className="w-6 h-6 rounded flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 text-xs"
        title="Delete block"
      >✕</button>
    </div>
  )

  if (block.type === 'paragraph') {
    return (
      <div className="group flex items-start gap-1">
        <div className="flex-1">
          <textarea
            value={block.content}
            onChange={e => onChange({ ...block, content: e.target.value })}
            rows={4}
            placeholder="Write a paragraph…"
            className="w-full text-sm text-black leading-relaxed border border-gray-light rounded-xl px-4 py-3 bg-white focus:outline-none focus:border-teal resize-y font-sans"
          />
        </div>
        {controls}
      </div>
    )
  }

  if (block.type === 'heading') {
    return (
      <div className="group flex items-center gap-1">
        <div className="flex-1 flex items-center gap-2">
          <select
            value={block.level}
            onChange={e => onChange({ ...block, level: Number(e.target.value) as 2 | 3 })}
            className="text-xs border border-gray-light rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:border-teal shrink-0"
          >
            <option value={2}>H2</option>
            <option value={3}>H3</option>
          </select>
          <input
            value={block.content}
            onChange={e => onChange({ ...block, content: e.target.value })}
            placeholder={block.level === 2 ? 'Section heading…' : 'Sub-heading…'}
            className={`flex-1 border border-gray-light rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:border-teal ${block.level === 2 ? 'text-lg font-bold' : 'text-base font-semibold'} text-black font-heading`}
          />
        </div>
        {controls}
      </div>
    )
  }

  if (block.type === 'callout') {
    return (
      <div className="group flex items-start gap-1">
        <div className="flex-1 border-l-4 border-teal bg-green-light rounded-r-xl">
          <textarea
            value={block.content}
            onChange={e => onChange({ ...block, content: e.target.value })}
            rows={2}
            placeholder="Highlight a key point…"
            className="w-full text-sm font-medium text-black leading-relaxed px-4 py-3 bg-transparent focus:outline-none resize-y font-sans"
          />
        </div>
        {controls}
      </div>
    )
  }

  if (block.type === 'image') {
    return (
      <div className="group flex items-start gap-1">
        <div className="flex-1 border border-gray-light rounded-2xl overflow-hidden bg-gray-light/50">
          {block.url ? (
            <div className="relative aspect-video bg-gray-light">
              <Image
                src={block.url}
                alt={block.alt ?? ''}
                fill
                className="object-cover"
                sizes="600px"
                unoptimized
              />
              <button
                type="button"
                onClick={() => onChange({ ...block, url: '' })}
                className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-black/70"
              >✕</button>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              <p className="text-xs font-bold text-mid uppercase tracking-widest">Image block</p>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={block.url}
                  onChange={e => onChange({ ...block, url: e.target.value })}
                  placeholder="Paste image URL…"
                  className="flex-1 text-sm border border-gray-light rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-teal"
                />
                <span className="text-xs text-mid/70 self-center">or</span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="text-xs font-semibold text-white bg-teal rounded-lg px-3 py-2 hover:opacity-90 disabled:opacity-50 whitespace-nowrap"
                >
                  {uploading ? 'Uploading…' : 'Upload file'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
              {uploadError && <p className="text-xs text-red-500 leading-relaxed">{uploadError}</p>}
            </div>
          )}
          <div className="px-4 pb-3 pt-2 flex gap-2">
            <input
              type="text"
              value={block.alt ?? ''}
              onChange={e => onChange({ ...block, alt: e.target.value })}
              placeholder="Alt text (accessibility)"
              className="flex-1 text-xs border border-gray-light rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:border-teal"
            />
            <input
              type="text"
              value={block.caption ?? ''}
              onChange={e => onChange({ ...block, caption: e.target.value })}
              placeholder="Caption (optional)"
              className="flex-1 text-xs border border-gray-light rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:border-teal"
            />
          </div>
        </div>
        {controls}
      </div>
    )
  }

  if (block.type === 'youtube') {
    const previewId = block.videoId ? extractYouTubeId(block.videoId) : ''
    return (
      <div className="group flex items-start gap-1">
        <div className="flex-1 border border-gray-light rounded-2xl overflow-hidden bg-gray-light/50">
          {previewId && previewId.length === 11 ? (
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${previewId}`}
                title="YouTube preview"
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="aspect-video bg-ink/10 flex items-center justify-center">
              <span className="text-mid/50 text-sm">YouTube preview will appear here</span>
            </div>
          )}
          <div className="p-4 space-y-2">
            <input
              type="text"
              value={block.videoId}
              onChange={e => onChange({ ...block, videoId: e.target.value })}
              placeholder="Paste YouTube URL or video ID…"
              className="w-full text-sm border border-gray-light rounded-lg px-3 py-2 bg-white focus:outline-none focus:border-teal"
            />
            <input
              type="text"
              value={block.caption ?? ''}
              onChange={e => onChange({ ...block, caption: e.target.value })}
              placeholder="Caption (optional)"
              className="w-full text-xs border border-gray-light rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:border-teal"
            />
          </div>
        </div>
        {controls}
      </div>
    )
  }

  if (block.type === 'divider') {
    return (
      <div className="group flex items-center gap-1">
        <div className="flex-1 flex items-center gap-3">
          <hr className="flex-1 border-gray-light" />
          <span className="text-xs text-mid/50">divider</span>
          <hr className="flex-1 border-gray-light" />
        </div>
        {controls}
      </div>
    )
  }

  return null
}

// ─────────────────────────────────────────────────────────────────────────────
//  Add block menu
// ─────────────────────────────────────────────────────────────────────────────

function AddBlockMenu({ onAdd }: { onAdd: (type: ContentBlock['type']) => void }) {
  const types: { type: ContentBlock['type']; label: string; icon: string }[] = [
    { type: 'paragraph', label: 'Paragraph', icon: '¶' },
    { type: 'heading',   label: 'Heading',   icon: 'H' },
    { type: 'callout',   label: 'Callout',   icon: '❝' },
    { type: 'image',     label: 'Image',     icon: '🖼' },
    { type: 'youtube',   label: 'YouTube',   icon: '▶' },
    { type: 'divider',   label: 'Divider',   icon: '—' },
  ]
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {types.map(({ type, label, icon }) => (
        <button
          key={type}
          type="button"
          onClick={() => onAdd(type)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold border border-gray-light bg-white text-mid hover:text-black hover:border-teal hover:bg-green-light rounded-full px-3 py-1.5 transition-colors"
        >
          <span>{icon}</span> {label}
        </button>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  Featured image uploader
// ─────────────────────────────────────────────────────────────────────────────

function FeaturedImageField({
  value,
  onChange,
}: {
  value: string
  onChange: (url: string) => void
}) {
  const supabase = createClient()
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const ext = file.name.split('.').pop()
      const path = `featured/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error: uploadError } = await supabase.storage.from('blog-images').upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })
      if (uploadError) throw uploadError
      const { data } = supabase.storage.from('blog-images').getPublicUrl(path)
      onChange(data.publicUrl)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed'
      setError(msg.includes('not found') || msg.includes('bucket')
        ? 'Storage bucket "blog-images" not found. Paste a URL below or create the bucket in Supabase Storage.'
        : msg)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-black mb-2">Featured image</label>
      {value ? (
        <div className="relative rounded-2xl overflow-hidden aspect-[3/1] bg-gray-light mb-2">
          <Image src={value} alt="Featured" fill className="object-cover" sizes="600px" unoptimized />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm hover:bg-black/70"
          >✕</button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-light rounded-2xl p-6 text-center mb-2 bg-gray-light/30">
          <p className="text-sm text-mid/70 mb-3">Drag & drop, upload, or paste a URL</p>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="text-sm font-semibold text-white bg-teal rounded-full px-4 py-2 hover:opacity-90 disabled:opacity-50"
          >
            {uploading ? 'Uploading…' : 'Upload image'}
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </div>
      )}
      <input
        type="url"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Or paste image URL…"
        className="w-full text-sm border border-gray-light rounded-xl px-4 py-2.5 bg-white focus:outline-none focus:border-teal"
      />
      {error && <p className="text-xs text-red-500 mt-2 leading-relaxed">{error}</p>}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
//  Main PostEditor
// ─────────────────────────────────────────────────────────────────────────────

export default function PostEditor({ post }: { post?: Partial<BlogPost> }) {
  const router = useRouter()
  const isEditing = !!post?.id && !post.id.startsWith('seed-')

  const [title, setTitle]           = useState(post?.title ?? '')
  const [slug, setSlug]             = useState(post?.slug ?? '')
  const [excerpt, setExcerpt]       = useState(post?.excerpt ?? '')
  const [category, setCategory]     = useState<BlogCategory>(post?.category ?? 'Community')
  const [author, setAuthor]         = useState(post?.author ?? 'GoodyGoodie Team')
  const [readTime, setReadTime]     = useState(post?.read_time ?? '')
  const [featuredImg, setFeaturedImg] = useState(post?.featured_image_url ?? '')
  const [featured, setFeatured]     = useState(post?.featured ?? false)
  const [isPublished, setIsPublished] = useState(post?.is_published ?? true)
  const [blocks, setBlocks]         = useState<EditorBlock[]>(
    toEditorBlocks(post?.content ?? [{ type: 'paragraph', content: '' }])
  )
  const [saving, setSaving]         = useState(false)
  const [error, setError]           = useState('')

  // Auto-generate slug from title
  function handleTitleChange(val: string) {
    setTitle(val)
    if (!isEditing || !slug) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''))
    }
  }

  // Block operations
  function addBlock(type: ContentBlock['type']) {
    let newBlock: EditorBlock
    switch (type) {
      case 'paragraph': newBlock = { id: newId(), type: 'paragraph', content: '' }; break
      case 'heading':   newBlock = { id: newId(), type: 'heading', level: 2, content: '' }; break
      case 'callout':   newBlock = { id: newId(), type: 'callout', content: '' }; break
      case 'image':     newBlock = { id: newId(), type: 'image', url: '' }; break
      case 'youtube':   newBlock = { id: newId(), type: 'youtube', videoId: '' }; break
      case 'divider':   newBlock = { id: newId(), type: 'divider' }; break
    }
    setBlocks(prev => [...prev, newBlock])
  }

  function updateBlock(id: string, updated: EditorBlock) {
    setBlocks(prev => prev.map(b => b.id === id ? updated : b))
  }

  function deleteBlock(id: string) {
    setBlocks(prev => prev.filter(b => b.id !== id))
  }

  function moveBlock(id: string, dir: -1 | 1) {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id)
      if (idx < 0) return prev
      const next = idx + dir
      if (next < 0 || next >= prev.length) return prev
      const arr = [...prev]
      ;[arr[idx], arr[next]] = [arr[next], arr[idx]]
      return arr
    })
  }

  async function handleSave() {
    if (!title.trim()) { setError('Title is required.'); return }
    if (!slug.trim())  { setError('Slug is required.'); return }
    setSaving(true)
    setError('')

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      excerpt: excerpt.trim(),
      category,
      author: author.trim(),
      read_time: readTime.trim(),
      featured_image_url: featuredImg.trim() || null,
      featured,
      is_published: isPublished,
      content: toContentBlocks(blocks),
      updated_at: new Date().toISOString(),
    }

    try {
      const res = await fetch(
        isEditing ? `/api/blog/${post!.id}` : '/api/blog',
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )
      if (!res.ok) {
        const j = await res.json()
        throw new Error(j.error ?? 'Save failed')
      }
      router.push('/admin/blog')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-black">{isEditing ? 'Edit post' : 'New post'}</h1>
          <a href="/admin/blog" className="text-sm text-mid/70 hover:text-mid transition-colors">← Back to posts</a>
        </div>
        <div className="flex items-center gap-3">
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 text-sm font-bold bg-teal text-white rounded-full px-6 py-2.5 hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {saving ? 'Saving…' : isEditing ? 'Save changes' : 'Publish post'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Main content */}
        <div className="space-y-4">
          {/* Title */}
          <div className="bg-white rounded-3xl border border-gray-light shadow-sm p-6">
            <input
              type="text"
              value={title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="Post title…"
              className="w-full font-heading text-2xl font-semibold text-black border-none outline-none placeholder:text-mid/40 bg-transparent"
            />
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-light">
              <span className="text-xs text-mid/70 font-mono">/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                placeholder="post-slug"
                className="text-xs text-mid font-mono bg-gray-light rounded-lg px-2 py-1 border border-gray-light focus:outline-none focus:border-teal flex-1"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div className="bg-white rounded-3xl border border-gray-light shadow-sm p-6">
            <label className="block text-xs font-bold text-mid/70 uppercase tracking-widest mb-2">Excerpt</label>
            <textarea
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              rows={2}
              placeholder="Short description shown on the blog index…"
              className="w-full text-sm text-black leading-relaxed border-none outline-none resize-none bg-transparent placeholder:text-mid/40"
            />
          </div>

          {/* Content blocks */}
          <div className="bg-white rounded-3xl border border-gray-light shadow-sm p-6">
            <label className="block text-xs font-bold text-mid/70 uppercase tracking-widest mb-4">Content</label>
            <div className="space-y-3">
              {blocks.map((block, i) => (
                <BlockEditor
                  key={block.id}
                  block={block}
                  onChange={updated => updateBlock(block.id, updated)}
                  onDelete={() => deleteBlock(block.id)}
                  onMoveUp={() => moveBlock(block.id, -1)}
                  onMoveDown={() => moveBlock(block.id, 1)}
                  isFirst={i === 0}
                  isLast={i === blocks.length - 1}
                />
              ))}
            </div>
            <AddBlockMenu onAdd={addBlock} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Publish settings */}
          <div className="bg-white rounded-3xl border border-gray-light shadow-sm p-6 space-y-4">
            <p className="text-xs font-bold text-mid/70 uppercase tracking-widest">Settings</p>

            <div>
              <label className="block text-sm font-semibold text-black mb-1.5">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value as BlogCategory)}
                className="w-full text-sm border border-gray-light rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:border-teal"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-1.5">Author</label>
              <input
                type="text"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                className="w-full text-sm border border-gray-light rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:border-teal"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-black mb-1.5">Read time</label>
              <input
                type="text"
                value={readTime}
                onChange={e => setReadTime(e.target.value)}
                placeholder="e.g. 5 min read"
                className="w-full text-sm border border-gray-light rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:border-teal"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-light">
              <div>
                <p className="text-sm font-semibold text-black">Published</p>
                <p className="text-xs text-mid/70">Visible to the public</p>
              </div>
              <button
                type="button"
                onClick={() => setIsPublished(v => !v)}
                className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${isPublished ? 'bg-teal' : 'bg-gray-light'}`}
              >
                <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform mt-0.5 ${isPublished ? 'translate-x-5.5 ml-0.5' : 'translate-x-0.5'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between pb-1 border-t border-gray-light pt-2">
              <div>
                <p className="text-sm font-semibold text-black">Featured</p>
                <p className="text-xs text-mid/70">Shows at top of blog page</p>
              </div>
              <button
                type="button"
                onClick={() => setFeatured(v => !v)}
                className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${featured ? 'bg-teal' : 'bg-gray-light'}`}
              >
                <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform mt-0.5 ${featured ? 'translate-x-5.5 ml-0.5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>

          {/* Featured image */}
          <div className="bg-white rounded-3xl border border-gray-light shadow-sm p-6">
            <FeaturedImageField value={featuredImg} onChange={setFeaturedImg} />
          </div>

          {/* Save button (mobile) */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="w-full text-sm font-bold bg-teal text-white rounded-full py-3 hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {saving ? 'Saving…' : isEditing ? 'Save changes' : 'Publish post'}
            </button>
            {error && <p className="text-sm text-red-500 mt-2 text-center">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
