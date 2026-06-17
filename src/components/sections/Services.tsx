const SERVICES_LIST = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 2L16.5 10H25L18.5 15L21 23L14 18L7 23L9.5 15L3 10H11.5L14 2Z" stroke="#9C7C46" strokeWidth="1.2" fill="none" />
      </svg>
    ),
    title: 'Valorisation & décoration',
    text: 'Audit de votre appartement, conseil d\'aménagement, sourcing de décor élégant, préparation au shooting. On révèle le potentiel que vos locataires ne verront jamais autrement.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="3" y="7" width="22" height="17" rx="1" stroke="#9C7C46" strokeWidth="1.2" fill="none" />
        <circle cx="14" cy="15.5" r="4" stroke="#9C7C46" strokeWidth="1.2" fill="none" />
        <path d="M10 7V5H18V7" stroke="#9C7C46" strokeWidth="1.2" />
      </svg>
    ),
    title: 'Photographie professionnelle',
    text: 'Shooting en lumière naturelle, retouche soignée, photos optimisées pour tous les écrans Airbnb. Vos images font la différence dès la première impression.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <polyline points="4,22 10,14 16,17 24,7" stroke="#9C7C46" strokeWidth="1.2" fill="none" />
        <polyline points="19,7 24,7 24,12" stroke="#9C7C46" strokeWidth="1.2" fill="none" />
      </svg>
    ),
    title: 'Référencement & tarification',
    text: 'Titre SEO, description optimisée, mots-clés stratégiques. Tarification dynamique ajustée chaque jour selon la demande, les événements parisiens et la concurrence locale.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 3L25 10V18C25 22 20 25 14 25C8 25 3 22 3 18V10L14 3Z" stroke="#9C7C46" strokeWidth="1.2" fill="none" />
        <path d="M10 14L13 17L18 12" stroke="#9C7C46" strokeWidth="1.2" />
      </svg>
    ),
    title: 'Gestion des voyageurs',
    text: 'Accueil personnalisé ou self check-in sécurisé, communication avec les voyageurs 7j/7, gestion des avis, résolution des incidents.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="10" stroke="#9C7C46" strokeWidth="1.2" fill="none" />
        <path d="M10 14L13 17L18 11" stroke="#9C7C46" strokeWidth="1.2" />
      </svg>
    ),
    title: 'Ménage, linge & maintenance',
    text: 'Équipe de ménage professionnelle entre chaque séjour, linge hôtelier fourni et lavé, interventions maintenance rapides. Vous ne touchez plus rien.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="5" y="3" width="18" height="22" rx="1" stroke="#9C7C46" strokeWidth="1.2" fill="none" />
        <line x1="9" y1="9" x2="19" y2="9" stroke="#9C7C46" strokeWidth="1.2" />
        <line x1="9" y1="13" x2="19" y2="13" stroke="#9C7C46" strokeWidth="1.2" />
        <line x1="9" y1="17" x2="15" y2="17" stroke="#9C7C46" strokeWidth="1.2" />
      </svg>
    ),
    title: 'Reporting & transparence',
    text: 'Tableau de bord mensuel : revenus, taux d\'occupation, avis. Virement automatique. Vous gardez la main sur les données, pas sur la gestion.',
  },
]

export default function Services() {
  return (
    <section
      style={{
        background: '#E8E1D4',
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
            Nos prestations
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
            Ce que L'HÔTE prend en charge
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {SERVICES_LIST.map((svc, i) => (
            <ServiceCard key={i} icon={svc.icon} title={svc.title} text={svc.text} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode
  title: string
  text: string
}) {
  return (
    <div
      style={{
        background: '#F5F0E8',
        padding: '2rem',
        borderRadius: '2px',
        transition: 'box-shadow 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(26,24,20,0.08)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{ marginBottom: '1.25rem' }}>{icon}</div>
      <h3
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: '1.3rem',
          fontWeight: 400,
          color: '#1B2A4A',
          marginBottom: '0.75rem',
          lineHeight: 1.2,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: 'Jost, sans-serif',
          fontSize: '0.88rem',
          fontWeight: 300,
          color: '#7A8696',
          lineHeight: 1.7,
        }}
      >
        {text}
      </p>
    </div>
  )
}
