import { Suspense, lazy } from 'react'
import { useLenis } from './hooks/useLenis'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useWebGL } from './hooks/useWebGL'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import NavBar from './components/ui/NavBar'
import HeroOverlay from './components/sections/HeroOverlay'
import BuildingFallback from './components/3d/BuildingFallback'
import WhyUs from './components/sections/WhyUs'
import Services from './components/sections/Services'
import BeforeAfter from './components/sections/BeforeAfter'
import Compliance from './components/sections/Compliance'
import Stats from './components/sections/Stats'
import Estimator from './components/sections/Estimator'
import Method from './components/sections/Method'
import Referencing from './components/sections/Referencing'
import FAQ from './components/sections/FAQ'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'

const BuildingScene = lazy(() => import('./components/3d/BuildingScene'))

export default function App() {
  const reducedMotion = useReducedMotion()
  const webGLSupported = useWebGL()

  useLenis()

  const show3D = !reducedMotion && webGLSupported

  return (
    <div
      style={{
        background: '#F2EDE3',
        color: '#1B2A4A',
        fontFamily: 'Jost, sans-serif',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <NavBar />

      {/* Hero : exactement 100vh, immeuble 3D centré, overlay texte */}
      <section
        style={{
          position: 'relative',
          height: '100vh',
          background: '#0A1628',
          overflow: 'hidden',
        }}
      >
        {show3D ? (
          <ErrorBoundary fallback={<BuildingFallback />}>
            <Suspense fallback={<BuildingFallback />}>
              <BuildingScene />
            </Suspense>
          </ErrorBoundary>
        ) : (
          <BuildingFallback />
        )}
        <HeroOverlay reducedMotion={reducedMotion} />
      </section>

      {/* Sections normales — alternance clair/sombre */}
      <WhyUs />
      <Services />
      <BeforeAfter />
      <Compliance />
      <Stats />
      <Estimator />
      <Method />
      <Referencing />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  )
}
