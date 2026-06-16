import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import HaussmannBuilding from './HaussmannBuilding'
import BuildingFallback from './BuildingFallback'

interface BuildingSceneProps {
  progressRef: React.MutableRefObject<number>
}

export default function BuildingScene({ progressRef }: BuildingSceneProps) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.5, 9], fov: 42 }}
        shadows={false}
      >
        {/* Fond nuit parisienne */}
        <color attach="background" args={['#0D1420']} />

        {/* Lumières */}
        <ambientLight intensity={0.7} color="#E8D5B0" />
        <directionalLight position={[-4, 8, 5]} intensity={2.2} color="#FFF0CC" />
        <directionalLight position={[5, 3, 2]} intensity={0.5} color="#C8D5E8" />
        <pointLight position={[0, -1, 3]} intensity={0.8} color="#E8C080" />
        <pointLight position={[-2, 5, 4]} intensity={0.4} color="#FFE8B0" />

        <Suspense fallback={null}>
          <HaussmannBuilding progressRef={progressRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Fallback re-export pour la compatibilité
export { BuildingFallback }
