const POINTS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="5" width="20" height="20" rx="1" stroke="#9C7C46" strokeWidth="1.2" fill="none" />
        <line x1="4" y1="11" x2="24" y2="11" stroke="#9C7C46" strokeWidth="1.2" />
        <line x1="10" y1="5" x2="10" y2="2" stroke="#9C7C46" strokeWidth="1.2" />
        <line x1="18" y1="5" x2="18" y2="2" stroke="#9C7C46" strokeWidth="1.2" />
        <rect x="8" y="15" width="5" height="5" stroke="#9C7C46" strokeWidth="0.8" fill="none" />
      </svg>
    ),
    title: 'Règle des 90 nuits',
    text: 'À Paris, une résidence principale ne peut être louée plus de 90 nuits par an sur Airbnb. Nous assurons un suivi précis du compteur et respectons scrupuleusement cette limite.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="5" y="3" width="18" height="22" rx="1" stroke="#9C7C46" strokeWidth="1.2" fill="none" />
        <line x1="9" y1="9" x2="19" y2="9" stroke="#9C7C46" strokeWidth="1.2" />
        <line x1="9" y1="13" x2="19" y2="13" stroke="#9C7C46" strokeWidth="1.2" />
        <line x1="9" y1="17" x2="15" y2="17" stroke="#9C7C46" strokeWidth="1.2" />
        <path d="M16 18L19 21L23 16" stroke="#9C7C46" strokeWidth="1.2" />
      </svg>
    ),
    title: 'Numéro d\'enregistrement obligatoire',
    text: 'Depuis 2020, toute annonce Airbnb à Paris doit afficher un numéro d\'enregistrement en mairie. Nous vous accompagnons dans cette démarche et intégrons le numéro à l\'annonce.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="10" stroke="#9C7C46" strokeWidth="1.2" fill="none" />
        <text x="14" y="19" textAnchor="middle" fontFamily="Georgia, serif" fontSize="12" fill="#9C7C46">€</text>
      </svg>
    ),
    title: 'Déclaration de revenus',
    text: 'Les revenus locatifs sont imposables. Nous vous fournissons un récapitulatif annuel détaillé pour votre déclaration. Certains cas permettent le régime micro-BIC avantageux.',
  },
]

export default function Compliance() {
  return (
    <section
      style={{
        background: '#1A1814',
        padding: '6rem 2rem',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '4rem' }}>
          <span
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#9C7C46',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            Conformité légale · Paris
          </span>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#F5F1E8',
              lineHeight: 1.1,
              maxWidth: '680px',
            }}
          >
            La gestion Airbnb à Paris, c'est complexe. C'est notre métier.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem',
          }}
        >
          {POINTS.map((pt, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.05)',
                borderTop: '2px solid #9C7C46',
                padding: '2rem',
              }}
            >
              <div style={{ marginBottom: '1.25rem' }}>{pt.icon}</div>
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  color: '#F5F1E8',
                  marginBottom: '0.75rem',
                  lineHeight: 1.25,
                }}
              >
                {pt.title}
              </h3>
              <p
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.88rem',
                  fontWeight: 300,
                  color: '#8B8070',
                  lineHeight: 1.7,
                }}
              >
                {pt.text}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            textAlign: 'center',
            padding: '1.5rem',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 300,
              color: '#8B8070',
              letterSpacing: '0.04em',
            }}
          >
            L'HÔTE gère pour vous les obligations légales{' '}
            <span style={{ color: '#9C7C46', fontStyle: 'italic' }}>de A à Z.</span>
          </p>
        </div>
      </div>
    </section>
  )
}
