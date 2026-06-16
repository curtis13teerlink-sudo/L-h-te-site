import { useState } from 'react'

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid rgba(247, 246, 242, 0.2)',
  color: '#0E0E0C',
  fontFamily: 'Jost, sans-serif',
  fontSize: '1rem',
  fontWeight: 300,
  padding: '0.75rem 0',
  outline: 'none',
  transition: 'border-color 0.3s ease',
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'Jost, sans-serif',
  fontSize: '0.72rem',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: '#8B8678',
  display: 'block',
  marginBottom: '0.3rem',
}

export default function Contact() {
  const [focused, setFocused] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
    })
      .then(() => setSubmitted(true))
      .catch(() => setSubmitted(true))
  }

  const getFocusStyle = (name: string): React.CSSProperties => ({
    ...inputStyle,
    borderBottomColor: focused === name ? '#8B8678' : 'rgba(14, 14, 12, 0.25)',
    color: '#0E0E0C',
  })

  return (
    <section
      id="contact"
      style={{
        background: '#F7F6F2',
        padding: '6rem 2rem',
      }}
    >
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#8B8678',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            Contact
          </span>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#0E0E0C',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            Obtenez votre diagnostic gratuit
          </h2>
          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.95rem',
              fontWeight: 300,
              color: '#8B8678',
              lineHeight: 1.7,
            }}
          >
            Un appel de 30 minutes. Sans engagement. Pour savoir combien vaut vraiment votre appartement.
          </p>
        </div>

        {submitted ? (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem',
              border: '1px solid rgba(201, 169, 110, 0.3)',
              background: 'rgba(201, 169, 110, 0.05)',
            }}
          >
            <div
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '1.5rem',
                color: '#0E0E0C',
                marginBottom: '0.75rem',
              }}
            >
              Message reçu
            </div>
            <p style={{ fontFamily: 'Jost, sans-serif', fontSize: '0.9rem', color: '#8B8678' }}>
              Nous vous recontactons sous 24h pour planifier votre diagnostic.
            </p>
          </div>
        ) : (
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="contact" />
            <input name="bot-field" type="hidden" />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 2rem' }}>
              <div style={{ marginBottom: '2rem' }}>
                <label htmlFor="prenom" style={labelStyle}>Prénom</label>
                <input
                  id="prenom"
                  name="prenom"
                  type="text"
                  required
                  placeholder="Jean"
                  style={getFocusStyle('prenom')}
                  onFocus={() => setFocused('prenom')}
                  onBlur={() => setFocused(null)}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label htmlFor="email" style={labelStyle}>Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jean@exemple.fr"
                  style={getFocusStyle('email')}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused(null)}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label htmlFor="telephone" style={labelStyle}>Téléphone</label>
                <input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  placeholder="+33 6 00 00 00 00"
                  style={getFocusStyle('telephone')}
                  onFocus={() => setFocused('telephone')}
                  onBlur={() => setFocused(null)}
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label htmlFor="quartier" style={labelStyle}>Quartier</label>
                <input
                  id="quartier"
                  name="quartier"
                  type="text"
                  placeholder="Marais, Montmartre..."
                  style={getFocusStyle('quartier')}
                  onFocus={() => setFocused('quartier')}
                  onBlur={() => setFocused(null)}
                />
              </div>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <label htmlFor="message" style={labelStyle}>Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Parlez-nous de votre bien..."
                style={{
                  ...getFocusStyle('message'),
                  resize: 'vertical',
                  display: 'block',
                }}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused(null)}
              />
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                style={{
                  display: 'inline-block',
                  padding: '1rem 3rem',
                  background: '#C9A96E',
                  color: '#0E0E0C',
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'opacity 0.3s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
              >
                Envoyer ma demande
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
