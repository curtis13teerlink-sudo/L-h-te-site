import { motion } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    title: 'Diagnostic',
    description: 'Appel de 30 min, audit complet de votre bien et de son potentiel Airbnb.',
  },
  {
    num: '02',
    title: 'Valorisation',
    description: 'Shooting professionnel, conseil déco, création de l\'annonce optimisée.',
  },
  {
    num: '03',
    title: 'Lancement',
    description: 'Mise en ligne, paramétrage des prix dynamiques, premiers voyageurs.',
  },
  {
    num: '04',
    title: 'Gestion continue',
    description: 'Nous gérons tout. Vous n\'intervenez plus jamais.',
  },
]

export default function Method() {
  return (
    <section
      id="methode"
      style={{
        background: '#0E0E0C',
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
              color: '#8B8678',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            Notre méthode
          </span>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#F7F6F2',
              lineHeight: 1.1,
            }}
          >
            De la clé à la performance
          </h2>
        </div>

        {/* Steps grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '0',
            position: 'relative',
          }}
        >
          {/* Connecting line */}
          <div
            style={{
              position: 'absolute',
              top: '2.5rem',
              left: '12.5%',
              right: '12.5%',
              height: '1px',
              background: 'linear-gradient(to right, transparent, #C9A96E44, #C9A96E44, transparent)',
            }}
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                padding: '0 2rem 2rem',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              {/* Number circle */}
              <div
                style={{
                  width: '5rem',
                  height: '5rem',
                  border: '1px solid #C9A96E44',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  background: '#0E0E0C',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <span
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '1.5rem',
                    fontWeight: 300,
                    color: '#C9A96E',
                  }}
                >
                  {step.num}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.4rem',
                  fontWeight: 400,
                  color: '#F7F6F2',
                  marginBottom: '0.75rem',
                }}
              >
                {step.title}
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
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
