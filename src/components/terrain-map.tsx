"use client"

import { useRef, useMemo, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Html, Text } from "@react-three/drei"
import * as THREE from "three"
import { createNoise2D } from "simplex-noise"
import terrainData from "../data/terrain-map.json"

// =============================
// Helper → terrain height sample
// =============================
function getTerrainHeightAt(
  geometry: THREE.BufferGeometry,
  x: number,
  z: number,
  size: number,
  segments: number,
) {
  const positions = geometry.attributes.position as THREE.BufferAttribute

  const half = size / 2
  const step = size / segments

  const cx = THREE.MathUtils.clamp(x, -half, half)
  const cz = THREE.MathUtils.clamp(z, -half, half)

  const gx = (cx + half) / step
  const gz = (cz + half) / step

  const x0 = Math.floor(gx)
  const z0 = Math.floor(gz)
  const x1 = Math.min(x0 + 1, segments)
  const z1 = Math.min(z0 + 1, segments)

  const tx = gx - x0
  const tz = gz - z0

  const row = segments + 1
  const idx = (xi: number, zi: number) => zi * row + xi

  const y00 = positions.getY(idx(x0, z0))
  const y10 = positions.getY(idx(x1, z0))
  const y01 = positions.getY(idx(x0, z1))
  const y11 = positions.getY(idx(x1, z1))

  const y0 = THREE.MathUtils.lerp(y00, y10, tx)
  const y1 = THREE.MathUtils.lerp(y01, y11, tx)
  return THREE.MathUtils.lerp(y0, y1, tz)
}

// =============================
// POIs
// =============================
const POIs = terrainData.pois.map(poi => ({
  ...poi,
  position: poi.position as [number, number, number]
}))

// =============================
// Terrain
// =============================
function Terrain({ terrainRef }: { terrainRef: React.RefObject<THREE.Mesh> }) {
  const { geometry, colorAttribute } = useMemo(() => {
    const noise2D = createNoise2D()
    const size = 8
    const segments = 200
    const geo = new THREE.PlaneGeometry(size, size, segments, segments)
    geo.rotateX(-Math.PI / 2)

    const positions = geo.attributes.position
    const colors = new Float32Array(positions.count * 3)

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const z = positions.getZ(i)

      let height = 0
      const distFromCenter = Math.sqrt(x * x + z * z)
      const centralRidge = Math.max(0, 1.5 - distFromCenter * 0.35)

      height += noise2D(x * 0.3, z * 0.3) * 0.8
      height += noise2D(x * 0.7, z * 0.7) * 0.4
      height += noise2D(x * 1.5, z * 1.5) * 0.15
      height += noise2D(x * 3, z * 3) * 0.05

      height = height * 0.5 + centralRidge * 1.2

      const plateauFactor = Math.max(0, 1 - distFromCenter * 0.5)
      if (height > 0.8 && plateauFactor > 0.3) {
        height = 0.8 + (height - 0.8) * 0.4 + plateauFactor * 0.3
      }

      const valleyNoise = noise2D(x * 0.5 + 5, z * 0.5 + 5)
      if (valleyNoise > 0.3) height -= (valleyNoise - 0.3) * 0.3

      const edgeFactor = Math.max(Math.abs(x) / (size / 2), Math.abs(z) / (size / 2))
      height *= Math.max(0, 1 - edgeFactor * edgeFactor)

      positions.setY(i, Math.max(height * 1.2, -0.1))

      const normalizedHeight = Math.max(0, height) / 1.8
      const color = new THREE.Color()

      if (normalizedHeight < 0.15) color.setRGB(0.12, 0.25, 0.1)
      else if (normalizedHeight < 0.35) {
        const t = (normalizedHeight - 0.15) / 0.2
        color.setRGB(0.12 + t * 0.05, 0.25 + t * 0.15, 0.1 + t * 0.05)
      } else if (normalizedHeight < 0.55) {
        const t = (normalizedHeight - 0.35) / 0.2
        color.setRGB(0.17 + t * 0.08, 0.4 - t * 0.05, 0.15 + t * 0.02)
      } else if (normalizedHeight < 0.75) {
        const t = (normalizedHeight - 0.55) / 0.2
        color.setRGB(0.25 + t * 0.15, 0.35 - t * 0.05, 0.17 - t * 0.02)
      } else {
        const t = Math.min(1, (normalizedHeight - 0.75) / 0.25)
        color.setRGB(0.4 + t * 0.15, 0.3 + t * 0.12, 0.15 + t * 0.15)
      }

      const variation = noise2D(x * 5, z * 5) * 0.03
      colors[i * 3] = Math.max(0, Math.min(1, color.r + variation))
      colors[i * 3 + 1] = Math.max(0, Math.min(1, color.g + variation))
      colors[i * 3 + 2] = Math.max(0, Math.min(1, color.b + variation))
    }

    geo.computeVertexNormals()
    const colorAttr = new THREE.BufferAttribute(colors, 3)
    return { geometry: geo, colorAttribute: colorAttr }
  }, [])

  geometry.setAttribute("color", colorAttribute)

  return (
    <mesh ref={terrainRef} geometry={geometry} receiveShadow castShadow>
      <meshStandardMaterial vertexColors roughness={0.85} metalness={0.05} />
    </mesh>
  )
}

// =============================
// POI marker
// =============================
function POIMarker({
  poi,
  isActive,
  onClick,
  terrainRef,
}: {
  poi: (typeof POIs)[0]
  isActive: boolean
  onClick: () => void
  terrainRef: React.RefObject<THREE.Mesh>
}) {
  const markerRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!markerRef.current) return

    const hover = Math.sin(state.clock.elapsedTime * 2) * 0.05
    const mesh = terrainRef.current

    if (mesh?.geometry) {
      const y = getTerrainHeightAt(mesh.geometry, poi.position[0], poi.position[2], 8, 200)
      markerRef.current.position.set(poi.position[0], y + 0.12 + hover, poi.position[2])
    }
  })

  return (
    <group ref={markerRef} position={poi.position}>
      <mesh onClick={onClick}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={isActive ? "#8fbc5a" : "#5a9a3a"}
          emissive={isActive ? "#8fbc5a" : "#3a6a2a"}
          emissiveIntensity={isActive ? 0.5 : 0.2}
        />
      </mesh>

      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.4, 8]} />
        <meshStandardMaterial color="#8fbc5a" opacity={0.6} transparent />
      </mesh>

      <Html position={[0, 0.2, 0]} center distanceFactor={6} style={{ pointerEvents: "none" }}>
        <div className={`whitespace-nowrap rounded-md px-2 py-1 text-center text-[10px] font-medium backdrop-blur-sm transition-all ${isActive ? "bg-primary/90 text-primary-foreground" : "bg-card/80 text-foreground"}`}>
          {poi.name}
        </div>
      </Html>
    </group>
  )
}

// =============================
function MistLayer() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = 0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
      const material = meshRef.current.material as THREE.MeshStandardMaterial
      material.opacity = 0.08 + Math.sin(state.clock.elapsedTime * 0.3) * 0.03
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.3, 0]}>
      <planeGeometry args={[8, 8]} />
      <meshStandardMaterial color="#c8dcc0" transparent opacity={0.08} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  )
}

function CompassRose() {
  return (
    <group position={[3.2, 0.1, 3.2]}>
      <Text position={[0, 0.1, -0.3]} fontSize={0.15} color="#8fbc5a" anchorX="center" anchorY="middle">N</Text>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.15, 0.18, 32]} />
        <meshStandardMaterial color="#8fbc5a" opacity={0.4} transparent />
      </mesh>
    </group>
  )
}

// =============================
function Scene({ activePOI, setActivePOI }: { activePOI: string | null; setActivePOI: (id: string | null) => void }) {
  const terrainRef = useRef<THREE.Mesh>(null)

  return (
    <>
      <Environment preset="forest" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 3]} intensity={1.2} castShadow />
      <directionalLight position={[-3, 5, -3]} intensity={0.3} color="#b8d8a8" />

      <Terrain terrainRef={terrainRef} />
      <MistLayer />
      <CompassRose />

      {POIs.map((poi) => (
        <POIMarker
          key={poi.id}
          poi={poi}
          isActive={activePOI === poi.id}
          onClick={() => setActivePOI(activePOI === poi.id ? null : poi.id)}
          terrainRef={terrainRef}
        />
      ))}

      <OrbitControls enablePan enableZoom enableRotate minDistance={3} maxDistance={12} minPolarAngle={Math.PI * 0.1} maxPolarAngle={Math.PI * 0.45} autoRotate autoRotateSpeed={0.3} target={[0, 0.5, 0]} />
    </>
  )
}

// =============================
export function TerrainMap() {
  const [activePOI, setActivePOI] = useState<string | null>(null)
  const activePOIData = POIs.find((p) => p.id === activePOI)

  return (
    <section id="mapa" className="relative py-24 lg:py-32">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary text-center">
        EXPLORA
      </p>

      <h2 className="mb-8 text-center font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl text-balance">
        Mapa Interactivo
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-center text-lg text-muted-foreground leading-relaxed">
        Explora el terreno del Parque Nacional Valle Nuevo. Puedes ver una representación estilizada del terreno, con colinas, valles y mesetas.
      </p>
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative mt-10 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
            <Canvas shadows camera={{ position: [4, 5, 6], fov: 45 }} dpr={[1, 2]}>
              <Scene activePOI={activePOI} setActivePOI={setActivePOI} />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  )
}
