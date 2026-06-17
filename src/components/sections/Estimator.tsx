import { useState } from 'react'

export default function Estimator() {
  const [revenuActuel, setRevenuActuel] = useState(1500)
  const [nuits, setNuits] = useState(15)

  const potentiel = Math.round(revenuActuel * 1.38 + nuits * 52)

  return (
    <section
      id="estimateur"
      style={{
        background: '#F2EDE3',
        padding: '6rem 2rem',
      }}
    >
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#7A8696',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            Outil gratuit
          </span>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#1B2A4A',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            Estimez votre potentiel Airbnb
          </h2>
          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.95rem',
              fontWeight: 300,
              color: '#7A8696',
            }}
          >
            Déplacez les curseurs pour voir ce que L'HÔTE peut générer pour votre bien.
          </p>
        </div>

        {/* Slider 1 */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.75rem',
            }}
          >
            <label
              htmlFor="revenu"
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#7A8696',
              }}
            >
              Revenus mensuels actuels
            </label>
            <span
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '1.3rem',
                color: '#1B2A4A',
              }}
            >
              {revenuActuel.toLocaleString('fr-FR')} €
            </span>
          </div>
          <input
            id="revenu"
            type="range"
            min={0}
            max={4000}
            step={100}
            value={revenuActuel}
            onChange={(e) => setRevenuActuel(Number(e.target.value))}
          />
        </div>

        {/* Slider 2 */}
        <div style={{ marginBottom: '3rem' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.75rem',
            }}
          >
            <label
              htmlFor="nuits"
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#7A8696',
              }}
            >
              Nuits louées par mois
            </label>
            <span
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '1.3rem',
                color: '#1B2A4A',
              }}
            >
              {nuits} nuits
            </span>
          </div>
          <input
            id="nuits"
            type="range"
            min={0}
            max={30}
            step={1}
            value={nuits}
            onChange={(e) => setNuits(Number(e.target.value))}
          />
        </div>

        {/* Résultat */}
        <div
          style={{
            textAlign: 'center',
            padding: '2.5rem',
            border: '1px solid rgba(156, 124, 70, 0.25)',
            background: 'rgba(156, 124, 70, 0.04)',
          }}
        >
          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#7A8696',
              marginBottom: '0.75rem',
            }}
          >
            Votre potentiel estimé avec L'HÔTE
          </p>
          <div
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(3rem, 8vw, 5.5rem)',
              fontWeight: 300,
              color: '#9C7C46',
              lineHeight: 1,
              marginBottom: '0.5rem',
            }}
          >
            {potentiel.toLocaleString('fr-FR')} €
          </div>
          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.75rem',
              color: '#7A8696',
              fontStyle: 'italic',
              marginTop: '1rem',
            }}
          >
            Estimation indicative basée sur les performances moyennes du portefeuille L'HÔTE.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a
            href="#contact"
            style={{
              display: 'inline-block',
              padding: '0.85rem 2.5rem',
              background: '#9C7C46',
              color: '#F5F0E8',
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
          >
            Obtenir mon diagnostic gratuit →
          </a>
        </div>
      </div>
    </section>
  )
}
