export default function ScrollIndicator() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
      }}
    >
      <span
        style={{
          fontFamily: 'Jost, sans-serif',
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#8B8678',
        }}
      >
        Défiler
      </span>
      <div
        style={{
          width: '1px',
          height: '40px',
          background: 'linear-gradient(to bottom, #C9A96E, transparent)',
          animation: 'scrollLinePulse 2s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes scrollLinePulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
          50% { opacity: 1; transform: scaleY(1); }
        }
      `}</style>
    </div>
  )
}
