import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Pour ajouter une photo : ajouter un objet dans ce tableau ──────
const PHOTOS = [
  {
    src: '/images/realisation-01.jpg',
    alt: "Salon haussmannien valorisé par L'HÔTE — Paris",
    caption: 'Salon · Paris 8e',
  },
  {
    src: '/images/realisation-02.jpg',
    alt: "Suite parentale valorisée par L'HÔTE — Paris",
    caption: 'Suite parentale · Paris 16e',
  },
]

function PhotoCard({ photo, index }: { photo: (typeof PHOTOS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.16, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ margin: 0 }}
    >
      {/* Conteneur image — overflow:hidden pour que le zoom au survol soit clippé */}
      <div
        style={{
          width: '100%',
          aspectRatio: '4 / 3',
          overflow: 'hidden',
          borderRadius: '3px',
          background: '#D8D0C3',
          position: 'relative',
        }}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          draggable={false}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            transition: 'transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.04)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        />
      </div>

      {/* Légende */}
      <figcaption
        style={{
          marginTop: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: '20px',
            height: '1px',
            background: '#9C7C46',
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.78rem',
            fontWeight: 300,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#7A8696',
          }}
        >
          {photo.caption}
        </span>
      </figcaption>
    </motion.figure>
  )
}

export default function BeforeAfter() {
  return (
    <section
      id="realisations"
      style={{ background: '#F2EDE3', padding: '6rem 2rem' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* En-tête */}
        <div style={{ marginBottom: '3.5rem' }}>
          <span
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.72rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#9C7C46',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            Nos réalisations
          </span>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#1B2A4A',
              lineHeight: 1.1,
              maxWidth: '580px',
              marginBottom: '1.25rem',
            }}
          >
            Des intérieurs qui font la différence
          </h2>
          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.92rem',
              fontWeight: 300,
              color: '#7A8696',
              lineHeight: 1.75,
              maxWidth: '480px',
            }}
          >
            Chaque appartement bénéficie d'un shooting professionnel et d'une
            mise en scène sur-mesure réalisée par notre équipe décoratrice.
          </p>
        </div>

        {/* Grille photos */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem',
          }}
        >
          {PHOTOS.map((photo, i) => (
            <PhotoCard key={photo.src} photo={photo} index={i} />
          ))}
        </div>

        {/* Pied de section */}
        <div
          style={{
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(156,124,70,0.18)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.85rem',
              fontWeight: 300,
              color: '#7A8696',
              fontStyle: 'italic',
            }}
          >
            Shooting inclus dans chaque mandat de gestion.
          </p>
          <a
            href="#contact"
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.78rem',
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#9C7C46',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(156,124,70,0.35)',
              paddingBottom: '2px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.6' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
          >
            Confier mon appartement →
          </a>
        </div>
      </div>
    </section>
  )
}
