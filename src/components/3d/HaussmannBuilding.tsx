import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ── Constantes proportions réalistes ──────────────────────────────
const W = 3.2          // largeur façade (étroite, typique Paris)
const D = 0.42         // profondeur (façade 2D)
const FH = 0.82        // hauteur par étage (grands plafonds haussmanniens)
const GH = 0.90        // rez-de-chaussée plus haut
const CN = 0.065       // épaisseur corniche

// Positions Y des groupes (centre)
const BY = {
  ground: 0,
  f1: GH,
  f2: GH + FH,
  f3: GH + FH * 2,
  f4: GH + FH * 3,
  roof: GH + FH * 4 + 0.05,
}

// ── Matériaux MeshPhysicalMaterial pour meilleur rendu IBL ────────
const stoneMat = new THREE.MeshPhysicalMaterial({
  color: '#E2D9C8',
  roughness: 0.82,
  metalness: 0.0,
  clearcoat: 0.05,
  clearcoatRoughness: 0.5,
})
const cornMat = new THREE.MeshPhysicalMaterial({
  color: '#EDE5D4',
  roughness: 0.75,
  metalness: 0.0,
})
const rustMat = new THREE.MeshPhysicalMaterial({
  color: '#D4CAB8',
  roughness: 0.90,
  metalness: 0.0,
})
const glassMat = new THREE.MeshPhysicalMaterial({
  color: '#1C2840',
  emissive: '#253A5E',
  emissiveIntensity: 0.6,
  roughness: 0.05,
  metalness: 0.1,
  transparent: true,
  opacity: 0.92,
})
const imposteMat = new THREE.MeshPhysicalMaterial({
  color: '#1C2840',
  emissive: '#2A4570',
  emissiveIntensity: 0.8,
  roughness: 0.02,
  metalness: 0.05,
  transparent: true,
  opacity: 0.75,
})
const ironMat = new THREE.MeshStandardMaterial({
  color: '#7A5E2A',
  roughness: 0.3,
  metalness: 0.92,
})
const zincMat = new THREE.MeshStandardMaterial({
  color: '#5E6D72',
  roughness: 0.48,
  metalness: 0.42,
})
const zincDarkMat = new THREE.MeshStandardMaterial({
  color: '#4E5D62',
  roughness: 0.52,
  metalness: 0.38,
})
const doorMat = new THREE.MeshStandardMaterial({
  color: '#1E1008',
  roughness: 0.85,
  metalness: 0.05,
})

// ── Sous-composants ───────────────────────────────────────────────

function TallWindow({ x, y }: { x: number; y: number }) {
  const ww = 0.38
  const wh = 0.62
  const fz = D / 2 + 0.005
  return (
    <group position={[x, y, 0]}>
      <mesh material={cornMat} position={[0, 0, fz - 0.01]}>
        <boxGeometry args={[ww + 0.07, wh + 0.08, 0.055]} />
      </mesh>
      <mesh material={glassMat} position={[0, 0, fz + 0.025]}>
        <boxGeometry args={[ww, wh, 0.02]} />
      </mesh>
      <mesh material={cornMat} position={[0, 0, fz + 0.03]}>
        <boxGeometry args={[ww + 0.02, 0.022, 0.012]} />
      </mesh>
      <mesh material={cornMat} position={[0, -wh / 2 - 0.024, fz + 0.018]}>
        <boxGeometry args={[ww + 0.14, 0.038, 0.10]} />
      </mesh>
      <mesh material={cornMat} position={[0, wh / 2 + 0.022, fz + 0.01]}>
        <boxGeometry args={[ww + 0.10, 0.032, 0.07]} />
      </mesh>
    </group>
  )
}

function FilantBalcony({ count = 26 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const geo = useMemo(() => new THREE.BoxGeometry(0.032, 0.20, 0.032), [])
  const bz = D / 2 + 0.22

  useEffect(() => {
    if (!meshRef.current) return
    const d = new THREE.Object3D()
    for (let i = 0; i < count; i++) {
      const bx = -W / 2 - 0.1 + ((i + 0.5) / count) * (W + 0.2)
      d.position.set(bx, -0.215, bz)
      d.updateMatrix()
      meshRef.current.setMatrixAt(i, d.matrix)
    }
    meshRef.current.instanceMatrix.needsUpdate = true
  }, [count, bz])

  return (
    <group>
      <mesh material={cornMat} position={[0, -0.36, D / 2 + 0.14]}>
        <boxGeometry args={[W + 0.22, 0.045, 0.28]} />
      </mesh>
      <mesh material={cornMat} position={[-W / 2 - 0.11, -0.18, D / 2 + 0.14]}>
        <boxGeometry args={[0.045, 0.22, 0.28]} />
      </mesh>
      <mesh material={cornMat} position={[W / 2 + 0.11, -0.18, D / 2 + 0.14]}>
        <boxGeometry args={[0.045, 0.22, 0.28]} />
      </mesh>
      <mesh material={ironMat} position={[0, -0.13, bz]}>
        <boxGeometry args={[W + 0.22, 0.038, 0.048]} />
      </mesh>
      <mesh material={ironMat} position={[0, -0.23, bz]}>
        <boxGeometry args={[W + 0.22, 0.022, 0.030]} />
      </mesh>
      <instancedMesh ref={meshRef} args={[geo, ironMat, count]} />
    </group>
  )
}

function SmallBalcony({ x }: { x: number }) {
  const bw = 0.54
  const bz = D / 2 + 0.14

  return (
    <group position={[x, -0.33, 0]}>
      <mesh material={cornMat} position={[0, 0, D / 2 + 0.09]}>
        <boxGeometry args={[bw, 0.035, 0.20]} />
      </mesh>
      <mesh material={ironMat} position={[0, 0.08, bz]}>
        <boxGeometry args={[bw, 0.030, 0.035]} />
      </mesh>
      {[-0.18, -0.06, 0.06, 0.18].map((bx, i) => (
        <mesh key={i} material={ironMat} position={[bx, 0.00, bz]}>
          <boxGeometry args={[0.026, 0.15, 0.026]} />
        </mesh>
      ))}
    </group>
  )
}

function GroundFloor() {
  return (
    <group>
      <mesh material={rustMat}>
        <boxGeometry args={[W, GH, D]} />
      </mesh>
      {[-0.30, -0.14, 0.02, 0.18, 0.34].map((y, i) => (
        <mesh key={i} position={[0, y, D / 2 + 0.001]} material={rustMat}>
          <boxGeometry args={[W, 0.014, 0.005]} />
        </mesh>
      ))}
      <mesh position={[0, -0.02, 0.008]} material={rustMat}>
        <boxGeometry args={[0.82, GH - 0.06, D + 0.016]} />
      </mesh>
      <mesh position={[-0.38, 0.0, D / 2 + 0.018]} material={cornMat}>
        <boxGeometry args={[0.10, GH - 0.05, 0.07]} />
      </mesh>
      <mesh position={[0.38, 0.0, D / 2 + 0.018]} material={cornMat}>
        <boxGeometry args={[0.10, GH - 0.05, 0.07]} />
      </mesh>
      <mesh position={[-0.15, -0.12, D / 2 + 0.012]} material={doorMat}>
        <boxGeometry args={[0.27, 0.58, 0.028]} />
      </mesh>
      <mesh position={[0.15, -0.12, D / 2 + 0.012]} material={doorMat}>
        <boxGeometry args={[0.27, 0.58, 0.028]} />
      </mesh>
      <mesh
        position={[0, 0.28, D / 2 + 0.012]}
        rotation={[Math.PI / 2, 0, 0]}
        material={cornMat}
      >
        <torusGeometry args={[0.295, 0.048, 10, 20, Math.PI]} />
      </mesh>
      <mesh position={[0, 0.28, D / 2 + 0.022]} material={imposteMat}>
        <cylinderGeometry args={[0.242, 0.242, 0.018, 16, 1, false, 0, Math.PI]} />
      </mesh>
      <mesh position={[0, 0.576, D / 2 + 0.008]} material={cornMat}>
        <boxGeometry args={[0.075, 0.085, 0.055]} />
      </mesh>
      <mesh position={[0, -0.455, D / 2 + 0.10]} material={cornMat}>
        <boxGeometry args={[0.88, 0.038, 0.20]} />
      </mesh>
      <TallWindow x={-1.2} y={-0.02} />
      <TallWindow x={1.2} y={-0.02} />
      <mesh position={[0, GH / 2 - CN / 2 + 0.01, 0]} material={cornMat}>
        <boxGeometry args={[W + 0.12, CN, D + 0.10]} />
      </mesh>
    </group>
  )
}

function StandardFloor() {
  const wx = [-1.1, 0, 1.1]
  return (
    <group>
      <mesh material={stoneMat}>
        <boxGeometry args={[W, FH, D]} />
      </mesh>
      <mesh position={[0, FH / 2 - CN / 2, 0]} material={cornMat}>
        <boxGeometry args={[W + 0.12, CN, D + 0.08]} />
      </mesh>
      <mesh position={[0, -FH / 2 + 0.028, 0]} material={cornMat}>
        <boxGeometry args={[W + 0.08, 0.038, D + 0.04]} />
      </mesh>
      {wx.map((x, i) => (
        <group key={i}>
          <TallWindow x={x} y={0.06} />
          <SmallBalcony x={x} />
        </group>
      ))}
    </group>
  )
}

function NobleFLoor() {
  const wx = [-1.1, 0, 1.1]
  return (
    <group>
      <mesh material={stoneMat}>
        <boxGeometry args={[W, FH, D]} />
      </mesh>
      <mesh position={[0, FH / 2 - CN / 2, 0]} material={cornMat}>
        <boxGeometry args={[W + 0.16, CN + 0.02, D + 0.12]} />
      </mesh>
      <mesh position={[0, -FH / 2 + 0.032, 0]} material={cornMat}>
        <boxGeometry args={[W + 0.08, 0.042, D + 0.06]} />
      </mesh>
      {wx.map((x, i) => (
        <TallWindow key={i} x={x} y={0.06} />
      ))}
      <FilantBalcony />
    </group>
  )
}

function MansardRoof() {
  const lx = [-1.1, 0, 1.1]

  return (
    <group>
      <mesh position={[0, -0.34, 0]} material={cornMat}>
        <boxGeometry args={[W + 0.22, 0.10, D + 0.14]} />
      </mesh>
      <mesh position={[0, -0.10, 0]} material={zincMat}>
        <boxGeometry args={[W + 0.14, 0.46, D + 0.08]} />
      </mesh>
      <mesh position={[0, 0.26, 0]} material={zincDarkMat}>
        <boxGeometry args={[W - 0.08, 0.38, D - 0.02]} />
      </mesh>
      <mesh position={[0, 0.48, 0]} material={zincDarkMat}>
        <boxGeometry args={[W - 0.16, 0.05, D - 0.06]} />
      </mesh>
      {lx.map((x, i) => (
        <group key={i} position={[x, 0.12, D / 2 + 0.06]}>
          <mesh material={zincMat}>
            <boxGeometry args={[0.44, 0.36, 0.14]} />
          </mesh>
          <mesh position={[0, 0, 0.078]} material={glassMat}>
            <boxGeometry args={[0.30, 0.24, 0.018]} />
          </mesh>
          <mesh position={[0, 0, 0.068]} material={cornMat}>
            <boxGeometry args={[0.38, 0.32, 0.022]} />
          </mesh>
          <mesh position={[0, 0.26, 0]} material={zincDarkMat}>
            <boxGeometry args={[0.50, 0.052, 0.15]} />
          </mesh>
          <mesh position={[-0.18, 0.18, 0]} rotation={[0, 0, 0.5]} material={zincDarkMat}>
            <boxGeometry args={[0.24, 0.032, 0.12]} />
          </mesh>
          <mesh position={[0.18, 0.18, 0]} rotation={[0, 0, -0.5]} material={zincDarkMat}>
            <boxGeometry args={[0.24, 0.032, 0.12]} />
          </mesh>
        </group>
      ))}
      {[-0.95, 0.95].map((x, i) => (
        <group key={i} position={[x, 0.38, 0]}>
          <mesh material={stoneMat}>
            <cylinderGeometry args={[0.072, 0.085, 0.52, 8]} />
          </mesh>
          <mesh position={[0, 0.32, 0]} material={zincMat}>
            <cylinderGeometry args={[0.095, 0.072, 0.08, 8]} />
          </mesh>
          <mesh position={[0, 0.40, 0]} material={zincDarkMat}>
            <cylinderGeometry args={[0.05, 0.068, 0.10, 8]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// ── Composant principal ───────────────────────────────────────────
export default function HaussmannBuilding() {
  const buildingRef = useRef<THREE.Group>(null!)
  const mouseRef    = useRef({ x: 0, y: 0 })
  const autoRot     = useRef(0)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  useFrame((_state, delta) => {
    if (!buildingRef.current) return

    // Slow continuous auto-rotation with mouse parallax overlay
    autoRot.current += delta * 0.12

    const targetY = autoRot.current + mouseRef.current.x * (6 * Math.PI / 180)
    const targetX = -mouseRef.current.y * (2.5 * Math.PI / 180)

    buildingRef.current.rotation.y = THREE.MathUtils.lerp(
      buildingRef.current.rotation.y,
      targetY,
      0.04
    )
    buildingRef.current.rotation.x = THREE.MathUtils.lerp(
      buildingRef.current.rotation.x,
      targetX,
      0.04
    )
  })

  return (
    <group ref={buildingRef} position={[0, -2.8, 0]}>
      <group position={[0, BY.ground, 0]}>
        <GroundFloor />
      </group>
      <group position={[0, BY.f1, 0]}>
        <StandardFloor />
      </group>
      <group position={[0, BY.f2, 0]}>
        <NobleFLoor />
      </group>
      <group position={[0, BY.f3, 0]}>
        <StandardFloor />
      </group>
      <group position={[0, BY.f4, 0]}>
        <NobleFLoor />
      </group>
      <group position={[0, BY.roof, 0]}>
        <MansardRoof />
      </group>
    </group>
  )
}
