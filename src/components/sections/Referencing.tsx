import { motion } from 'framer-motion'

const POINTS = [
  {
    num: '1',
    title: 'Titre et description optimisés',
    text: 'Chaque mot compte. Nous rédigeons des titres accrocheurs et des descriptions SEO calibrées pour l\'algorithme Airbnb et les préférences des voyageurs.',
  },
  {
    num: '2',
    title: 'Tarification dynamique intelligente',
    text: 'Nos outils ajustent vos prix en temps réel selon la demande, les événements locaux, la saisonnalité — pour maximiser le taux d\'occupation et le revenu par nuit.',
  },
  {
    num: '3',
    title: 'Taux de réponse et avis',
    text: 'Réponse aux voyageurs en moins de 30 minutes. Gestion proactive des avis pour maintenir un score élevé et accéder aux badges Superhost et Coup de cœur.',
  },
]

export default function Referencing() {
  return (
    <section
      id="referencement"
      style={{
        background: '#131210',
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
              color: '#8B8678',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            Visibilité
          </span>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#F7F6F2',
              lineHeight: 1.1,
              maxWidth: '600px',
            }}
          >
            Comment vos annonces remontent dans les résultats
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          {/* Points */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {POINTS.map((point, i) => (
              <motion.div
                key={point.num}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                style={{ display: 'flex', gap: '1.25rem' }}
              >
                <div
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    border: '1px solid #C9A96E44',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '0.1rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontSize: '1rem',
                      color: '#C9A96E',
                    }}
                  >
                    {point.num}
                  </span>
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: '"Cormorant Garamond", Georgia, serif',
                      fontSize: '1.2rem',
                      fontWeight: 400,
                      color: '#F7F6F2',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {point.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'Jost, sans-serif',
                      fontSize: '0.88rem',
                      fontWeight: 300,
                      color: '#8B8678',
                      lineHeight: 1.7,
                    }}
                  >
                    {point.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Badges */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
            }}
          >
            {/* Superhost badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="80" cy="80" r="72" stroke="#C9A96E" strokeWidth="1.5" fill="none" />
                <circle cx="80" cy="80" r="60" stroke="#C9A96E" strokeWidth="0.5" fill="none" opacity="0.4" />
                {/* Star */}
                <path
                  d="M80 45L86.7 67.3H110.5L91.9 80.5L98.6 102.8L80 89.6L61.4 102.8L68.1 80.5L49.5 67.3H73.3L80 45Z"
                  fill="#C9A96E"
                  opacity="0.9"
                />
                <text x="80" y="128" fontFamily="Jost, sans-serif" fontSize="11" fill="#C9A96E" textAnchor="middle" letterSpacing="3">SUPERHOST</text>
              </svg>
            </motion.div>

            {/* Coup de coeur badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <svg width="160" height="80" viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="158" height="78" stroke="#C9A96E" strokeWidth="1" fill="none" />
                <rect x="5" y="5" width="150" height="70" stroke="#C9A96E" strokeWidth="0.5" fill="none" opacity="0.3" />
                {/* Heart */}
                <path
                  d="M80 55C80 55 56 42 56 29C56 22.4 61.4 17 68 17C72 17 75.5 19 78 22C79 23 79.5 24 80 25C80.5 24 81 23 82 22C84.5 19 88 17 92 17C98.6 17 104 22.4 104 29C104 42 80 55 80 55Z"
                  fill="#C9A96E"
                  opacity="0.9"
                />
                <text x="80" y="72" fontFamily="Jost, sans-serif" fontSize="9" fill="#C9A96E" textAnchor="middle" letterSpacing="2">COUP DE CŒUR</text>
              </svg>
            </motion.div>

            <p
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.78rem',
                color: '#8B8678',
                textAlign: 'center',
                lineHeight: 1.6,
                marginTop: '0.5rem',
              }}
            >
              Objectif badges Airbnb dès les 3 premiers mois de gestion L'HÔTE.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
