"use client"

import { useState } from "react"
import Image from "next/image"
import { TreePine, Cloud, Flower2, Waves } from "lucide-react"

const ecosystems = [
  {
    id: "pinos",
    title: "Bosque de Pinos",
    subtitle: "Pinus occidentalis",
    icon: TreePine,
    image: "/images/pine-forest.jpg",
    elevation: "1,500 - 2,800 m",
    description:
      "El bosque de Pinus occidentalis es el ecosistema dominante de Valle Nuevo. Estos pinos endemicos de La Hispaniola forman densos rodales que cubren las laderas de la Cordillera Central, alcanzando alturas de hasta 30 metros. El sotobosque alberga helechos arborescentes, musgos y una rica comunidad de epifitas.",
    facts: [
      "Especie endemica de La Hispaniola",
      "Adaptado a suelos acidos y pobres",
      "Resistente a incendios forestales",
      "Habitat critico para aves endemicas",
    ],
  },
  {
    id: "nublado",
    title: "Bosque Nublado",
    subtitle: "Cloud Forest",
    icon: Cloud,
    image: "/images/cloud-forest.jpg",
    elevation: "1,800 - 2,500 m",
    description:
      "Los bosques nublados de Valle Nuevo se encuentran en las zonas mas humedas, donde la niebla persistente crea un ambiente saturado de humedad. Las ramas de los arboles estan cubiertas de musgos, liquenes y bromelias, formando jardines aereos que capturan el agua de las nubes y la canalizan hacia el suelo.",
    facts: [
      "Captacion de agua por niebla",
      "Alta diversidad de epifitas",
      "Temperatura promedio de 12°C",
      "Ecosistema extremadamente fragil",
    ],
  },
  {
    id: "paramo",
    title: "Paramo de Altura",
    subtitle: "Sabana de Pajones",
    icon: Flower2,
    image: "/images/panoramic-valley.jpg",
    elevation: "2,200 - 2,842 m",
    description:
      "El paramo de Valle Nuevo es unico en las Antillas: extensas sabanas de pajones (Danthonia domingensis) se extienden sobre las mesetas a mas de 2,200 metros. Al amanecer, la escarcha cubre el paisaje creando una estampa irreal. Este ecosistema alberga especies de plantas endemicas adaptadas al frio y la radiacion UV intensa.",
    facts: [
      "Unico paramo antillano",
      "Heladas frecuentes bajo 0°C",
      "Danthonia domingensis dominante",
      "Suelos volcanicos antiguos",
    ],
  },
  {
    id: "rios",
    title: "Ecosistemas Fluviales",
    subtitle: "Nacimientos de Rios",
    icon: Waves,
    image: "/images/river-watershed.jpg",
    elevation: "1,200 - 2,200 m",
    description:
      "Valle Nuevo es la mayor fabrica de agua de la Republica Dominicana. De sus montanas nacen los rios Nizao, Ocoa, Las Cuevas y Blanco, cuyas aguas cristalinas descienden por cascadas y arroyos de montana, sustentando ecosistemas acuaticos unicos con especies de peces y crustaceos endemicos.",
    facts: [
      "4 cuencas hidrograficas principales",
      "Abastece millones de personas",
      "Aguas extremadamente puras",
      "Especies acuaticas endemicas",
    ],
  },
]

export function EcosystemsSection() {
  const [active, setActive] = useState("pinos")
  const current = ecosystems.find((e) => e.id === active)!

  return (
    <section id="ecosistemas" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Ecosistemas
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">
            Cuatro Mundos en Una Montana
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Desde los bosques de pinos hasta el paramo de altura, Valle Nuevo
            alberga una gradiente ecologica fascinante donde cada piso altitudinal
            revela un ecosistema distinto.
          </p>
        </div>

        {/* Ecosystem tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {ecosystems.map((eco) => {
            const Icon = eco.icon
            return (
              <button
                key={eco.id}
                onClick={() => setActive(eco.id)}
                className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
                  active === eco.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{eco.title}</span>
                <span className="sm:hidden">{eco.title.split(" ")[0]}</span>
              </button>
            )
          })}
        </div>

        {/* Active ecosystem display */}
        <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-auto lg:min-h-[480px]">
            <Image
              src={current.image}
              alt={current.title}
              fill
              className="object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
              <span className="rounded-md bg-primary/20 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                {current.elevation}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs font-medium uppercase tracking-widest text-primary">
              {current.subtitle}
            </p>
            <h3 className="mt-2 font-serif text-2xl font-bold text-foreground lg:text-3xl">
              {current.title}
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {current.description}
            </p>

            {/* Facts */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {current.facts.map((fact, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-border bg-card/50 p-3"
                >
                  <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <p className="text-sm text-foreground">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
