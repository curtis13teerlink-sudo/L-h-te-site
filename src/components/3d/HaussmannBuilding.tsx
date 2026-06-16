import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface HaussmannBuildingProps {
  progressRef: React.MutableRefObject<number>
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

// ── Constantes de géométrie ──
const FLOOR_H = 0.75
const BLDG_W = 4.0
const BLDG_D = 0.55
const WIN_W = 0.50
const WIN_H = 0.55
const CORNICE_H = 0.07

// ── Positions Y de base ──
const BASE_GROUND_Y = 0
const BASE_F1_Y = FLOOR_H        // 0.75
const BASE_F2_Y = FLOOR_H * 2    // 1.50
const BASE_F3_Y = FLOOR_H * 3    // 2.25
const BASE_F4_Y = FLOOR_H * 4    // 3.00
const BASE_ROOF_Y = FLOOR_H * 5  // 3.75

// ── Matériaux (module-level, réutilisés) ──
const stoneMat = new THREE.MeshStandardMaterial({ color: '#D8CDB5', roughness: 0.88, metalness: 0.02 })
const corniceMat = new THREE.MeshStandardMaterial({ color: '#E8DEC8', roughness: 0.80, metalness: 0.02 })
const rustiqueMat = new THREE.MeshStandardMaterial({ color: '#C8BDA5', roughness: 0.92, metalness: 0.01 })
const windowMat = new THREE.MeshStandardMaterial({ color: '#1C2A3A', emissive: '#2A4060', emissiveIntensity: 0.5, roughness: 0.1, metalness: 0.3 })
const ironMat = new THREE.MeshStandardMaterial({ color: '#9C7C46', roughness: 0.25, metalness: 0.88 })
const zincMat = new THREE.MeshStandardMaterial({ color: '#6B7A7D', roughness: 0.52, metalness: 0.35 })
const zincDarkMat = new THREE.MeshStandardMaterial({ color: '#5A6B72', roughness: 0.55, metalness: 0.32 })
const doorMat = new THREE.MeshStandardMaterial({ color: '#2A1810', roughness: 0.88, metalness: 0.0 })

// Suppress unused variable warning for doorMat — it IS used in GroundFloor
void BLDG_W; void BLDG_D; void WIN_W; void WIN_H; void CORNICE_H;

// ── WindowWithFrame ──
function WindowWithFrame({ x, y, z }: { x: number; y: number; z: number }) {
  return (
    <group position={[x, y, z]}>
      {/* Encadrement saillant */}
      <mesh material={corniceMat}>
        <boxGeometry args={[0.56, 0.62, 0.06]} />
      </mesh>
      {/* Appui de fenêtre */}
      <mesh position={[0, -0.32, 0.035]} material={corniceMat}>
        <boxGeometry args={[0.60, 0.035, 0.09]} />
      </mesh>
      {/* Verre emissif */}
      <mesh position={[0, 0, 0.02]} material={windowMat}>
        <boxGeometry args={[0.44, 0.53, 0.025]} />
      </mesh>
    </group>
  )
}

// ── GroundFloor ──
function GroundFloor() {
  return (
    <group>
      {/* Façade principale */}
      <mesh material={stoneMat}>
        <boxGeometry args={[BLDG_W, FLOOR_H, BLDG_D]} />
      </mesh>

      {/* Bandes de refend horizontales */}
      {([-0.27, -0.14, 0.0, 0.14] as number[]).map((ry, i) => (
        <mesh key={i} position={[0, ry, 0]} material={rustiqueMat}>
          <boxGeometry args={[BLDG_W, 0.018, BLDG_D]} />
        </mesh>
      ))}

      {/* Porte cochère — soubassement */}
      <mesh position={[0, 0, 0.005]} material={rustiqueMat}>
        <boxGeometry args={[0.90, 0.68, 0.56]} />
      </mesh>
      {/* Pilastre gauche */}
      <mesh position={[-0.44, 0, 0.015]} material={corniceMat}>
        <boxGeometry args={[0.11, 0.62, 0.58]} />
      </mesh>
      {/* Pilastre droit */}
      <mesh position={[0.44, 0, 0.015]} material={corniceMat}>
        <boxGeometry args={[0.11, 0.62, 0.58]} />
      </mesh>
      {/* Porte en bois */}
      <mesh position={[0, -0.14, 0.285]} material={doorMat}>
        <boxGeometry args={[0.68, 0.48, 0.03]} />
      </mesh>
      {/* Arche */}
      <mesh position={[0, 0.22, 0.285]} rotation={[Math.PI / 2, 0, 0]} material={corniceMat}>
        <torusGeometry args={[0.34, 0.044, 8, 18, Math.PI]} />
      </mesh>
      {/* Clé de voûte */}
      <mesh position={[0, 0.56, 0.285]} material={corniceMat}>
        <boxGeometry args={[0.09, 0.09, 0.06]} />
      </mesh>
      {/* Imposte (verre au-dessus porte) */}
      <mesh position={[0, 0.32, 0.286]} material={windowMat}>
        <boxGeometry args={[0.62, 0.18, 0.02]} />
      </mesh>
      {/* Marches */}
      <mesh position={[0, -0.38, 0.37]} material={corniceMat}>
        <boxGeometry args={[0.9, 0.04, 0.18]} />
      </mesh>

      {/* Fenêtres latérales */}
      <WindowWithFrame x={-1.52} y={0.0} z={0.285} />
      <WindowWithFrame x={1.52} y={0.0} z={0.285} />

      {/* Corniche haute */}
      <mesh position={[0, 0.385, 0]} material={corniceMat}>
        <boxGeometry args={[4.15, CORNICE_H, 0.62]} />
      </mesh>
    </group>
  )
}

// ── StandardFloor (étages 1 et 3) ──
function StandardFloor() {
  return (
    <group>
      {/* Façade */}
      <mesh material={stoneMat}>
        <boxGeometry args={[BLDG_W, FLOOR_H, BLDG_D]} />
      </mesh>
      {/* Corniche haute */}
      <mesh position={[0, 0.385, 0]} material={corniceMat}>
        <boxGeometry args={[4.15, CORNICE_H, 0.62]} />
      </mesh>
      {/* 3 fenêtres */}
      <WindowWithFrame x={-1.35} y={0.02} z={0.285} />
      <WindowWithFrame x={0} y={0.02} z={0.285} />
      <WindowWithFrame x={1.35} y={0.02} z={0.285} />
    </group>
  )
}

// ── FloorWithBalcony (étages 2 et 4) ──
function FloorWithBalcony() {
  // 22 balusters de X:-2.1 à X:2.1
  const balusterCount = 22
  const balusterMesh = useRef<THREE.InstancedMesh>(null!)
  const balusterGeo = new THREE.BoxGeometry(0.038, 0.18, 0.038)

  // On utilise useEffect pour positionner les instances
  useEffect(() => {
    if (!balusterMesh.current) return
    const dummy = new THREE.Object3D()
    for (let i = 0; i < balusterCount; i++) {
      const bx = -2.1 + (i / (balusterCount - 1)) * 4.2
      dummy.position.set(bx, -0.25, 0.555)
      dummy.updateMatrix()
      balusterMesh.current.setMatrixAt(i, dummy.matrix)
    }
    balusterMesh.current.instanceMatrix.needsUpdate = true
  }, [])

  return (
    <group>
      {/* Façade */}
      <mesh material={stoneMat}>
        <boxGeometry args={[BLDG_W, FLOOR_H, BLDG_D]} />
      </mesh>
      {/* Corniche haute */}
      <mesh position={[0, 0.385, 0]} material={corniceMat}>
        <boxGeometry args={[4.15, CORNICE_H, 0.62]} />
      </mesh>
      {/* 3 fenêtres */}
      <WindowWithFrame x={-1.35} y={0.02} z={0.285} />
      <WindowWithFrame x={0} y={0.02} z={0.285} />
      <WindowWithFrame x={1.35} y={0.02} z={0.285} />

      {/* Grand balcon filant */}
      {/* Tablette balcon */}
      <mesh position={[0, -0.33, 0.42]} material={stoneMat}>
        <boxGeometry args={[4.35, 0.04, 0.30]} />
      </mesh>
      {/* Rail principal */}
      <mesh position={[0, -0.15, 0.555]} material={ironMat}>
        <boxGeometry args={[4.35, 0.042, 0.055]} />
      </mesh>
      {/* Retour gauche */}
      <mesh position={[-2.19, -0.15, 0.41]} material={ironMat}>
        <boxGeometry args={[0.055, 0.042, 0.30]} />
      </mesh>
      {/* Retour droit */}
      <mesh position={[2.19, -0.15, 0.41]} material={ironMat}>
        <boxGeometry args={[0.055, 0.042, 0.30]} />
      </mesh>
      {/* Balusters instanciés */}
      <instancedMesh ref={balusterMesh} args={[balusterGeo, ironMat, balusterCount]} />
    </group>
  )
}

// ── MansardRoof ──
function MansardRoof() {
  const lucarnePositions = [-1.35, 0, 1.35]
  const chimneyPositions = [-1.15, 1.15]

  return (
    <group>
      {/* Corniche bas toit */}
      <mesh position={[0, -0.30, 0]} material={corniceMat}>
        <boxGeometry args={[4.4, 0.09, 0.63]} />
      </mesh>
      {/* Corps principal bas (mansard) */}
      <mesh position={[0, -0.06, 0]} material={zincMat}>
        <boxGeometry args={[4.2, 0.42, 0.61]} />
      </mesh>
      {/* Corps principal haut (retrait) */}
      <mesh position={[0, 0.26, 0]} material={zincDarkMat}>
        <boxGeometry args={[3.85, 0.28, 0.54]} />
      </mesh>

      {/* 3 lucarnes */}
      {lucarnePositions.map((lx, i) => (
        <group key={i} position={[lx, 0, 0]}>
          {/* Corps lucarne */}
          <mesh position={[0, 0.10, 0.34]} material={zincMat}>
            <boxGeometry args={[0.46, 0.34, 0.14]} />
          </mesh>
          {/* Fenêtre lucarne */}
          <mesh position={[0, 0.10, 0.415]} material={windowMat}>
            <boxGeometry args={[0.32, 0.23, 0.03]} />
          </mesh>
          {/* Fronton triangulaire */}
          <mesh position={[0, 0.28, 0.34]} material={zincMat}>
            <boxGeometry args={[0.52, 0.05, 0.12]} />
          </mesh>
          {/* Moulure fronton gauche */}
          <mesh position={[-0.12, 0.20, 0.34]} rotation={[0, 0, -0.5]} material={zincMat}>
            <boxGeometry args={[0.28, 0.03, 0.08]} />
          </mesh>
          {/* Moulure fronton droit */}
          <mesh position={[0.12, 0.20, 0.34]} rotation={[0, 0, 0.5]} material={zincMat}>
            <boxGeometry args={[0.28, 0.03, 0.08]} />
          </mesh>
        </group>
      ))}

      {/* 2 cheminées */}
      {chimneyPositions.map((cx, i) => (
        <group key={i} position={[cx, 0, 0]}>
          {/* Corps cheminée */}
          <mesh position={[0, 0.42, 0]} material={stoneMat}>
            <cylinderGeometry args={[0.08, 0.10, 0.52, 8]} />
          </mesh>
          {/* Capuchon */}
          <mesh position={[0, 0.72, 0]} material={zincMat}>
            <cylinderGeometry args={[0.12, 0.08, 0.06, 8]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// ── HaussmannBuilding principal ──
export default function HaussmannBuilding({ progressRef }: HaussmannBuildingProps) {
  const buildingGroupRef = useRef<THREE.Group>(null!)
  const roofGroupRef = useRef<THREE.Group>(null!)
  const floor4GroupRef = useRef<THREE.Group>(null!)
  const floor3GroupRef = useRef<THREE.Group>(null!)
  const floor2GroupRef = useRef<THREE.Group>(null!)
  const floor1GroupRef = useRef<THREE.Group>(null!)

  const mouseRef = useRef({ x: 0, y: 0 })
  const autoRotRef = useRef(0)

  const currentY = useRef({
    roof: BASE_ROOF_Y,
    f4: BASE_F4_Y,
    f3: BASE_F3_Y,
    f2: BASE_F2_Y,
    f1: BASE_F1_Y,
  })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  useFrame(() => {
    if (!buildingGroupRef.current) return

    const p = progressRef.current

    // Phases smoothstep
    const s1 = smoothstep(0.15, 0.28, p)
    const s2 = smoothstep(0.28, 0.42, p)
    const s3 = smoothstep(0.42, 0.56, p)
    const s4 = smoothstep(0.56, 0.70, p)
    const reasm = smoothstep(0.75, 0.98, p)

    const maxAll = Math.max(s1, s2, s3, s4)

    const targetRoofY = BASE_ROOF_Y + (1 - reasm) * maxAll * 3.5
    const targetF4Y   = BASE_F4_Y   + (1 - reasm) * maxAll * 2.4
    const targetF3Y   = BASE_F3_Y   + (1 - reasm) * Math.max(s2, s3, s4) * 1.6
    const targetF2Y   = BASE_F2_Y   + (1 - reasm) * Math.max(s3, s4) * 1.0
    const targetF1Y   = BASE_F1_Y   + (1 - reasm) * s4 * 0.55

    const lerpFactor = 0.065

    currentY.current.roof = THREE.MathUtils.lerp(currentY.current.roof, targetRoofY, lerpFactor)
    currentY.current.f4   = THREE.MathUtils.lerp(currentY.current.f4,   targetF4Y,   lerpFactor)
    currentY.current.f3   = THREE.MathUtils.lerp(currentY.current.f3,   targetF3Y,   lerpFactor)
    currentY.current.f2   = THREE.MathUtils.lerp(currentY.current.f2,   targetF2Y,   lerpFactor)
    currentY.current.f1   = THREE.MathUtils.lerp(currentY.current.f1,   targetF1Y,   lerpFactor)

    if (roofGroupRef.current)  roofGroupRef.current.position.y  = currentY.current.roof
    if (floor4GroupRef.current) floor4GroupRef.current.position.y = currentY.current.f4
    if (floor3GroupRef.current) floor3GroupRef.current.position.y = currentY.current.f3
    if (floor2GroupRef.current) floor2GroupRef.current.position.y = currentY.current.f2
    if (floor1GroupRef.current) floor1GroupRef.current.position.y = currentY.current.f1

    // Rotation auto ou parallaxe souris
    if (p < 0.14) {
      autoRotRef.current += 0.0025
      buildingGroupRef.current.rotation.y = autoRotRef.current
    } else {
      const targetRotY = mouseRef.current.x * (6 * Math.PI / 180)
      const targetRotX = -mouseRef.current.y * (3 * Math.PI / 180)
      buildingGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        buildingGroupRef.current.rotation.y,
        targetRotY,
        0.04
      )
      buildingGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        buildingGroupRef.current.rotation.x,
        targetRotX,
        0.04
      )
    }
  })

  return (
    <group ref={buildingGroupRef} position={[0, -2.5, 0]}>
      {/* RDC — non animé */}
      <group position={[0, BASE_GROUND_Y, 0]}>
        <GroundFloor />
      </group>

      {/* Étage 1 — StandardFloor */}
      <group ref={floor1GroupRef} position={[0, BASE_F1_Y, 0]}>
        <StandardFloor />
      </group>

      {/* Étage 2 — FloorWithBalcony */}
      <group ref={floor2GroupRef} position={[0, BASE_F2_Y, 0]}>
        <FloorWithBalcony />
      </group>

      {/* Étage 3 — StandardFloor */}
      <group ref={floor3GroupRef} position={[0, BASE_F3_Y, 0]}>
        <StandardFloor />
      </group>

      {/* Étage 4 — FloorWithBalcony */}
      <group ref={floor4GroupRef} position={[0, BASE_F4_Y, 0]}>
        <FloorWithBalcony />
      </group>

      {/* Toit mansardé */}
      <group ref={roofGroupRef} position={[0, BASE_ROOF_Y, 0]}>
        <MansardRoof />
      </group>
    </group>
  )
}
