import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface HaussmannBuildingProps {
  progressRef: React.MutableRefObject<number>
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

// ── Constantes proportions réalistes ──────────────────────────────
// Immeuble étroit et haut (rapport 1:3 environ), 5 étages + toit
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
// La pierre de taille parisienne : calcaire clair, légèrement crème
const stoneMat = new THREE.MeshPhysicalMaterial({
  color: '#E2D9C8',
  roughness: 0.82,
  metalness: 0.0,
  clearcoat: 0.05,
  clearcoatRoughness: 0.5,
})
// Corniches et encadrements : pierre légèrement plus claire
const cornMat = new THREE.MeshPhysicalMaterial({
  color: '#EDE5D4',
  roughness: 0.75,
  metalness: 0.0,
})
// Pierre rustiquée RDC
const rustMat = new THREE.MeshPhysicalMaterial({
  color: '#D4CAB8',
  roughness: 0.90,
  metalness: 0.0,
})
// Verre : sombre, légèrement emissif (lumières intérieures)
const glassMat = new THREE.MeshPhysicalMaterial({
  color: '#1C2840',
  emissive: '#253A5E',
  emissiveIntensity: 0.6,
  roughness: 0.05,
  metalness: 0.1,
  transparent: true,
  opacity: 0.92,
})
// Imposte (verre au-dessus porte cochère)
const imposteMat = new THREE.MeshPhysicalMaterial({
  color: '#1C2840',
  emissive: '#2A4570',
  emissiveIntensity: 0.8,
  roughness: 0.02,
  metalness: 0.05,
  transparent: true,
  opacity: 0.75,
})
// Fer forgé : laiton/or foncé (balcons)
const ironMat = new THREE.MeshStandardMaterial({
  color: '#7A5E2A',
  roughness: 0.3,
  metalness: 0.92,
})
// Zinc toit : gris-bleu métallique
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
// Bois de la porte cochère
const doorMat = new THREE.MeshStandardMaterial({
  color: '#1E1008',
  roughness: 0.85,
  metalness: 0.05,
})

// ── Sous-composants ───────────────────────────────────────────────

/**
 * Fenêtre haute à la française : encadrement saillant + verre + appui
 * proportions réalistes (2× plus haute que large)
 */
function TallWindow({ x, y }: { x: number; y: number }) {
  const ww = 0.38  // largeur fenêtre
  const wh = 0.62  // hauteur fenêtre (haute et fine)
  const fz = D / 2 + 0.005
  return (
    <group position={[x, y, 0]}>
      {/* Encadrement en relief */}
      <mesh material={cornMat} position={[0, 0, fz - 0.01]}>
        <boxGeometry args={[ww + 0.07, wh + 0.08, 0.055]} />
      </mesh>
      {/* Verre */}
      <mesh material={glassMat} position={[0, 0, fz + 0.025]}>
        <boxGeometry args={[ww, wh, 0.02]} />
      </mesh>
      {/* Traverse médiane (croisée) */}
      <mesh material={cornMat} position={[0, 0, fz + 0.03]}>
        <boxGeometry args={[ww + 0.02, 0.022, 0.012]} />
      </mesh>
      {/* Appui de fenêtre saillant */}
      <mesh material={cornMat} position={[0, -wh / 2 - 0.024, fz + 0.018]}>
        <boxGeometry args={[ww + 0.14, 0.038, 0.10]} />
      </mesh>
      {/* Linteau */}
      <mesh material={cornMat} position={[0, wh / 2 + 0.022, fz + 0.01]}>
        <boxGeometry args={[ww + 0.10, 0.032, 0.07]} />
      </mesh>
    </group>
  )
}

/**
 * Balcon filant avec balustrade en fer forgé
 * Utilisé pour l'étage noble (f2) et le 5e (f4)
 */
function FilantBalcony({ count = 26 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const geo = useMemo(() => new THREE.BoxGeometry(0.032, 0.20, 0.032), [])
  const bz = D / 2 + 0.22  // saillie du balcon

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
      {/* Dalle balcon (pierre fine) */}
      <mesh material={cornMat} position={[0, -0.36, D / 2 + 0.14]}>
        <boxGeometry args={[W + 0.22, 0.045, 0.28]} />
      </mesh>
      {/* Retours latéraux */}
      <mesh material={cornMat} position={[-W / 2 - 0.11, -0.18, D / 2 + 0.14]}>
        <boxGeometry args={[0.045, 0.22, 0.28]} />
      </mesh>
      <mesh material={cornMat} position={[W / 2 + 0.11, -0.18, D / 2 + 0.14]}>
        <boxGeometry args={[0.045, 0.22, 0.28]} />
      </mesh>
      {/* Rail horizontal supérieur */}
      <mesh material={ironMat} position={[0, -0.13, bz]}>
        <boxGeometry args={[W + 0.22, 0.038, 0.048]} />
      </mesh>
      {/* Rail médian */}
      <mesh material={ironMat} position={[0, -0.23, bz]}>
        <boxGeometry args={[W + 0.22, 0.022, 0.030]} />
      </mesh>
      {/* Balusters instanciés */}
      <instancedMesh ref={meshRef} args={[geo, ironMat, count]} />
    </group>
  )
}

/**
 * Balconnet individuel (plus petit, sous chaque fenêtre)
 * Utilisé pour f1, f3
 */
function SmallBalcony({ x }: { x: number }) {
  const bw = 0.54  // largeur balconnet
  const bz = D / 2 + 0.14

  return (
    <group position={[x, -0.33, 0]}>
      {/* Petite dalle */}
      <mesh material={cornMat} position={[0, 0, D / 2 + 0.09]}>
        <boxGeometry args={[bw, 0.035, 0.20]} />
      </mesh>
      {/* Rail */}
      <mesh material={ironMat} position={[0, 0.08, bz]}>
        <boxGeometry args={[bw, 0.030, 0.035]} />
      </mesh>
      {/* 4 balusters */}
      {[-0.18, -0.06, 0.06, 0.18].map((bx, i) => (
        <mesh key={i} material={ironMat} position={[bx, 0.00, bz]}>
          <boxGeometry args={[0.026, 0.15, 0.026]} />
        </mesh>
      ))}
    </group>
  )
}

// ── Rez-de-chaussée ───────────────────────────────────────────────
function GroundFloor() {
  return (
    <group>
      {/* Façade rustiquée (appareil en bossage) */}
      <mesh material={rustMat}>
        <boxGeometry args={[W, GH, D]} />
      </mesh>
      {/* Joints de refend horizontaux */}
      {[-0.30, -0.14, 0.02, 0.18, 0.34].map((y, i) => (
        <mesh key={i} position={[0, y, D / 2 + 0.001]} material={rustMat}>
          <boxGeometry args={[W, 0.014, 0.005]} />
        </mesh>
      ))}

      {/* ─ Porte cochère centrale ─ */}
      {/* Soubassement de la porte */}
      <mesh position={[0, -0.02, 0.008]} material={rustMat}>
        <boxGeometry args={[0.82, GH - 0.06, D + 0.016]} />
      </mesh>
      {/* Piédroit gauche */}
      <mesh position={[-0.38, 0.0, D / 2 + 0.018]} material={cornMat}>
        <boxGeometry args={[0.10, GH - 0.05, 0.07]} />
      </mesh>
      {/* Piédroit droit */}
      <mesh position={[0.38, 0.0, D / 2 + 0.018]} material={cornMat}>
        <boxGeometry args={[0.10, GH - 0.05, 0.07]} />
      </mesh>
      {/* Vantaux de porte */}
      <mesh position={[-0.15, -0.12, D / 2 + 0.012]} material={doorMat}>
        <boxGeometry args={[0.27, 0.58, 0.028]} />
      </mesh>
      <mesh position={[0.15, -0.12, D / 2 + 0.012]} material={doorMat}>
        <boxGeometry args={[0.27, 0.58, 0.028]} />
      </mesh>
      {/* Arche en plein-cintre */}
      <mesh
        position={[0, 0.28, D / 2 + 0.012]}
        rotation={[Math.PI / 2, 0, 0]}
        material={cornMat}
      >
        <torusGeometry args={[0.295, 0.048, 10, 20, Math.PI]} />
      </mesh>
      {/* Imposte vitrée (demi-lune) */}
      <mesh position={[0, 0.28, D / 2 + 0.022]} material={imposteMat}>
        <cylinderGeometry args={[0.242, 0.242, 0.018, 16, 1, false, 0, Math.PI]} />
      </mesh>
      {/* Clé de voûte */}
      <mesh position={[0, 0.576, D / 2 + 0.008]} material={cornMat}>
        <boxGeometry args={[0.075, 0.085, 0.055]} />
      </mesh>
      {/* Marches */}
      <mesh position={[0, -0.455, D / 2 + 0.10]} material={cornMat}>
        <boxGeometry args={[0.88, 0.038, 0.20]} />
      </mesh>

      {/* ─ Fenêtres latérales (entresol style) ─ */}
      <TallWindow x={-1.2} y={-0.02} />
      <TallWindow x={1.2} y={-0.02} />

      {/* Corniche haute */}
      <mesh position={[0, GH / 2 - CN / 2 + 0.01, 0]} material={cornMat}>
        <boxGeometry args={[W + 0.12, CN, D + 0.10]} />
      </mesh>
    </group>
  )
}

// ── Étage standard (f1, f3) ───────────────────────────────────────
function StandardFloor() {
  const wx = [-1.1, 0, 1.1]  // positions X des 3 fenêtres
  return (
    <group>
      <mesh material={stoneMat}>
        <boxGeometry args={[W, FH, D]} />
      </mesh>
      {/* Corniche haute */}
      <mesh position={[0, FH / 2 - CN / 2, 0]} material={cornMat}>
        <boxGeometry args={[W + 0.12, CN, D + 0.08]} />
      </mesh>
      {/* Moulure bas-de-dalle */}
      <mesh position={[0, -FH / 2 + 0.028, 0]} material={cornMat}>
        <boxGeometry args={[W + 0.08, 0.038, D + 0.04]} />
      </mesh>
      {/* 3 fenêtres hautes + balconnets */}
      {wx.map((x, i) => (
        <group key={i}>
          <TallWindow x={x} y={0.06} />
          <SmallBalcony x={x} />
        </group>
      ))}
    </group>
  )
}

// ── Étage noble / 5e (f2, f4) avec grand balcon filant ───────────
function NobleFLoor() {
  const wx = [-1.1, 0, 1.1]
  return (
    <group>
      <mesh material={stoneMat}>
        <boxGeometry args={[W, FH, D]} />
      </mesh>
      {/* Corniche haute plus prononcée */}
      <mesh position={[0, FH / 2 - CN / 2, 0]} material={cornMat}>
        <boxGeometry args={[W + 0.16, CN + 0.02, D + 0.12]} />
      </mesh>
      {/* Bandeau bas */}
      <mesh position={[0, -FH / 2 + 0.032, 0]} material={cornMat}>
        <boxGeometry args={[W + 0.08, 0.042, D + 0.06]} />
      </mesh>
      {/* 3 fenêtres légèrement plus hautes (étage noble) */}
      {wx.map((x, i) => (
        <TallWindow key={i} x={x} y={0.06} />
      ))}
      {/* Grand balcon filant */}
      <FilantBalcony />
    </group>
  )
}

// ── Toit mansardé ─────────────────────────────────────────────────
function MansardRoof() {
  const lx = [-1.1, 0, 1.1]  // lucarnes

  return (
    <group>
      {/* Grande corniche de couronnement */}
      <mesh position={[0, -0.34, 0]} material={cornMat}>
        <boxGeometry args={[W + 0.22, 0.10, D + 0.14]} />
      </mesh>
      {/* Corps bas mansard (pente douce) */}
      <mesh position={[0, -0.10, 0]} material={zincMat}>
        <boxGeometry args={[W + 0.14, 0.46, D + 0.08]} />
      </mesh>
      {/* Corps haut mansard (pente raide, légèrement en retrait) */}
      <mesh position={[0, 0.26, 0]} material={zincDarkMat}>
        <boxGeometry args={[W - 0.08, 0.38, D - 0.02]} />
      </mesh>
      {/* Faîtage */}
      <mesh position={[0, 0.48, 0]} material={zincDarkMat}>
        <boxGeometry args={[W - 0.16, 0.05, D - 0.06]} />
      </mesh>

      {/* ─ Lucarnes (chiens-assis) ─ */}
      {lx.map((x, i) => (
        <group key={i} position={[x, 0.12, D / 2 + 0.06]}>
          {/* Corps lucarne */}
          <mesh material={zincMat}>
            <boxGeometry args={[0.44, 0.36, 0.14]} />
          </mesh>
          {/* Fenêtre lucarne */}
          <mesh position={[0, 0, 0.078]} material={glassMat}>
            <boxGeometry args={[0.30, 0.24, 0.018]} />
          </mesh>
          {/* Encadrement fenêtre */}
          <mesh position={[0, 0, 0.068]} material={cornMat}>
            <boxGeometry args={[0.38, 0.32, 0.022]} />
          </mesh>
          {/* Fronton triangulaire (approximé en zinc) */}
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

      {/* ─ Cheminées ─ */}
      {[-0.95, 0.95].map((x, i) => (
        <group key={i} position={[x, 0.38, 0]}>
          {/* Fût */}
          <mesh material={stoneMat}>
            <cylinderGeometry args={[0.072, 0.085, 0.52, 8]} />
          </mesh>
          {/* Couronnement */}
          <mesh position={[0, 0.32, 0]} material={zincMat}>
            <cylinderGeometry args={[0.095, 0.072, 0.08, 8]} />
          </mesh>
          {/* Mitron */}
          <mesh position={[0, 0.40, 0]} material={zincDarkMat}>
            <cylinderGeometry args={[0.05, 0.068, 0.10, 8]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

// ── Composant principal ───────────────────────────────────────────
export default function HaussmannBuilding({ progressRef }: HaussmannBuildingProps) {
  const buildingRef = useRef<THREE.Group>(null!)
  const groundRef   = useRef<THREE.Group>(null!)
  const f1Ref       = useRef<THREE.Group>(null!)
  const f2Ref       = useRef<THREE.Group>(null!)
  const f3Ref       = useRef<THREE.Group>(null!)
  const f4Ref       = useRef<THREE.Group>(null!)
  const roofRef     = useRef<THREE.Group>(null!)

  const mouseRef  = useRef({ x: 0, y: 0 })
  const autoRot   = useRef(0)
  const currentY  = useRef({ ...BY })

  // Mouse parallax — dans useEffect uniquement
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  useFrame(() => {
    if (!buildingRef.current) return
    const p = progressRef.current

    // ── Phases de décomposition
    const s1    = smoothstep(0.14, 0.28, p)
    const s2    = smoothstep(0.28, 0.42, p)
    const s3    = smoothstep(0.42, 0.56, p)
    const s4    = smoothstep(0.56, 0.70, p)
    const reasm = smoothstep(0.75, 0.98, p)
    const maxS  = Math.max(s1, s2, s3, s4)

    // ── Positions Y cibles
    const tRoof = BY.roof + (1 - reasm) * maxS * 3.8
    const tF4   = BY.f4   + (1 - reasm) * maxS * 2.6
    const tF3   = BY.f3   + (1 - reasm) * Math.max(s2, s3, s4) * 1.7
    const tF2   = BY.f2   + (1 - reasm) * Math.max(s3, s4) * 1.05
    const tF1   = BY.f1   + (1 - reasm) * s4 * 0.55

    // ── Lerp doux (cinématique)
    const LF = 0.06
    const cy = currentY.current
    cy.roof = THREE.MathUtils.lerp(cy.roof, tRoof, LF)
    cy.f4   = THREE.MathUtils.lerp(cy.f4,   tF4,   LF)
    cy.f3   = THREE.MathUtils.lerp(cy.f3,   tF3,   LF)
    cy.f2   = THREE.MathUtils.lerp(cy.f2,   tF2,   LF)
    cy.f1   = THREE.MathUtils.lerp(cy.f1,   tF1,   LF)

    if (roofRef.current) roofRef.current.position.y = cy.roof
    if (f4Ref.current)   f4Ref.current.position.y   = cy.f4
    if (f3Ref.current)   f3Ref.current.position.y   = cy.f3
    if (f2Ref.current)   f2Ref.current.position.y   = cy.f2
    if (f1Ref.current)   f1Ref.current.position.y   = cy.f1

    // ── Rotation auto dans la phase hero, puis parallaxe souris
    if (p < 0.12) {
      autoRot.current += 0.0018
      buildingRef.current.rotation.y = autoRot.current
    } else {
      const tRotY = mouseRef.current.x * (6 * Math.PI / 180)
      const tRotX = -mouseRef.current.y * (2.5 * Math.PI / 180)
      buildingRef.current.rotation.y = THREE.MathUtils.lerp(
        buildingRef.current.rotation.y, tRotY, 0.035
      )
      buildingRef.current.rotation.x = THREE.MathUtils.lerp(
        buildingRef.current.rotation.x, tRotX, 0.035
      )
    }
  })

  return (
    // Centrage vertical : pousse le bas du bâtiment à y≈-2.5 dans la vue
    <group ref={buildingRef} position={[0, -2.8, 0]}>
      <group ref={groundRef} position={[0, BY.ground, 0]}>
        <GroundFloor />
      </group>
      <group ref={f1Ref} position={[0, BY.f1, 0]}>
        <StandardFloor />
      </group>
      <group ref={f2Ref} position={[0, BY.f2, 0]}>
        <NobleFLoor />
      </group>
      <group ref={f3Ref} position={[0, BY.f3, 0]}>
        <StandardFloor />
      </group>
      <group ref={f4Ref} position={[0, BY.f4, 0]}>
        <NobleFLoor />
      </group>
      <group ref={roofRef} position={[0, BY.roof, 0]}>
        <MansardRoof />
      </group>
    </group>
  )
}
