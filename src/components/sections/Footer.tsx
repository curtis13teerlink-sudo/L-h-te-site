export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background: '#0E0E0C',
        borderTop: '1px solid rgba(201, 169, 110, 0.2)',
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
                color: '#F7F6F2',
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
                color: '#8B8678',
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
                color: '#8B8678',
                lineHeight: 1.7,
                maxWidth: '260px',
              }}
            >
              Conciergerie Airbnb haut de gamme à Paris. Gestion complète, revenus optimisés.
            </p>
          </div>

          {/* Adossé à */}
          <div>
            <div
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#8B8678',
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
                color: '#8B8678',
                lineHeight: 1.7,
              }}
            >
              Adossé à{' '}
              <span style={{ color: '#C9A96E' }}>Private T</span>
              , conciergerie de luxe à Paris.
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
                color: '#8B8678',
                marginBottom: '1rem',
              }}
            >
              Contact
            </div>
            <a
              href="mailto:contact@lhote-paris.fr"
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.88rem',
                fontWeight: 300,
                color: '#C9A96E',
                textDecoration: 'none',
                display: 'block',
                marginBottom: '0.5rem',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            >
              contact@lhote-paris.fr
            </a>
            <p
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.8rem',
                fontWeight: 300,
                color: '#8B8678',
                marginTop: '1rem',
                lineHeight: 1.6,
              }}
            >
              Vos données ne sont jamais transmises à des tiers.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(247, 246, 242, 0.06)',
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
              color: '#8B8678',
              fontWeight: 300,
            }}
          >
            © {year} L'HÔTE — Tous droits réservés
          </p>
          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.75rem',
              color: '#8B8678',
              fontWeight: 300,
            }}
          >
            Paris, France
          </p>
        </div>
      </div>
    </footer>
  )
}
