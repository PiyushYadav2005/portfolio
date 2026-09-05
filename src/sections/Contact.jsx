import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { portfolioData } from '../data/portfolioData'

gsap.registerPlugin(ScrollTrigger)

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateForm(data) {
  const errors = {}
  const name = data.name.trim()
  const email = data.email.trim()
  const message = data.message.trim()

  if (!name) errors.name = 'Please enter your name.'
  if (!email) errors.email = 'Please enter a valid email address.'
  else if (!EMAIL_REGEX.test(email)) errors.email = 'Please enter a valid email address.'
  if (!message) errors.message = 'Message should contain at least 10 characters.'
  else if (message.length < 10) errors.message = 'Message should contain at least 10 characters.'

  return errors
}

// ---------------------------------------------------------------------------
// Shared input focus/blur handlers (inline style approach to match existing code)
// ---------------------------------------------------------------------------
function onFocus(e) {
  e.target.style.borderColor = 'var(--color-accent)'
  e.target.style.boxShadow = '0 0 0 3px var(--color-accent-glow), 0 0 20px rgba(108,99,255,0.1)'
}
function onBlur(e) {
  e.target.style.borderColor = 'var(--color-border)'
  e.target.style.boxShadow = 'none'
}

// ---------------------------------------------------------------------------
// EmailCard sub-component
// ---------------------------------------------------------------------------
function EmailCard({ email, mailto }) {
  const [copied, setCopied] = useState(false)

  const handleClick = useCallback(() => {
    // Copy email to clipboard, then open mailto as fallback
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      }).catch(() => {
        window.location.href = mailto
      })
    } else {
      window.location.href = mailto
    }
  }, [email, mailto])

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Copy email address ${email} or open mail client`}
      title={`Click to copy: ${email}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '0.6rem',
        border: '1px solid var(--color-border)',
        textDecoration: 'none',
        color: 'var(--color-text)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        background: 'rgba(17, 17, 40, 0.3)',
        padding: '0.85rem 1.1rem',
        width: '100%',
        cursor: 'pointer',
        fontFamily: 'inherit',
        textAlign: 'left',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(108,99,255,0.4)'
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.background = 'rgba(17, 17, 40, 0.6)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(108,99,255,0.12)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.background = 'rgba(17, 17, 40, 0.3)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div>
        <span style={{ fontWeight: 500, fontSize: '0.9rem', display: 'block' }}>Email</span>
        <span style={{
          fontSize: '0.72rem',
          color: copied ? 'var(--color-success)' : 'var(--color-text-dim)',
          fontFamily: 'var(--font-mono)',
          transition: 'color 0.3s ease',
        }}>
          {copied ? '✓ Copied to clipboard' : email}
        </span>
      </div>
      <span style={{
        color: 'var(--color-accent)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.9rem',
        transition: 'transform 0.3s ease',
      }}>
        {copied ? '✓' : '↗'}
      </span>
    </button>
  )
}

// ---------------------------------------------------------------------------
// SocialLink sub-component
// ---------------------------------------------------------------------------
function SocialLink({ label, href }) {
  if (!href) return null
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${label} profile`}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '0.6rem',
        border: '1px solid var(--color-border)',
        textDecoration: 'none',
        color: 'var(--color-text)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        background: 'rgba(17, 17, 40, 0.3)',
        padding: '0.85rem 1.1rem',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(108,99,255,0.4)'
        e.currentTarget.style.transform = 'translateX(6px)'
        e.currentTarget.style.background = 'rgba(17, 17, 40, 0.6)'
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(108,99,255,0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)'
        e.currentTarget.style.transform = 'translateX(0)'
        e.currentTarget.style.background = 'rgba(17, 17, 40, 0.3)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{label}</span>
      <span style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>↗</span>
    </a>
  )
}

// ---------------------------------------------------------------------------
// SuccessState sub-component
// ---------------------------------------------------------------------------
function SuccessState({ onReset }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '2.5rem 1.5rem',
        textAlign: 'center',
        animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
      }}
    >
      {/* Animated checkmark */}
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(52,211,153,0.2), rgba(0,229,255,0.1))',
        border: '1px solid rgba(52,211,153,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        boxShadow: '0 0 30px rgba(52,211,153,0.2)',
        animation: 'pulse-success 2s ease-in-out infinite',
      }}>
        ✓
      </div>
      <h4 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.1rem',
        fontWeight: 600,
        color: 'var(--color-success)',
        margin: 0,
      }}>
        Message Transmitted ✓
      </h4>
      <p style={{
        fontSize: '0.85rem',
        color: 'var(--color-text-muted)',
        maxWidth: '280px',
        lineHeight: 1.6,
        margin: 0,
      }}>
        Thanks for reaching out. I'll get back to you soon.
      </p>
      <button
        type="button"
        onClick={onReset}
        style={{
          marginTop: '0.5rem',
          background: 'none',
          border: '1px solid rgba(52,211,153,0.3)',
          borderRadius: '999px',
          color: 'var(--color-success)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          padding: '0.45rem 1rem',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(52,211,153,0.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'none'
        }}
      >
        Send another
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Contact component
// ---------------------------------------------------------------------------

/**
 * Contact — Stop 8: Contact Station (Final Destination)
 * Production-ready contact form with Formspree, validation, and UX polish.
 */
export default function Contact() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const formRef = useRef(null)

  const { contact } = portfolioData
  const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT || ''

  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  // status: 'idle' | 'submitting' | 'success' | 'error'
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')

  // ---------------------------------------------------------------------------
  // GSAP scroll reveal — identical pattern to other sections
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Shake animation on error
  useEffect(() => {
    if (status === 'error' && formRef.current) {
      gsap.fromTo(formRef.current,
        { x: 0 },
        {
          x: [-8, 8, -6, 6, -4, 4, 0],
          duration: 0.5,
          ease: 'none',
        }
      )
    }
  }, [status])

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------
  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error as user types (once field has been touched)
    if (touched[name]) {
      const newErrors = validateForm({ ...formData, [name]: value })
      setErrors(prev => ({ ...prev, [name]: newErrors[name] || '' }))
    }
  }, [formData, touched])

  const handleBlurField = useCallback((e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const fieldErrors = validateForm(formData)
    setErrors(prev => ({ ...prev, [name]: fieldErrors[name] || '' }))
    // Reset input border handled inline
    onBlur(e)
  }, [formData])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    if (status === 'submitting') return

    // Mark all fields touched
    setTouched({ name: true, email: true, message: true })

    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      // Focus first error field
      const firstErrorField = Object.keys(validationErrors)[0]
      const el = e.target.elements[firstErrorField]
      if (el) el.focus()
      return
    }

    // Check endpoint is configured
    if (!FORMSPREE_ENDPOINT) {
      setStatus('error')
      setServerError(
        'Contact form is not yet configured. Please reach out directly at ' + contact.email
      )
      return
    }

    setStatus('submitting')
    setServerError('')

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        // Honeypot — will be empty for real users, bots fill it in
        _gotcha: '',
      }

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setErrors({})
        setTouched({})
      } else {
        const data = await res.json().catch(() => ({}))
        const msg = data?.errors?.[0]?.message || 'Transmission failed. Please try again.'
        throw new Error(msg)
      }
    } catch (err) {
      setStatus('error')
      setServerError(
        err.message && !err.message.includes('Failed to fetch')
          ? err.message
          : 'Transmission failed. Please try again or contact me directly by email.'
      )
    }
  }, [formData, status, FORMSPREE_ENDPOINT, contact.email])

  const handleReset = useCallback(() => {
    setStatus('idle')
    setServerError('')
    setErrors({})
    setTouched({})
  }, [])

  // ---------------------------------------------------------------------------
  // Derived state
  // ---------------------------------------------------------------------------
  const isSubmitting = status === 'submitting'
  const isSuccess = status === 'success'

  const inputStyle = {
    width: '100%',
    padding: '0.9rem 1.25rem',
    background: 'rgba(17, 17, 40, 0.6)',
    border: '1px solid var(--color-border)',
    borderRadius: '0.75rem',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  }

  const errorStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.7rem',
    color: '#f87171',
    marginTop: '0.35rem',
    letterSpacing: '0.03em',
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-label="Contact section"
      style={{
        height: '150vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: '15vh',
      }}
    >
      <div
        ref={contentRef}
        style={{
          maxWidth: '900px',
          width: '100%',
          padding: '0 2rem',
          position: 'sticky',
          top: '10vh',
        }}
      >
        {/* Location Label */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.5rem',
          textAlign: 'center',
          width: '100%',
          justifyContent: 'center',
        }}>
          <div className="glow-dot" style={{ background: '#6c63ff', boxShadow: '0 0 12px rgba(108,99,255,0.4)' }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#6c63ff',
          }}>
            📍 Stop 08 — Contact Station
          </span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '1rem',
          lineHeight: 1.1,
        }}>
          {contact.heading.split(' ').slice(0, -1).join(' ')}{' '}
          <span className="gradient-text">{contact.heading.split(' ').pop()}</span>
        </h2>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--color-text-muted)',
          textAlign: 'center',
          maxWidth: '500px',
          margin: '0 auto 3rem',
          lineHeight: 1.7,
        }}>
          {contact.subheading}
        </p>

        {/* Contact Grid */}
        <div
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* ---- Left: Connect Links ---- */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '1rem',
            }}>
              Connect
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Email card with copy interaction */}
              <EmailCard email={contact.email} mailto={contact.socials.email} />

              {/* GitHub */}
              <SocialLink label="GitHub" href={contact.socials.github} />

              {/* LinkedIn */}
              <SocialLink label="LinkedIn" href={contact.socials.linkedin} />
            </div>

            {/* Additional info */}
            <div style={{ marginTop: '2rem' }}>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.05em',
                color: 'var(--color-text-dim)',
                lineHeight: 1.8,
              }}>
                <span style={{ color: 'var(--color-accent)' }}>📍</span> {contact.location}<br />
                <span style={{ color: 'var(--color-accent)' }}>📞</span> {contact.phone}
              </p>
            </div>
          </div>

          {/* ---- Right: Contact Form ---- */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '1.25rem',
            }}>
              Send Message
            </h3>

            {isSuccess ? (
              <SuccessState onReset={handleReset} />
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                {/* Honeypot (hidden from real users; bots fill it in) */}
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                />

                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Name <span aria-hidden="true" style={{ color: '#f87171' }}>*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={onFocus}
                    onBlur={handleBlurField}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                    aria-required="true"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    disabled={isSubmitting}
                    style={{
                      ...inputStyle,
                      borderColor: errors.name ? '#f87171' : 'var(--color-border)',
                    }}
                  />
                  {errors.name && (
                    <p id="contact-name-error" role="alert" style={errorStyle}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Email <span aria-hidden="true" style={{ color: '#f87171' }}>*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={onFocus}
                    onBlur={handleBlurField}
                    placeholder="your@email.com"
                    autoComplete="email"
                    required
                    aria-required="true"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    disabled={isSubmitting}
                    style={{
                      ...inputStyle,
                      borderColor: errors.email ? '#f87171' : 'var(--color-border)',
                    }}
                  />
                  {errors.email && (
                    <p id="contact-email-error" role="alert" style={errorStyle}>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Message <span aria-hidden="true" style={{ color: '#f87171' }}>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={onFocus}
                    onBlur={handleBlurField}
                    rows={4}
                    placeholder="Tell me about your idea, project, or opportunity..."
                    autoComplete="off"
                    required
                    aria-required="true"
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'contact-message-error' : undefined}
                    disabled={isSubmitting}
                    style={{
                      ...inputStyle,
                      resize: 'vertical',
                      minHeight: '100px',
                      borderColor: errors.message ? '#f87171' : 'var(--color-border)',
                    }}
                  />
                  {errors.message && (
                    <p id="contact-message-error" role="alert" style={errorStyle}>
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Server / Network Error */}
                {status === 'error' && serverError && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    style={{
                      padding: '0.75rem 1rem',
                      background: 'rgba(248,113,113,0.08)',
                      border: '1px solid rgba(248,113,113,0.25)',
                      borderRadius: '0.6rem',
                    }}
                  >
                    <p style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      color: '#f87171',
                      lineHeight: 1.6,
                      margin: 0,
                    }}>
                      ⚠ {serverError}
                    </p>
                  </div>
                )}

                {/* Transmit Button */}
                <button
                  type="submit"
                  className="cta-button"
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                  aria-label={isSubmitting ? 'Transmitting your message, please wait' : 'Send message'}
                  style={{
                    justifyContent: 'center',
                    width: '100%',
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isSubmitting ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{
                        display: 'inline-block',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        border: '2px solid rgba(108,99,255,0.3)',
                        borderTop: '2px solid var(--color-accent)',
                        animation: 'spin 0.8s linear infinite',
                      }} />
                      Transmitting...
                    </span>
                  ) : (
                    'Transmit ✦'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          marginTop: '4rem',
          paddingTop: '2rem',
          borderTop: '1px solid var(--color-border)',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--color-text-dim)',
            letterSpacing: '0.1em',
          }}>
            © 2026 Piyush — Crafted across the cosmos
          </p>
        </footer>
      </div>

      {/* Responsive + keyframe animations */}
      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse-success {
          0%, 100% { box-shadow: 0 0 30px rgba(52,211,153,0.2); }
          50%       { box-shadow: 0 0 50px rgba(52,211,153,0.4); }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; }
        }

        /* Visible focus ring for keyboard navigation */
        #contact input:focus-visible,
        #contact textarea:focus-visible,
        #contact button:focus-visible {
          outline: 2px solid var(--color-accent);
          outline-offset: 2px;
        }
      `}</style>
    </section>
  )
}
