import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const PHOTOS = [
  {
    src: 'https://i.postimg.cc/1g7Wk0YH/IMG-1401.png',
    alt: "Appartement L'HÔTE — Réalisation Paris",
    caption: 'Paris · Appartement Haussmannien',
    detail: 'Valorisation complète · Shooting professionnel',
  },
  {
    src: 'https://i.postimg.cc/VSZ7x9HZ/IMG-1402.png',
    alt: "Appartement L'HÔTE — Réalisation Paris",
    caption: 'Paris · Intérieur contemporain',
    detail: 'Mise en scène · Annonce optimisée',
  },
]

function PhotoCard({
  photo,
  index,
}: {
  photo: (typeof PHOTOS)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4/3',
          overflow: 'hidden',
          background: '#D4C9B5',
        }}
      >
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.6s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.04)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        />
        {/* Gold line top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: '#9C7C46',
          }}
        />
      </div>

      <div style={{ paddingTop: '1.25rem' }}>
        <p
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: '1.1rem',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#1B2A4A',
            marginBottom: '0.35rem',
          }}
        >
          {photo.caption}
        </p>
        <p
          style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.78rem',
            fontWeight: 300,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#7A8696',
          }}
        >
          {photo.detail}
        </p>
      </div>
    </motion.div>
  )
}

export default function BeforeAfter() {
  return (
    <section
      id="realisations"
      style={{
        background: '#F2EDE3',
        padding: '6rem 2rem',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3.5rem' }}>
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
              maxWidth: '600px',
            }}
          >
            Des intérieurs qui font la différence sur Airbnb
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {PHOTOS.map((photo, i) => (
            <PhotoCard key={i} photo={photo} index={i} />
          ))}
        </div>

        <div
          style={{
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(156,124,70,0.2)',
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
              fontSize: '0.88rem',
              fontWeight: 300,
              color: '#7A8696',
              fontStyle: 'italic',
            }}
          >
            Chaque appartement bénéficie d'un shooting sur-mesure inclus dans notre service.
          </p>
          <a
            href="#contact"
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.8rem',
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#9C7C46',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(156,124,70,0.4)',
              paddingBottom: '2px',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.6' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
          >
            Discuter de mon bien →
          </a>
        </div>
      </div>
    </section>
  )
}
