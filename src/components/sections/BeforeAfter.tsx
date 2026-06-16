import { useState, useRef, useCallback } from 'react'

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

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true
    updatePosition(e.clientX)
  }, [updatePosition])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return
    updatePosition(e.clientX)
  }, [updatePosition])

  const handleMouseUp = useCallback(() => {
    isDragging.current = false
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true
    updatePosition(e.touches[0].clientX)
  }, [updatePosition])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return
    updatePosition(e.touches[0].clientX)
  }, [updatePosition])

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false
  }, [])

  return (
    <section
      id="before-after"
      style={{
        background: '#F5F1E8',
        padding: '6rem 2rem',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#8B8070',
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            Valorisation
          </span>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#1A1814',
              lineHeight: 1.1,
              marginBottom: '0.75rem',
            }}
          >
            La différence L'HÔTE
          </h2>
          <p
            style={{
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.95rem',
              fontWeight: 300,
              color: '#8B8070',
            }}
          >
            Même appartement. Même surface. Des résultats incomparables.
          </p>
        </div>

        {/* Comparison slider — max 800px */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '3/2',
              overflow: 'hidden',
              cursor: 'ew-resize',
              userSelect: 'none',
              border: '1px solid rgba(156,124,70,0.2)',
            }}
          >
            {/* Image APRÈS (couche de base) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #E8DEC8 0%, #D4C4A0 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* REMPLACER: <img src="/images/apres-01.jpg" alt="Après valorisation" /> */}
              <div style={{ textAlign: 'center' }}>
                <p
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#9C7C46',
                    marginBottom: '0.5rem',
                  }}
                >
                  APRÈS
                </p>
                <p
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '1.4rem',
                    fontStyle: 'italic',
                    color: '#1A1814',
                    marginBottom: '0.4rem',
                  }}
                >
                  Appartement L'HÔTE
                </p>
                <p
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '0.78rem',
                    color: '#8B8070',
                  }}
                >
                  Après valorisation et shooting professionnel
                </p>
              </div>
            </div>

            {/* Image AVANT (couche clipée) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                clipPath: `inset(0 ${100 - position}% 0 0)`,
                background: 'linear-gradient(135deg, #C8BDA5 0%, #8B8070 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* REMPLACER: <img src="/images/avant-01.jpg" alt="Avant valorisation" /> */}
              <div style={{ textAlign: 'center' }}>
                <p
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#FAF8F2',
                    marginBottom: '0.5rem',
                    opacity: 0.7,
                  }}
                >
                  AVANT
                </p>
                <p
                  style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '1.4rem',
                    fontStyle: 'italic',
                    color: '#FAF8F2',
                    marginBottom: '0.4rem',
                  }}
                >
                  Votre appartement
                </p>
                <p
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '0.78rem',
                    color: '#EDE8DE',
                    opacity: 0.8,
                  }}
                >
                  Tel que vos locataires le voient aujourd'hui
                </p>
              </div>
            </div>

            {/* Handle vertical */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: `${position}%`,
                transform: 'translateX(-50%)',
                width: '1px',
                background: '#9C7C46',
                zIndex: 10,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#fff',
                  border: '2px solid #9C7C46',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                }}
              >
                <span style={{ fontSize: '0.85rem', color: '#9C7C46', letterSpacing: '-2px' }}>‹ ›</span>
              </div>
            </div>

            {/* Labels coins */}
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                left: '1rem',
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#FAF8F2',
                background: 'rgba(26,24,20,0.6)',
                padding: '0.25rem 0.6rem',
                zIndex: 5,
              }}
            >
              Avant
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#1A1814',
                background: 'rgba(156,124,70,0.85)',
                padding: '0.25rem 0.6rem',
                zIndex: 5,
              }}
            >
              Après
            </div>
          </div>

          <p
            style={{
              textAlign: 'center',
              marginTop: '1rem',
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.75rem',
              color: '#8B8070',
              letterSpacing: '0.08em',
            }}
          >
            Faites glisser pour comparer
          </p>
        </div>
      </div>
    </section>
  )
}
