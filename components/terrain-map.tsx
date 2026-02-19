"use client"

import { useRef, useMemo, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  OrbitControls,
  Environment,
  Html,
  Text,
} from "@react-three/drei"
import * as THREE from "three"
import { createNoise2D } from "simplex-noise"

// Points of interest on the map
const POIs = [
  {
    id: "alto-bandera",
    name: "Alto de la Bandera",
    elevation: "2,842 m",
    description: "Punto mas alto del parque y una de las cimas principales de la Cordillera Central.",
    position: [0.2, 1.8, -0.3] as [number, number, number],
  },
  {
    id: "piramide",
    name: "La Piramide",
    elevation: "2,367 m",
    description: "Monumento geodesico que marca el centro geografico de la isla.",
    position: [-1.2, 1.3, 0.8] as [number, number, number],
  },
  {
    id: "rio-nizao",
    name: "Nacimiento Rio Nizao",
    elevation: "1,800 m",
    description: "Origen del rio mas importante para el abastecimiento de agua de Santo Domingo.",
    position: [1.5, 0.8, 1.2] as [number, number, number],
  },
  {
    id: "valle-central",
    name: "Valle de Constanza",
    elevation: "1,200 m",
    description: "El valle intramontano mas alto del Caribe, conocido por su agricultura de altura.",
    position: [-1.8, 0.5, -1.5] as [number, number, number],
  },
]

function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null)

  const { geometry, colorAttribute } = useMemo(() => {
    const noise2D = createNoise2D()
    const size = 8
    const segments = 200
    const geo = new THREE.PlaneGeometry(size, size, segments, segments)
    geo.rotateX(-Math.PI / 2)

    const positions = geo.attributes.position
    const colors = new Float32Array(positions.count * 3)

    // Create terrain that resembles a mountain range with a central plateau
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const z = positions.getZ(i)

      // Multiple octaves of noise for realistic terrain
      let height = 0

      // Base mountain shape - central ridge
      const distFromCenter = Math.sqrt(x * x + z * z)
      const centralRidge = Math.max(0, 1.5 - distFromCenter * 0.35)

      // Large features
      height += noise2D(x * 0.3, z * 0.3) * 0.8
      // Medium features
      height += noise2D(x * 0.7, z * 0.7) * 0.4
      // Small details
      height += noise2D(x * 1.5, z * 1.5) * 0.15
      // Fine detail
      height += noise2D(x * 3, z * 3) * 0.05

      // Combine with central ridge
      height = height * 0.5 + centralRidge * 1.2

      // Create a plateau effect in the center
      const plateauFactor = Math.max(0, 1 - distFromCenter * 0.5)
      if (height > 0.8 && plateauFactor > 0.3) {
        height = 0.8 + (height - 0.8) * 0.4 + plateauFactor * 0.3
      }

      // Add valley cuts
      const valleyNoise = noise2D(x * 0.5 + 5, z * 0.5 + 5)
      if (valleyNoise > 0.3) {
        height -= (valleyNoise - 0.3) * 0.3
      }

      // Ensure edges slope down
      const edgeFactor = Math.max(
        Math.abs(x) / (size / 2),
        Math.abs(z) / (size / 2)
      )
      height *= Math.max(0, 1 - edgeFactor * edgeFactor)

      positions.setY(i, Math.max(height * 1.2, -0.1))

      // Color based on elevation
      const normalizedHeight = Math.max(0, height) / 1.8
      const color = new THREE.Color()

      if (normalizedHeight < 0.15) {
        // Low valleys - dark green
        color.setRGB(0.12, 0.25, 0.1)
      } else if (normalizedHeight < 0.35) {
        // Forest - rich green
        const t = (normalizedHeight - 0.15) / 0.2
        color.setRGB(
          0.12 + t * 0.05,
          0.25 + t * 0.15,
          0.1 + t * 0.05
        )
      } else if (normalizedHeight < 0.55) {
        // Pine forest - medium green
        const t = (normalizedHeight - 0.35) / 0.2
        color.setRGB(
          0.17 + t * 0.08,
          0.4 - t * 0.05,
          0.15 + t * 0.02
        )
      } else if (normalizedHeight < 0.75) {
        // Highland - golden-green
        const t = (normalizedHeight - 0.55) / 0.2
        color.setRGB(
          0.25 + t * 0.15,
          0.35 - t * 0.05,
          0.17 - t * 0.02
        )
      } else {
        // Summit - pale brown/grey
        const t = Math.min(1, (normalizedHeight - 0.75) / 0.25)
        color.setRGB(
          0.4 + t * 0.15,
          0.3 + t * 0.12,
          0.15 + t * 0.15
        )
      }

      // Add subtle variation
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
    <mesh ref={meshRef} geometry={geometry} receiveShadow castShadow>
      <meshStandardMaterial
        vertexColors
        roughness={0.85}
        metalness={0.05}
        flatShading={false}
      />
    </mesh>
  )
}

function POIMarker({
  poi,
  isActive,
  onClick,
}: {
  poi: (typeof POIs)[0]
  isActive: boolean
  onClick: () => void
}) {
  const markerRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (markerRef.current) {
      markerRef.current.position.y =
        poi.position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05
    }
  })

  return (
    <group
      ref={markerRef}
      position={poi.position}
    >
      {/* Pin */}
      <mesh onClick={onClick}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color={isActive ? "#8fbc5a" : "#5a9a3a"}
          emissive={isActive ? "#8fbc5a" : "#3a6a2a"}
          emissiveIntensity={isActive ? 0.5 : 0.2}
        />
      </mesh>
      {/* Vertical line */}
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.4, 8]} />
        <meshStandardMaterial color="#8fbc5a" opacity={0.6} transparent />
      </mesh>
      {/* Label */}
      <Html
        position={[0, 0.2, 0]}
        center
        distanceFactor={6}
        style={{ pointerEvents: "none" }}
      >
        <div
          className={`whitespace-nowrap rounded-md px-2 py-1 text-center text-[10px] font-medium backdrop-blur-sm transition-all ${isActive
            ? "bg-primary/90 text-primary-foreground"
            : "bg-card/80 text-foreground"
            }`}
        >
          {poi.name}
        </div>
      </Html>
    </group>
  )
}

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
      <meshStandardMaterial
        color="#c8dcc0"
        transparent
        opacity={0.08}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  )
}

function CompassRose() {
  return (
    <group position={[3.2, 0.1, 3.2]}>
      <Text
        position={[0, 0.1, -0.3]}
        fontSize={0.15}
        color="#8fbc5a"
        anchorX="center"
        anchorY="middle"
      >
        N
      </Text>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.15, 0.18, 32]} />
        <meshStandardMaterial color="#8fbc5a" opacity={0.4} transparent />
      </mesh>
    </group>
  )
}

function Scene({
  activePOI,
  setActivePOI,
}: {
  activePOI: string | null
  setActivePOI: (id: string | null) => void
}) {
  return (
    <>
      <Environment preset="forest" />
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 3]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-3, 5, -3]} intensity={0.3} color="#b8d8a8" />

      <Terrain />
      <MistLayer />
      <CompassRose />

      {POIs.map((poi) => (
        <POIMarker
          key={poi.id}
          poi={poi}
          isActive={activePOI === poi.id}
          onClick={() => setActivePOI(activePOI === poi.id ? null : poi.id)}
        />
      ))}

      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={3}
        maxDistance={12}
        minPolarAngle={Math.PI * 0.1}
        maxPolarAngle={Math.PI * 0.45}
        autoRotate
        autoRotateSpeed={0.3}
        target={[0, 0.5, 0]}
      />
    </>
  )
}

export function TerrainMap() {
  const [activePOI, setActivePOI] = useState<string | null>(null)
  const activePOIData = POIs.find((p) => p.id === activePOI)

  return (
    <section id="mapa" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Mapa Interactivo
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">
            Explora el Terreno
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Navega por el relieve tridimensional del parque. Arrastra para rotar,
            desplaza la rueda para acercar y haz clic en los puntos de interes
            para descubrir mas.
          </p>
        </div>

        <div className="relative mt-10 overflow-hidden rounded-2xl border border-border bg-card">
          {/* 3D Canvas */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
            <Canvas
              shadows
              camera={{ position: [4, 5, 6], fov: 45 }}
              dpr={[1, 2]}
            >
              <Scene activePOI={activePOI} setActivePOI={setActivePOI} />
            </Canvas>

            {/* Legend overlay */}
            <div className="absolute bottom-4 left-4 rounded-lg border border-border bg-card/90 p-3 backdrop-blur-sm">
              <p className="mb-2 text-xs font-semibold text-foreground">
                Elevacion
              </p>
              <div className="flex items-center gap-1">
                <div className="h-3 w-6 rounded-sm" style={{ backgroundColor: "rgb(31, 64, 26)" }} />
                <div className="h-3 w-6 rounded-sm" style={{ backgroundColor: "rgb(44, 102, 38)" }} />
                <div className="h-3 w-6 rounded-sm" style={{ backgroundColor: "rgb(64, 89, 43)" }} />
                <div className="h-3 w-6 rounded-sm" style={{ backgroundColor: "rgb(102, 77, 38)" }} />
                <div className="h-3 w-6 rounded-sm" style={{ backgroundColor: "rgb(140, 107, 77)" }} />
              </div>
              <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                <span>1,200 m</span>
                <span>2,842 m</span>
              </div>
            </div>

            {/* Controls hint */}
            <div className="absolute right-4 top-4 rounded-lg border border-border bg-card/90 px-3 py-2 backdrop-blur-sm">
              <p className="text-[10px] text-muted-foreground">
                Clic + arrastrar para rotar
              </p>
            </div>
          </div>

          {/* POI info panel */}
          {activePOIData && (
            <div className="border-t border-border bg-secondary/30 p-4 lg:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-serif text-lg font-bold text-foreground">
                    {activePOIData.name}
                  </h4>
                  <p className="mt-0.5 text-sm text-primary">
                    {activePOIData.elevation}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {activePOIData.description}
                  </p>
                </div>
                <button
                  onClick={() => setActivePOI(null)}
                  className="shrink-0 rounded-md border border-border px-3 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}

          {/* POI list */}
          <div className="grid grid-cols-2 border-t border-border md:grid-cols-4">
            {POIs.map((poi) => (
              <button
                key={poi.id}
                onClick={() => setActivePOI(poi.id)}
                className={`flex flex-col items-center gap-1 border-r border-border px-3 py-4 text-center transition-all last:border-r-0 hover:bg-secondary/30 ${activePOI === poi.id ? "bg-secondary/50" : ""
                  }`}
              >
                <span className="text-xs font-semibold text-foreground">
                  {poi.name}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {poi.elevation}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
