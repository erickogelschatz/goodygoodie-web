import { NextResponse } from 'next/server'

const ADMIN_EMAIL = 'admin@goodygoodie.app'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { category, role, name, email, subject, message } = body

    if (!subject?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Subject and message are required.' }, { status: 400 })
    }

    // ── Build email body ────────────────────────────────────────────────────
    const emailBody = `
GoodyGoodie Feedback Submission
================================

Category:  ${category}
Role:      ${role}
Name:      ${name || '(not provided)'}
Email:     ${email || '(not provided)'}

Subject:   ${subject}

Message:
${message}

================================
Submitted via goodygoodie.app/feedback
    `.trim()

    // ── Send via Resend (or swap for any transactional email provider) ──────
    // Requires RESEND_API_KEY env var and the 'resend' npm package.
    // Until Resend is configured, emails are logged to the console in dev.

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      const fromName = name ? `${name} via GoodyGoodie` : 'GoodyGoodie Feedback'
      const fromEmail = email
        ? `${fromName} <feedback@goodygoodie.app>`
        : `GoodyGoodie Feedback <feedback@goodygoodie.app>`

      await resend.emails.send({
        from: fromEmail,
        to: [ADMIN_EMAIL],
        reply_to: email || undefined,
        subject: `[${category.toUpperCase()}] ${subject}`,
        text: emailBody,
      })
    } else {
      // Development fallback — log to console
      console.log('--- FEEDBACK SUBMISSION (no email provider configured) ---')
      console.log(emailBody)
      console.log('---')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Feedback submission error:', error)
    return NextResponse.json({ error: 'Failed to send feedback.' }, { status: 500 })
  }
}
