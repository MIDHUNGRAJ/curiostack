import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Send email using Formspree (works with any domain)
    const response = await fetch('https://formspree.io/f/xeorgdqa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Formspree error:', response.status, errorText)
      throw new Error(`Formspree failed: ${response.status}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please email us directly at neurobyte.ml@gmail.com' },
      { status: 500 }
    )
  }
}
