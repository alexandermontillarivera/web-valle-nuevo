"use client"

import { useState } from "react"
import Image from "next/image"
import { TreePine, Cloud, Flower2, Waves } from "lucide-react"
import ecosystemsData from "../data/ecosystems.json"

const iconMap = {
  TreePine,
  Cloud,
  Flower2,
  Waves,
}

export function EcosystemsSection() {
  const [active, setActive] = useState("pinos")
  const current = ecosystemsData.ecosystems.find((e) => e.id === active)!

  return (
    <section id="ecosistemas" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            {ecosystemsData.section.label}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">
            {ecosystemsData.section.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {ecosystemsData.section.description}
          </p>
        </div>

        {/* Ecosystem tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {ecosystemsData.ecosystems.map((eco) => {
            const Icon = iconMap[eco.icon as keyof typeof iconMap]
            return (
              <button
                key={eco.id}
                onClick={() => setActive(eco.id)}
                className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${active === eco.id
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
