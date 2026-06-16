import { useRef, useEffect, Suspense, lazy } from 'react'
import { ScrollTrigger } from './lib/gsap'
import { useLenis } from './hooks/useLenis'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useWebGL } from './hooks/useWebGL'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import NavBar from './components/ui/NavBar'
import HeroOverlay from './components/sections/HeroOverlay'
import ServicePanels from './components/sections/ServicePanels'
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
  const scrollZoneRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<number>(0)
  const reducedMotion = useReducedMotion()
  const webGLSupported = useWebGL()

  useLenis()

  useEffect(() => {
    if (reducedMotion || !scrollZoneRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: scrollZoneRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5,
      onUpdate: (self) => {
        progressRef.current = self.progress
      },
    })

    return () => trigger.kill()
  }, [reducedMotion])

  const show3D = !reducedMotion && webGLSupported

  return (
    <div
      style={{
        background: '#F5F1E8',
        color: '#1A1814',
        fontFamily: 'Jost, sans-serif',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <NavBar />

      {/* Zone d'expérience 3D sticky — 600vh, fond nuit */}
      <div
        ref={scrollZoneRef}
        style={{
          height: reducedMotion ? '100vh' : '600vh',
          position: 'relative',
          background: '#0D1420',
        }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
            background: '#0D1420',
          }}
        >
          {show3D ? (
            <ErrorBoundary fallback={<BuildingFallback />}>
              <Suspense fallback={<BuildingFallback />}>
                <BuildingScene progressRef={progressRef} />
              </Suspense>
            </ErrorBoundary>
          ) : (
            <BuildingFallback />
          )}
          <HeroOverlay progressRef={progressRef} reducedMotion={reducedMotion} />
          {!reducedMotion && <ServicePanels progressRef={progressRef} />}
        </div>
      </div>

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
