"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ShieldCheck, TreePine, Users, Flame } from "lucide-react"

const threats = [
  {
    icon: Flame,
    title: "Incendios Forestales",
    description:
      "Los incendios provocados para la agricultura y la ganader铆a representan la mayor amenaza para los bosques de pino y los ecosistemas de alta monta帽a.",
    severity: "Cr铆tica",
  },
  {
    icon: TreePine,
    title: "Deforestaci贸n",
    description:
      "La tala ilegal y la expansi贸n agr铆cola contin煤an reduciendo la cobertura boscosa, especialmente en las zonas de amortiguamiento del parque.",
    severity: "Alta",
  },
  {
    icon: Users,
    title: "Asentamientos Ilegales",
    description:
      "Comunidades que se establecen dentro de los l铆mites del parque generan presi贸n sobre los recursos naturales y fragmentan los h谩bitats.",
    severity: "Moderada",
  },
]

const efforts = [
  {
    year: "2001",
    title: "Declaraci贸n como Parque Nacional",
    description:
      "Valle Nuevo es oficialmente designado como 谩rea protegida mediante decreto presidencial, consolidando su estatus de conservaci贸n.",
  },
  {
    year: "2009",
    title: "Plan de Manejo Integral",
    description:
      "Se implementa el primer plan de manejo que incluye zonificaci贸n, patrullaje y programas de educaci贸n ambiental con comunidades locales.",
  },
  {
    year: "2014",
    title: "Programa de Reforestaci贸n",
    description:
      "Inicio del programa masivo de reforestaci贸n con Pinus occidentalis en 谩reas degradadas, con la participaci贸n de voluntarios y comunidades.",
  },
  {
    year: "2019",
    title: "Monitoreo de Biodiversidad",
    description:
      "Implementaci贸n de c谩maras trampa y estaciones de monitoreo para seguimiento de especies end茅micas y evaluaci贸n del estado de los ecosistemas.",
  },
  {
    year: "2023",
    title: "Corredor Biol贸gico",
    description:
      "Establecimiento de un corredor biol贸gico conectando Valle Nuevo con otras 谩reas protegidas de la Cordillera Central.",
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

export default function ConservationSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef)

  return (
    <section
      id="conservacion"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-card"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-accent">
            Protegiendo el Futuro
          </span>
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl text-balance">
            Conservaci贸n
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            La preservaci贸n de Valle Nuevo es fundamental para la seguridad
            h铆drica de la Rep煤blica Dominicana y la supervivencia de decenas
            de especies end茅micas.
          </p>
        </div>

        {/* Threats */}
        <div className="mb-20">
          <h3 className="mb-8 font-serif text-2xl font-bold text-foreground md:text-3xl">
            Amenazas Principales
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {threats.map((threat, i) => (
              <div
                key={threat.title}
                className="rounded-2xl border border-border bg-background p-6 transition-all duration-500"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView
                    ? "translateY(0)"
                    : "translateY(24px)",
                  transitionDelay: `${i * 120}ms`,
                }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                    <threat.icon className="h-6 w-6" />
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      threat.severity === "Cr铆tica"
                        ? "bg-destructive/10 text-destructive"
                        : threat.severity === "Alta"
                          ? "bg-orange-500/10 text-orange-600"
                          : "bg-yellow-500/10 text-yellow-600"
                    }`}
                  >
                    {threat.severity}
                  </span>
                </div>
                <h4 className="mb-2 text-lg font-semibold text-foreground">
                  {threat.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {threat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline + Image */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src="/images/panoramic-valley.jpg"
              alt="Vista panor谩mica del Parque Nacional Valle Nuevo"
              width={800}
              height={600}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <p className="font-serif text-2xl font-bold text-white md:text-3xl text-balance">
                Un legado para las futuras generaciones
              </p>
              <p className="mt-2 max-w-md text-sm text-white/80 leading-relaxed">
                Cada acci贸n de conservaci贸n contribuye a mantener el
                equilibrio ecol贸gico de toda la isla.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="mb-8 font-serif text-2xl font-bold text-foreground md:text-3xl">
              Hitos de Conservaci贸n
            </h3>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 h-full w-px bg-border" />

              <div className="flex flex-col gap-8">
                {efforts.map((effort, i) => (
                  <div
                    key={effort.year}
                    className="relative pl-12 transition-all duration-500"
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView
                        ? "translateX(0)"
                        : "translateX(-16px)",
                      transitionDelay: `${i * 100 + 200}ms`,
                    }}
                  >
                    {/* Dot */}
                    <div className="absolute left-2.5 top-1 h-3 w-3 rounded-full border-2 border-accent bg-background" />

                    <span className="text-sm font-bold text-accent">
                      {effort.year}
                    </span>
                    <h4 className="mt-1 text-lg font-semibold text-foreground">
                      {effort.title}
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {effort.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
