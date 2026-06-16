import { useRef, useEffect } from 'react'

interface ServicePanelsProps {
  progressRef: React.MutableRefObject<number>
}

const SERVICES = [
  {
    id: 1,
    side: 'right' as const,
    range: [0.15, 0.30] as [number, number],
    label: 'Service 01',
    title: 'Valorisation\ndécorative',
    description:
      'Chaque appartement a un potentiel caché. Nous le révélons : réagencement, sélection de décor, styling photo — pour déclencher le coup de cœur dès la première image.',
  },
  {
    id: 2,
    side: 'left' as const,
    range: [0.30, 0.45] as [number, number],
    label: 'Service 02',
    title: 'Photographie\nprofessionnelle',
    description:
      'Des images qui racontent un appartement, pas seulement qui le montrent. Lumière naturelle, mise en scène, retouche calibrée pour les écrans Airbnb.',
  },
  {
    id: 3,
    side: 'right' as const,
    range: [0.45, 0.60] as [number, number],
    label: 'Service 03',
    title: 'Référencement\noptimisé',
    description:
      'Titre accrocheur, description SEO Airbnb, mots-clés stratégiques, tarification dynamique — votre annonce remonte, votre taux d\'occupation monte.',
  },
  {
    id: 4,
    side: 'left' as const,
    range: [0.60, 0.75] as [number, number],
    label: 'Service 04',
    title: 'Gestion 100 %\ndéléguée',
    description:
      'Accueil des voyageurs, coordination ménage, gestion du linge, maintenance, réponses 7j/7. Vous recevez un virement, pas des questions.',
  },
]

export default function ServicePanels({ progressRef }: ServicePanelsProps) {
  const panelRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null])
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const update = () => {
      const p = progressRef.current

      SERVICES.forEach((svc, i) => {
        const el = panelRefs.current[i]
        if (!el) return

        const [start, end] = svc.range
        const mid = (start + end) / 2
        const fadeWidth = 0.04

        let opacity: number
        if (p < start || p > end) {
          opacity = 0
        } else if (p < start + fadeWidth) {
          opacity = (p - start) / fadeWidth
        } else if (p > end - fadeWidth) {
          opacity = (end - p) / fadeWidth
        } else {
          opacity = 1
        }

        el.style.opacity = String(Math.max(0, Math.min(1, opacity)))
        el.style.pointerEvents = opacity < 0.05 ? 'none' : 'auto'

        // Subtle translate
        const translateX = svc.side === 'right'
          ? `${(1 - opacity) * 20}px`
          : `${(opacity - 1) * 20}px`
        el.style.transform = `translateX(${translateX})`
      })

      rafRef.current = requestAnimationFrame(update)
    }

    rafRef.current = requestAnimationFrame(update)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [progressRef])

  return (
    <>
      {SERVICES.map((svc, i) => (
        <div
          key={svc.id}
          ref={(el) => { panelRefs.current[i] = el }}
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            [svc.side === 'right' ? 'right' : 'left']: '4%',
            width: 'min(340px, 30vw)',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: 20,
            transition: 'none',
          }}
        >
          <div
            style={{
              padding: '2rem',
              background: 'rgba(14, 14, 12, 0.82)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(201, 169, 110, 0.2)',
            }}
          >
            <span
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#C9A96E',
                display: 'block',
                marginBottom: '1rem',
              }}
            >
              {svc.label}
            </span>
            <div
              style={{
                width: '30px',
                height: '1px',
                background: '#C9A96E',
                marginBottom: '1rem',
              }}
            />
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#F7F6F2',
                lineHeight: 1.1,
                marginBottom: '1.2rem',
                whiteSpace: 'pre-line',
              }}
            >
              {svc.title}
            </h2>
            <p
              style={{
                fontFamily: 'Jost, sans-serif',
                fontSize: '0.88rem',
                fontWeight: 300,
                color: '#8B8678',
                lineHeight: 1.7,
              }}
            >
              {svc.description}
            </p>
          </div>
        </div>
      ))}
    </>
  )
}
