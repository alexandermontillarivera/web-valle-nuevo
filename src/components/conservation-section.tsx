"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ShieldCheck, TreePine, Users, Flame } from "lucide-react"
import conservationData from "../data/conservation.json"

const iconMap = {
  Flame,
  TreePine,
  Users,
  ShieldCheck,
}

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

export function ConservationSection() {
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
            {conservationData.section.label}
          </span>
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl text-balance">
            {conservationData.section.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {conservationData.section.description}
          </p>
        </div>

        {/* Threats */}
        <div className="mb-20">
          <h3 className="mb-8 font-serif text-2xl font-bold text-foreground md:text-3xl">
            Amenazas Principales
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {conservationData.threats.map((threat, i) => {
              const Icon = iconMap[threat.icon as keyof typeof iconMap]
              return (
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
                      <Icon className="h-6 w-6" />
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${threat.severity === "Crítica"
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
              )
            })}
          </div>
        </div>

        {/* Timeline + Image */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Image */}
          <div className="relative overflow-hidden rounded-2xl">
            <Image
              src={conservationData.image.src}
              alt={conservationData.image.alt}
              width={800}
              height={600}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t " />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <p className="font-serif text-2xl font-bold text-white md:text-3xl text-balance">
                {conservationData.image.title}
              </p>
              <p className="mt-2 max-w-md text-sm text-white/80 leading-relaxed">
                {conservationData.image.description}
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="mb-8 font-serif text-2xl font-bold text-foreground md:text-3xl">
              Hitos de Conservación
            </h3>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 h-full w-px bg-border" />

              <div className="flex flex-col gap-8">
                {conservationData.efforts.map((effort, i) => (
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
