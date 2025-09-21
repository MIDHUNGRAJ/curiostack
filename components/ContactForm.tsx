'use client'

import { useState } from 'react'
import { Mail, Send, CheckCircle, AlertCircle, User, MessageSquare, FileText } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setMessage('')

    try {
      // Here you would typically send the data to your backend
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setMessage('Thank you                  We&apos;ll get back to you as soon as possible.')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
      setErrors({})
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const getInputClassName = (fieldName: string) => {
    const baseClasses = "input-field transition-all duration-300"
    const errorClasses = errors[fieldName] ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "focus:ring-primary-500 focus:border-primary-500"
    return `${baseClasses} ${errorClasses}`
  }

  return (
    <div className="bg-card border border-border rounded-xl p-8 shadow-soft hover:shadow-medium transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center mr-4">
          <MessageSquare className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-display font-semibold text-foreground">
            Contact Form
          </h3>
          <p className="text-sm text-muted-foreground">We&apos;ll respond within 24 hours</p>
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
              className={getInputClassName('name')}
              placeholder="Your full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.name}
              </p>
            )}
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
              className={getInputClassName('email')}
              placeholder="your.email@company.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </p>
            )}
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
            className={getInputClassName('subject')}
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
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.subject}
            </p>
          )}
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
            className={`${getInputClassName('message')} resize-none`}
            placeholder="Tell us how we can help you..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.message}
            </p>
          )}
          <div className="text-xs text-muted-foreground mt-1">
            {formData.message.length}/1000 characters
          </div>
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
        
        {message && (
          <div className={`text-center p-4 rounded-lg border transition-all duration-300 ${
            message.includes('Thank you') 
              ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800' 
              : 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800'
          }`}>
            <div className="flex items-center justify-center">
              {message.includes('Thank you') ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : (
                <AlertCircle className="w-5 h-5 mr-2" />
              )}
              {message}
            </div>
          </div>
        )}
        
        <div className="text-center pt-4 border-t border-border">
          <p className="text-muted-foreground text-sm">
            By submitting this form, you agree to our{' '}
            <a href="/privacy" className="text-primary hover:text-primary/80 underline transition-colors">
              privacy policy
            </a>
            We&apos;ll be in touch soon!ur information with third parties.
          </p>
        </div>
      </form>
    </div>
  )
} 