import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import HaussmannBuilding from './HaussmannBuilding'
import BuildingFallback from './BuildingFallback'

interface BuildingSceneProps {
  progressRef: React.MutableRefObject<number>
}

export default function BuildingScene({ progressRef }: BuildingSceneProps) {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        gl={{ antialias: true, powerPreference: 'high-performance', toneMapping: 3 }}
        dpr={[1, 1.5]}
        camera={{ position: [0.4, 1.0, 8.5], fov: 40 }}
        shadows={false}
      >
        {/* Fond nuit parisienne */}
        <color attach="background" args={['#0A1628']} />

        {/*
          Environment IBL (Image-Based Lighting) — preset "city"
          Transforme les matériaux MeshPhysicalMaterial : reflets corrects
          sur la pierre, le zinc et le fer forgé sans texture externe.
        */}
        <Environment preset="city" environmentIntensity={0.55} />

        {/* Lumière principale : soleil couchant bas-gauche, chaud */}
        <directionalLight position={[-5, 4, 6]} intensity={2.8} color="#FFE8B0" />
        {/* Remplissage : ciel bleu nuit */}
        <directionalLight position={[6, 8, -2]} intensity={0.7} color="#A8C4E0" />
        {/* Lumière de rue depuis le bas */}
        <pointLight position={[0, -1.5, 4]} intensity={1.2} color="#FFD080" distance={12} />
        {/* Accent arrière bleu nuit */}
        <pointLight position={[0, 3, -4]} intensity={0.4} color="#4060A0" distance={15} />

        {/* Ombre de contact subtile */}
        <ContactShadows
          position={[0, -2.82, 0]}
          opacity={0.28}
          scale={8}
          blur={2.5}
          far={4}
          color="#0A1628"
        />

        <Suspense fallback={null}>
          <HaussmannBuilding progressRef={progressRef} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export { BuildingFallback }
