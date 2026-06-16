import { useRef, useEffect, Suspense, lazy } from 'react'
import { gsap, ScrollTrigger } from './lib/gsap'
import { useLenis } from './hooks/useLenis'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useWebGL } from './hooks/useWebGL'
import NavBar from './components/ui/NavBar'
import HeroOverlay from './components/sections/HeroOverlay'
import ServicePanels from './components/sections/ServicePanels'
import BuildingFallback from './components/3d/BuildingFallback'
import BeforeAfter from './components/sections/BeforeAfter'
import Stats from './components/sections/Stats'
import Estimator from './components/sections/Estimator'
import Method from './components/sections/Method'
import Referencing from './components/sections/Referencing'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'

const BuildingScene = lazy(() => import('./components/3d/BuildingScene'))

// Suppress unused import warning — gsap is used for side-effects (plugin registration)
void gsap

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
        background: '#0E0E0C',
        color: '#F7F6F2',
        fontFamily: 'Jost, sans-serif',
        minHeight: '100vh',
      }}
    >
      <NavBar />

      {/* 3D sticky experience zone — 600vh */}
      <div
        ref={scrollZoneRef}
        style={{ height: reducedMotion ? '100vh' : '600vh', position: 'relative' }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {show3D ? (
            <Suspense fallback={<BuildingFallback />}>
              <BuildingScene progressRef={progressRef} />
            </Suspense>
          ) : (
            <BuildingFallback />
          )}
          <HeroOverlay progressRef={progressRef} reducedMotion={reducedMotion} />
          {!reducedMotion && <ServicePanels progressRef={progressRef} />}
        </div>
      </div>

      {/* Normal sections */}
      <BeforeAfter />
      <Stats />
      <Estimator />
      <Method />
      <Referencing />
      <Contact />
      <Footer />
    </div>
  )
}
