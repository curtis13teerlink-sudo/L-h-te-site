import { useState, useRef, useCallback } from 'react'

const IMG1 = 'https://i.postimg.cc/1g7Wk0YH/IMG-1401.png'
const IMG2 = 'https://i.postimg.cc/VSZ7x9HZ/IMG-1402.png'

export default function BeforeAfter() {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true
    updatePosition(e.clientX)
  }, [updatePosition])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return
    updatePosition(e.clientX)
  }, [updatePosition])

  const onMouseUp = useCallback(() => { isDragging.current = false }, [])

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true
    updatePosition(e.touches[0].clientX)
  }, [updatePosition])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return
    updatePosition(e.touches[0].clientX)
  }, [updatePosition])

  const onTouchEnd = useCallback(() => { isDragging.current = false }, [])

  return (
    <section
      id="realisations"
      style={{ background: '#F2EDE3', padding: '6rem 2rem' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* En-tête */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
            }}
          >
            Des intérieurs qui font la différence
          </h2>
        </div>

        {/* Slider comparatif */}
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div
            ref={containerRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/10',
              overflow: 'hidden',
              cursor: 'ew-resize',
              userSelect: 'none',
              border: '1px solid rgba(156,124,70,0.2)',
            }}
          >
            {/* Image 2 — couche de base, plein cadre */}
            <img
              src={IMG2}
              alt="Réalisation L'HÔTE — intérieur valorisé"
              draggable={false}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block',
                pointerEvents: 'none',
              }}
            />

            {/* Image 1 — couche clipée qui se révèle en glissant */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                clipPath: `inset(0 ${100 - position}% 0 0)`,
              }}
            >
              <img
                src={IMG1}
                alt="Réalisation L'HÔTE — intérieur valorisé"
                draggable={false}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Ligne de séparation */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${position}%`,
                transform: 'translateX(-50%)',
                width: '2px',
                background: '#9C7C46',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            />

            {/* Poignée */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: `${position}%`,
                transform: 'translate(-50%, -50%)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#fff',
                border: '2px solid #9C7C46',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
                zIndex: 11,
                pointerEvents: 'none',
              }}
            >
              <svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden="true">
                <polyline points="5,1 1,6 5,11" stroke="#9C7C46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <polyline points="15,1 19,6 15,11" stroke="#9C7C46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
          </div>

          {/* Légende */}
          <p
            style={{
              textAlign: 'center',
              marginTop: '1.25rem',
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.78rem',
              fontWeight: 300,
              color: '#7A8696',
              letterSpacing: '0.08em',
            }}
          >
            Glissez pour découvrir nos réalisations · Shooting professionnel inclus
          </p>
        </div>
      </div>
    </section>
  )
}
