import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface HaussmannBuildingProps {
  progressRef: React.MutableRefObject<number>
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

// Material definitions
const facadeMat = new THREE.MeshStandardMaterial({ color: '#D4C8B0', roughness: 0.85, metalness: 0.0 })
const zincMat = new THREE.MeshStandardMaterial({ color: '#3A4550', roughness: 0.6, metalness: 0.4 })
const windowMat = new THREE.MeshStandardMaterial({ color: '#0D1520', emissive: '#1a2535', emissiveIntensity: 0.3 })
const ironMat = new THREE.MeshStandardMaterial({ color: '#C9A96E', roughness: 0.25, metalness: 0.85 })
const cornicheMat = new THREE.MeshStandardMaterial({ color: '#E8E0D0', roughness: 0.7, metalness: 0.0 })
const rustiqueMat = new THREE.MeshStandardMaterial({ color: '#C8BAA0', roughness: 0.9, metalness: 0.0 })

// Base Y positions
const BASE_GROUND_Y = 0
const BASE_F1_Y = 0.65
const BASE_F2_Y = 1.30
const BASE_F3_Y = 1.95
const BASE_F4_Y = 2.60
const BASE_ROOF_Y = 3.25

function WindowMesh({ x, y, z }: { x: number; y: number; z: number }) {
  return (
    <group position={[x, y, z]}>
      {/* Window frame slightly extruded */}
      <mesh material={cornicheMat}>
        <boxGeometry args={[0.59, 0.39, 0.06]} />
      </mesh>
      <mesh position={[0, 0, 0.04]} material={windowMat}>
        <boxGeometry args={[0.52, 0.33, 0.04]} />
      </mesh>
    </group>
  )
}

function Balcony({ x }: { x: number }) {
  const balusterPositions = useMemo(() => {
    const positions = []
    for (let i = 0; i < 6; i++) {
      positions.push(-0.27 + i * 0.11)
    }
    return positions
  }, [])

  return (
    <group position={[x, -0.2, 0.46]}>
      {/* Rail */}
      <mesh material={ironMat}>
        <boxGeometry args={[0.66, 0.05, 0.08]} />
      </mesh>
      {/* Balusters */}
      {balusterPositions.map((bx, i) => (
        <mesh key={i} position={[bx, -0.1, 0]} material={ironMat}>
          <boxGeometry args={[0.04, 0.22, 0.04]} />
        </mesh>
      ))}
    </group>
  )
}

function StandardFloor({ baseY }: { baseY: number }) {
  return (
    <group>
      {/* Main facade */}
      <mesh material={facadeMat}>
        <boxGeometry args={[4, 0.65, 0.8]} />
      </mesh>
      {/* Cornice top */}
      <mesh position={[0, 0.34, 0]} material={cornicheMat}>
        <boxGeometry args={[4.05, 0.06, 0.85]} />
      </mesh>
      {/* 3 windows + balconies */}
      <WindowMesh x={-1.3} y={0.02} z={0.42} />
      <WindowMesh x={0} y={0.02} z={0.42} />
      <WindowMesh x={1.3} y={0.02} z={0.42} />
      <Balcony x={-1.3} />
      <Balcony x={0} />
      <Balcony x={1.3} />
    </group>
  )
}

function GroundFloor() {
  return (
    <group>
      {/* Rusticated stone bands */}
      <mesh material={facadeMat}>
        <boxGeometry args={[4, 0.65, 0.8]} />
      </mesh>
      {/* Rustication lines */}
      {[-0.2, -0.05, 0.1, 0.25].map((y, i) => (
        <mesh key={i} position={[0, y, 0.41]} material={rustiqueMat}>
          <boxGeometry args={[4.01, 0.02, 0.02]} />
        </mesh>
      ))}
      {/* Porte cochère pillars */}
      <mesh position={[-0.32, -0.05, 0.42]} material={cornicheMat}>
        <boxGeometry args={[0.15, 0.55, 0.85]} />
      </mesh>
      <mesh position={[0.32, -0.05, 0.42]} material={cornicheMat}>
        <boxGeometry args={[0.15, 0.55, 0.85]} />
      </mesh>
      {/* Arch - torus half */}
      <mesh position={[0, 0.22, 0.42]} rotation={[Math.PI / 2, 0, 0]} material={cornicheMat}>
        <torusGeometry args={[0.32, 0.05, 8, 16, Math.PI]} />
      </mesh>
      {/* Door */}
      <mesh position={[0, -0.05, 0.43]} material={windowMat}>
        <boxGeometry args={[0.52, 0.45, 0.02]} />
      </mesh>
      {/* Side windows ground floor */}
      <WindowMesh x={-1.4} y={-0.05} z={0.42} />
      <WindowMesh x={1.4} y={-0.05} z={0.42} />
      {/* Cornice top */}
      <mesh position={[0, 0.34, 0]} material={cornicheMat}>
        <boxGeometry args={[4.05, 0.06, 0.85]} />
      </mesh>
    </group>
  )
}

function MansardRoof() {
  return (
    <group>
      {/* Main mansard body */}
      <mesh material={zincMat}>
        <boxGeometry args={[4.3, 0.55, 0.9]} />
      </mesh>
      {/* Chimneys */}
      <mesh position={[-1.2, 0.55, 0]} material={rustiqueMat}>
        <cylinderGeometry args={[0.1, 0.12, 0.5, 8]} />
      </mesh>
      <mesh position={[1.2, 0.55, 0]} material={rustiqueMat}>
        <cylinderGeometry args={[0.1, 0.12, 0.5, 8]} />
      </mesh>
      {/* Chimney tops */}
      <mesh position={[-1.2, 0.85, 0]} material={zincMat}>
        <cylinderGeometry args={[0.13, 0.10, 0.1, 8]} />
      </mesh>
      <mesh position={[1.2, 0.85, 0]} material={zincMat}>
        <cylinderGeometry args={[0.13, 0.10, 0.1, 8]} />
      </mesh>
      {/* Lucarnes (dormer windows) */}
      {[-1.3, 0, 1.3].map((x, i) => (
        <group key={i} position={[x, 0.3, 0.42]}>
          <mesh material={zincMat}>
            <boxGeometry args={[0.45, 0.35, 0.1]} />
          </mesh>
          <mesh material={windowMat} position={[0, 0, 0.04]}>
            <boxGeometry args={[0.36, 0.28, 0.04]} />
          </mesh>
          {/* Triangle roof for lucarne */}
          <mesh position={[0, 0.24, 0]} material={zincMat}>
            <boxGeometry args={[0.5, 0.06, 0.12]} />
          </mesh>
        </group>
      ))}
      {/* Zinc cornice bottom */}
      <mesh position={[0, -0.3, 0]} material={zincMat}>
        <boxGeometry args={[4.4, 0.08, 0.95]} />
      </mesh>
    </group>
  )
}

export default function HaussmannBuilding({ progressRef }: HaussmannBuildingProps) {
  const buildingGroupRef = useRef<THREE.Group>(null!)
  const roofGroupRef = useRef<THREE.Group>(null!)
  const floor4GroupRef = useRef<THREE.Group>(null!)
  const floor3GroupRef = useRef<THREE.Group>(null!)
  const floor2GroupRef = useRef<THREE.Group>(null!)
  const floor1GroupRef = useRef<THREE.Group>(null!)
  const goldSpotRef = useRef<THREE.SpotLight>(null!)

  const mouseRef = useRef({ x: 0, y: 0 })
  const autoRotRef = useRef(0)

  // Current lerped Y positions
  const currentY = useRef({
    roof: BASE_ROOF_Y,
    f4: BASE_F4_Y,
    f3: BASE_F3_Y,
    f2: BASE_F2_Y,
    f1: BASE_F1_Y,
  })

  // Mouse tracking — dans useEffect, pas dans le rendu
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  useFrame((_state, _delta) => {
    if (!buildingGroupRef.current) return

    const p = progressRef.current

    // Smoothstep phases
    const s1 = smoothstep(0.15, 0.30, p)
    const s2 = smoothstep(0.30, 0.45, p)
    const s3 = smoothstep(0.45, 0.60, p)
    const s4 = smoothstep(0.60, 0.75, p)
    const reasm = smoothstep(0.75, 1.0, p)

    // Target Y positions
    const maxS1234 = Math.max(s1, s2, s3, s4)
    const targetRoofY = BASE_ROOF_Y + (1 - reasm) * maxS1234 * 3.2
    const targetF4Y = BASE_F4_Y + (1 - reasm) * maxS1234 * 2.2
    const targetF3Y = BASE_F3_Y + (1 - reasm) * Math.max(s2, s3, s4) * 1.5
    const targetF2Y = BASE_F2_Y + (1 - reasm) * Math.max(s3, s4) * 0.9
    const targetF1Y = BASE_F1_Y + (1 - reasm) * s4 * 0.5

    // Lerp current positions
    const lerpFactor = 0.08
    currentY.current.roof = THREE.MathUtils.lerp(currentY.current.roof, targetRoofY, lerpFactor)
    currentY.current.f4 = THREE.MathUtils.lerp(currentY.current.f4, targetF4Y, lerpFactor)
    currentY.current.f3 = THREE.MathUtils.lerp(currentY.current.f3, targetF3Y, lerpFactor)
    currentY.current.f2 = THREE.MathUtils.lerp(currentY.current.f2, targetF2Y, lerpFactor)
    currentY.current.f1 = THREE.MathUtils.lerp(currentY.current.f1, targetF1Y, lerpFactor)

    // Apply Y positions
    if (roofGroupRef.current) roofGroupRef.current.position.y = currentY.current.roof
    if (floor4GroupRef.current) floor4GroupRef.current.position.y = currentY.current.f4
    if (floor3GroupRef.current) floor3GroupRef.current.position.y = currentY.current.f3
    if (floor2GroupRef.current) floor2GroupRef.current.position.y = currentY.current.f2
    if (floor1GroupRef.current) floor1GroupRef.current.position.y = currentY.current.f1

    // Auto rotation when p < 0.15
    if (p < 0.15) {
      autoRotRef.current += 0.003
      buildingGroupRef.current.rotation.y = autoRotRef.current
    } else {
      // Mouse parallax
      const targetRotY = mouseRef.current.x * (8 * Math.PI / 180)
      const targetRotX = -mouseRef.current.y * (3 * Math.PI / 180)
      buildingGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        buildingGroupRef.current.rotation.y,
        targetRotY,
        0.05
      )
      buildingGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        buildingGroupRef.current.rotation.x,
        targetRotX,
        0.05
      )
    }

    // Gold spotlight follows active floor
    if (goldSpotRef.current) {
      let activeY = BASE_F1_Y
      if (s4 > 0.1) activeY = currentY.current.f1
      else if (s3 > 0.1) activeY = currentY.current.f2
      else if (s2 > 0.1) activeY = currentY.current.f3
      else if (s1 > 0.1) activeY = currentY.current.f4
      goldSpotRef.current.target.position.set(0, activeY, 0)
      goldSpotRef.current.target.updateMatrixWorld()
    }
  })

  return (
    <group ref={buildingGroupRef} position={[0, -2, 0]}>
      {/* Ground floor — static */}
      <group position={[0, BASE_GROUND_Y, 0]}>
        <GroundFloor />
      </group>

      {/* Floor 1 */}
      <group ref={floor1GroupRef} position={[0, BASE_F1_Y, 0]}>
        <StandardFloor baseY={BASE_F1_Y} />
      </group>

      {/* Floor 2 */}
      <group ref={floor2GroupRef} position={[0, BASE_F2_Y, 0]}>
        <StandardFloor baseY={BASE_F2_Y} />
      </group>

      {/* Floor 3 */}
      <group ref={floor3GroupRef} position={[0, BASE_F3_Y, 0]}>
        <StandardFloor baseY={BASE_F3_Y} />
      </group>

      {/* Floor 4 */}
      <group ref={floor4GroupRef} position={[0, BASE_F4_Y, 0]}>
        <StandardFloor baseY={BASE_F4_Y} />
      </group>

      {/* Roof */}
      <group ref={roofGroupRef} position={[0, BASE_ROOF_Y, 0]}>
        <MansardRoof />
      </group>

      {/* Gold spotlight */}
      <spotLight
        ref={goldSpotRef}
        position={[3, 6, 3]}
        intensity={2}
        color="#C9A96E"
        angle={0.4}
        penumbra={0.5}
      />
    </group>
  )
}
