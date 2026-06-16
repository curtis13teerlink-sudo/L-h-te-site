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
        background: '#F7F6F2',
        padding: '6rem 0',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
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
            Valorisation
          </span>
          <h2
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#0E0E0C',
              lineHeight: 1.1,
            }}
          >
            La transformation en images
          </h2>
        </div>

        {/* Comparison slider */}
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
            aspectRatio: '16/9',
            overflow: 'hidden',
            cursor: 'ew-resize',
            userSelect: 'none',
            border: '1px solid rgba(0,0,0,0.1)',
          }}
        >
          {/* AFTER image (base layer) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #c9a96e22 0%, #d4c8b0 50%, #e8e0d0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.2rem',
                  color: '#8B8678',
                  fontStyle: 'italic',
                }}
              >
                PHOTO APRÈS — à remplacer
              </p>
              <p style={{ fontFamily: 'Jost', fontSize: '0.75rem', color: '#8B8678', marginTop: '0.5rem' }}>
                Appartement valorisé par L'HÔTE
              </p>
            </div>
          </div>

          {/* BEFORE image (clip layer) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              clipPath: `inset(0 ${100 - position}% 0 0)`,
              background: 'linear-gradient(135deg, #2a2520 0%, #1a1510 50%, #0e0e0c 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.2rem',
                  color: '#8B8678',
                  fontStyle: 'italic',
                }}
              >
                PHOTO AVANT — à remplacer
              </p>
              <p style={{ fontFamily: 'Jost', fontSize: '0.75rem', color: '#8B8678', marginTop: '0.5rem' }}>
                Avant valorisation
              </p>
            </div>
          </div>

          {/* Handle */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: `${position}%`,
              transform: 'translateX(-50%)',
              width: '2px',
              background: '#C9A96E',
              zIndex: 10,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#C9A96E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6 10L2 7V13L6 10Z" fill="#0E0E0C" />
                <path d="M14 10L18 7V13L14 10Z" fill="#0E0E0C" />
                <line x1="10" y1="3" x2="10" y2="17" stroke="#0E0E0C" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* Labels */}
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '1rem',
              fontFamily: 'Jost, sans-serif',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#F7F6F2',
              background: 'rgba(14,14,12,0.7)',
              padding: '0.3rem 0.8rem',
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
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#0E0E0C',
              background: 'rgba(201,169,110,0.9)',
              padding: '0.3rem 0.8rem',
              zIndex: 5,
            }}
          >
            Après valorisation
          </div>
        </div>
      </div>
    </section>
  )
}
