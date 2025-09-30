'use client'

import React, { useState } from 'react'
import { Mail, Send, CheckCircle, User, MessageSquare, FileText } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('subject', formData.subject)
    formDataToSend.append('message', formData.message)

    try {
      const response = await fetch('https://formspree.io/f/xeorgdqa', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        setIsSuccess(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Formspree error:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-card border border-border rounded-xl p-8 shadow-soft hover:shadow-medium transition-all duration-300">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-semibold text-foreground mb-2">Message Sent!</h3>
          <p className="text-muted-foreground mb-4">
            Thank you for your message! We'll get back to you as soon as possible.
          </p>
          <button
            onClick={() => setIsSuccess(false)}
            className="btn btn-primary"
          >
            Send Another Message
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-xl p-8 shadow-soft hover:shadow-medium transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mr-4">
          <MessageSquare className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-display font-semibold text-foreground">
            Get in Touch
          </h3>
          <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="group">
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors duration-200 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field transition-all duration-300 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Your full name"
            />
          </div>

          <div className="group">
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors duration-200 flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field transition-all duration-300 focus:ring-primary-500 focus:border-primary-500"
              placeholder="your.email@company.com"
            />
          </div>
        </div>

        <div className="group">
          <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors duration-200 flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Subject *
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="input-field transition-all duration-300 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="partnership">Partnership Opportunity</option>
            <option value="technical">Technical Support</option>
            <option value="api">API Access Request</option>
            <option value="content">Content Licensing</option>
            <option value="feedback">Feedback & Suggestions</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="group">
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2 group-focus-within:text-primary transition-colors duration-200 flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="input-field transition-all duration-300 focus:ring-primary-500 focus:border-primary-500 resize-none"
            placeholder="Tell us how we can help you..."
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full md:w-auto px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </button>
        </div>

        <div className="text-center pt-4 border-t border-border">
          <p className="text-muted-foreground text-sm">
            By submitting this form, you agree to our{' '}
            <a href="/privacy" className="text-primary hover:text-primary/80 underline transition-colors">
              privacy policy
            </a>
            . We'll be in touch soon!
          </p>
        </div>
      </form>
    </div>
  )
}