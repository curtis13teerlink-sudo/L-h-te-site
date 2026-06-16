export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: '#1A1814',
        borderTop: '1px solid rgba(156, 124, 70, 0.2)',
        padding: '4rem 2rem 2.5rem',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '2rem',
                fontWeight: 300,
                color: '#9C7C46',
                letterSpacing: '0.1em',
                marginBottom: '0.25rem',
              }}
            >
              L'HÔTE
            </div>
            <div
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.65rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#8B8070',
                marginBottom: '1.25rem',
              }}
            >
              Conciergerie
            </div>
            <p
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 300,
                color: '#8B8070',
                lineHeight: 1.7,
                maxWidth: '260px',
              }}
            >
              Conciergerie Airbnb haut de gamme à Paris. Gestion complète, revenus optimisés.
            </p>
          </div>

          {/* Groupe */}
          <div>
            <div
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#8B8070',
                marginBottom: '1rem',
              }}
            >
              Groupe
            </div>
            <p
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.88rem',
                fontWeight: 300,
                color: '#8B8070',
                lineHeight: 1.7,
              }}
            >
              Adossé à{' '}
              <span style={{ color: '#9C7C46' }}>Private T</span>
              , conciergerie de luxe parisienne depuis 15 ans.
            </p>
          </div>

          {/* Contact */}
          <div>
            <div
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#8B8070',
                marginBottom: '1rem',
              }}
            >
              Contact
            </div>
            <a
              href="mailto:contact@lhote.fr"
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.88rem',
                fontWeight: 300,
                color: '#9C7C46',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '1rem',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            >
              contact@lhote.fr
            </a>
            <p
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 300,
                color: '#8B8070',
                lineHeight: 1.6,
              }}
            >
              Données personnelles traitées conformément au RGPD. Non transmises à des tiers.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(245, 241, 232, 0.06)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.75rem',
              color: '#8B8070',
              fontWeight: 300,
            }}
          >
            © {year} L'HÔTE · Paris · Tous droits réservés
          </p>
          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.75rem',
              color: '#8B8070',
              fontWeight: 300,
            }}
          >
            L'HÔTE · Paris · France
          </p>
        </div>
      </div>
    </footer>
  )
}
