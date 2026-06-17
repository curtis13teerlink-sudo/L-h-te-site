import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'

export function useLenis() {
  useEffect(() => {
    let lenis: Lenis | null = null
    let rafCallback: ((time: number) => void) | null = null

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })

      lenis.on('scroll', () => ScrollTrigger.update())

      rafCallback = (time: number) => lenis!.raf(time * 1000)
      gsap.ticker.add(rafCallback)
      gsap.ticker.lagSmoothing(0)
    } catch (e) {
      console.warn("[L'HÔTE] Lenis init failed, falling back to native scroll:", e)
    }

    return () => {
      try {
        if (lenis) lenis.destroy()
        if (rafCallback) gsap.ticker.remove(rafCallback)
      } catch {
        // ignore cleanup errors
      }
    }
  }, [])
}
