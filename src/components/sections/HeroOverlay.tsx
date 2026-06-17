import { useRef, useEffect } from 'react'
import { gsap } from '../../lib/gsap'

interface HeroOverlayProps {
  progressRef: React.MutableRefObject<number>
  reducedMotion: boolean
}

export default function HeroOverlay({ progressRef, reducedMotion }: HeroOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (reducedMotion) return
    if (!containerRef.current) return

    let lastOpacity = 1

    const update = () => {
      const p = progressRef.current
      let opacity: number
      if (p < 0.12) {
        opacity = 1
      } else if (p > 0.18) {
        opacity = 0
      } else {
        opacity = 1 - (p - 0.12) / 0.06
      }

      if (Math.abs(opacity - lastOpacity) > 0.005 && containerRef.current) {
        containerRef.current.style.opacity = String(opacity)
        containerRef.current.style.pointerEvents = opacity < 0.05 ? 'none' : 'auto'
        lastOpacity = opacity
      }

      rafRef.current = requestAnimationFrame(update)
    }

    rafRef.current = requestAnimationFrame(update)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [progressRef, reducedMotion])

  // Animation d'entrée
  useEffect(() => {
    if (!containerRef.current || reducedMotion) return
    const el = containerRef.current
    gsap.fromTo(
      el.querySelectorAll('[data-animate]'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.3 }
    )
  }, [reducedMotion])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 1.5rem',
        pointerEvents: 'none',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '900px' }}>
        <h1
          data-animate
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(2.5rem, 7vw, 6rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: '#F2EDE3',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            marginBottom: '1.5rem',
            whiteSpace: 'pre-line',
          }}
        >
          {'VOTRE APPARTEMENT\nMÉRITE MIEUX QUE\nDES NUITS VIDES.'}
        </h1>

        <p
          data-animate
          style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
            fontWeight: 300,
            color: '#7A8696',
            marginBottom: '2.5rem',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Conciergerie Airbnb haut de gamme à Paris. Gestion complète, revenus optimisés.
        </p>

        <div data-animate style={{ pointerEvents: 'auto' }}>
          <a
            href="#contact"
            style={{
              display: 'inline-block',
              padding: '0.85rem 2.5rem',
              border: '1px solid #9C7C46',
              color: '#9C7C46',
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.85rem',
              fontWeight: 400,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background 0.3s ease, color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#9C7C46'
              e.currentTarget.style.color = '#1B2A4A'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#9C7C46'
            }}
          >
            Estimer mon potentiel →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        data-animate
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'Jost, sans-serif',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#7A8696',
          }}
        >
          Défiler
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, #9C7C46, transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
          50% { opacity: 1; transform: scaleY(1); }
        }
      `}</style>
    </div>
  )
}
