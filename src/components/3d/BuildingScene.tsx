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
        camera={{ position: [0, 2, 8], fov: 45 }}
        shadows={false}
      >
        {/* Lights */}
        <ambientLight intensity={0.5} color="#2a1f0e" />
        <directionalLight position={[3, 6, 4]} intensity={1.8} color="#ffe4a0" />
        <pointLight position={[-4, 8, -2]} intensity={0.6} color="#ffffff" />

        <Suspense fallback={null}>
          <HaussmannBuilding progressRef={progressRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}
