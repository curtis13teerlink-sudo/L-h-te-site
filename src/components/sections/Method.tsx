import { motion } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    title: 'Diagnostic gratuit',
    description: 'Appel de 30 minutes pour comprendre votre bien, son potentiel et vos attentes. On vous dit exactement ce qu\'on peut faire — sans engagement.',
  },
  {
    num: '02',
    title: 'Valorisation',
    description: 'Shooting professionnel, conseil déco ciblé, création de l\'annonce optimisée SEO. On prépare votre appartement pour faire la différence sur Airbnb.',
  },
  {
    num: '03',
    title: 'Lancement',
    description: 'Mise en ligne, paramétrage de la tarification dynamique, premiers voyageurs accueillis. Vous recevez la notification de votre premier virement.',
  },
  {
    num: '04',
    title: 'Gestion continue',
    description: 'Nous gérons tout, 365 jours par an. Vous recevez un reporting mensuel et un virement. Votre rôle : encaisser.',
  },
]

export default function Method() {
  return (
    <section
      id="methode"
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
            Notre méthode
          </span>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#1B2A4A',
              lineHeight: 1.1,
            }}
          >
            De la clé à la performance
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '0',
            position: 'relative',
          }}
        >
          {/* Ligne de connexion */}
          <div
            style={{
              position: 'absolute',
              top: '4rem',
              left: '12.5%',
              right: '12.5%',
              height: '1px',
              background: 'linear-gradient(to right, transparent, #9C7C4444, #9C7C4444, transparent)',
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
              {/* Numéro en grand */}
              <div
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '5rem',
                  fontWeight: 300,
                  color: '#9C7C46',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                  opacity: 0.25,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {step.num}
              </div>

              <h3
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.4rem',
                  fontWeight: 400,
                  color: '#1B2A4A',
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
                  color: '#7A8696',
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
