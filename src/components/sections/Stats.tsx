import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { value: '+40%', label: 'de revenus générés' },
  { value: '15', label: 'biens gérés à Paris' },
  { value: '100%', label: 'gestion déléguée' },
]

function StatItem({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        textAlign: 'center',
        padding: '2rem',
        flex: 1,
      }}
    >
      <div
        style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: 'clamp(3rem, 6vw, 5rem)',
          fontWeight: 300,
          color: '#C9A96E',
          lineHeight: 1,
          marginBottom: '0.75rem',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: 'Jost, sans-serif',
          fontSize: '0.85rem',
          fontWeight: 300,
          color: '#8B8678',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </motion.div>
  )
}

export default function Stats() {
  return (
    <section
      style={{
        background: '#0E0E0C',
        padding: '5rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {STATS.map((stat, i) => (
          <div key={i} style={{ display: 'flex', flex: 1, minWidth: '200px' }}>
            <StatItem value={stat.value} label={stat.label} index={i} />
            {i < STATS.length - 1 && (
              <div
                style={{
                  width: '1px',
                  background: 'linear-gradient(to bottom, transparent, #C9A96E44, transparent)',
                  alignSelf: 'stretch',
                  margin: '2rem 0',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
