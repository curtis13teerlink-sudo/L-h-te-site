import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App'
import { ErrorBoundary } from './components/ui/ErrorBoundary'

const RootFallback = () => (
  <div
    style={{
      background: '#0A1628',
      color: '#F2EDE3',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Georgia, serif',
    }}
  >
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1
        style={{
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: '2.5rem',
          color: '#C9A96E',
          marginBottom: '1rem',
        }}
      >
        L'HÔTE
      </h1>
      <p style={{ color: '#8B8678', fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        Conciergerie Airbnb haut de gamme à Paris
      </p>
      <a
        href="#contact"
        style={{
          display: 'inline-block',
          marginTop: '2rem',
          color: '#C9A96E',
          fontFamily: 'sans-serif',
          fontSize: '0.8rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          border: '1px solid rgba(201,169,110,0.4)',
          padding: '0.75rem 1.5rem',
        }}
      >
        Obtenir un diagnostic gratuit
      </a>
    </div>
  </div>
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<RootFallback />}>
      <App />
    </ErrorBoundary>
  </StrictMode>
)
