"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Droplets } from "lucide-react"

const rivers = [
  {
    name: "R铆o Nizao",
    description: "Abastece la presa de Valdesia y suministra agua a Santo Domingo y San Crist贸bal.",
    population: "3.5 millones",
  },
  {
    name: "R铆o Ocoa",
    description: "Fuente principal de agua para el Valle de San Juan de la Maguana y sus comunidades agr铆colas.",
    population: "500 mil",
  },
  {
    name: "R铆o Las Cuevas",
    description: "Alimenta sistemas de riego y acueductos de comunidades en la vertiente sur de la Cordillera Central.",
    population: "200 mil",
  },
  {
    name: "R铆o Yuna (afluentes)",
    description: "Los tributarios que nacen en Valle Nuevo contribuyen al sistema del r铆o Yuna en el Cibao oriental.",
    population: "1.2 millones",
  },
]

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [ref, threshold])
  return inView
}

export default function WatershedSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref)

  return (
    <section id="cuencas" ref={ref} className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="water-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 0 Q45 30 30 60 Q15 30 30 0Z" fill="currentColor" className="text-accent" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#water-pattern)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-accent">
              F谩brica de Agua
            </span>
            <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl text-balance">
              Cuencas Hidrogr谩ficas
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Valle Nuevo es la principal f谩brica de agua de la Rep煤blica Dominicana. 
              De sus monta帽as nacen r铆os que abastecen a m谩s de 5 millones de personas 
              y alimentan los principales sistemas de riego del pa铆s.
            </p>

            <div className="mt-10 flex flex-col gap-6">
              {rivers.map((river, i) => (
                <div
                  key={river.name}
                  className="flex gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-500"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateX(0)" : "translateX(-20px)",
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Droplets className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-foreground">{river.name}</h4>
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                        {river.population} personas
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {river.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div
            className="relative transition-all duration-700"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(30px)",
            }}
          >
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/images/river-watershed.jpg"
                alt="R铆o cristalino naciendo en Valle Nuevo"
                width={700}
                height={900}
                className="h-[500px] w-full object-cover md:h-[600px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="rounded-xl bg-background/80 p-4 backdrop-blur-sm">
                  <p className="text-center text-sm font-medium text-foreground">
                    De estas cumbres nacen los r铆os que dan vida a m谩s del{" "}
                    <span className="font-bold text-accent">50%</span> de la poblaci贸n dominicana
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
