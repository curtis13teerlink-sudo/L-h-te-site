const REASONS = [
  {
    num: '01',
    title: 'Un interlocuteur unique',
    text: 'De la déco à la gestion quotidienne, un seul contact gère tout. Vous n\'intervenez plus jamais.',
  },
  {
    num: '02',
    title: 'Résultats mesurables',
    text: 'Jusqu\'à +40% de revenus nets vs une gestion en solo. Chaque décision est data-driven.',
  },
  {
    num: '03',
    title: 'L\'expertise du luxe',
    text: 'Adossés à Private T, nous appliquons les standards de l\'hôtellerie haut de gamme à l\'Airbnb.',
  },
  {
    num: '04',
    title: 'Conformité garantie',
    text: 'Paris impose des règles strictes (90 nuits/an, enregistrement). Nous gérons tout, vous dormez tranquille.',
  },
]

export default function WhyUs() {
  return (
    <section
      style={{
        background: '#F2EDE3',
        padding: '6rem 2rem',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
            Adossés à Private T · Conciergerie de luxe depuis 15 ans
          </span>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#1B2A4A',
              lineHeight: 1.1,
            }}
          >
            Pourquoi confier votre appartement à L'HÔTE ?
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {REASONS.map((r) => (
            <div
              key={r.num}
              style={{
                background: '#F5F0E8',
                borderLeft: '3px solid #9C7C46',
                padding: '2rem',
              }}
            >
              <div
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '3.5rem',
                  fontWeight: 300,
                  color: '#9C7C46',
                  lineHeight: 1,
                  marginBottom: '0.75rem',
                  opacity: 0.5,
                }}
              >
                {r.num}
              </div>
              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.35rem',
                  fontWeight: 400,
                  color: '#1B2A4A',
                  marginBottom: '0.75rem',
                  lineHeight: 1.2,
                }}
              >
                {r.title}
              </h3>
              <p
                style={{
                  fontFamily: 'Jost, sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 300,
                  color: '#7A8696',
                  lineHeight: 1.7,
                }}
              >
                {r.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
