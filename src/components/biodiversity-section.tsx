"use client"

import { useState } from "react"
import Image from "next/image"
import { Bird, Bug, Flower2, Fish } from "lucide-react"
import biodiversityData from "../data/biodiversity.json"

const iconMap = {
  Bird,
  Bug,
  Flower2,
  Fish,
}

type Category = keyof typeof biodiversityData.species

const statusColors: Record<string, string> = {
  "En Peligro": "bg-red-500/20 text-red-300",
  Vulnerable: "bg-amber-500/20 text-amber-300",
  "Casi Amenazado": "bg-orange-500/20 text-orange-300",
  "Endémica": "bg-primary/20 text-primary",
  "Endémico": "bg-primary/20 text-primary",
  Estable: "bg-emerald-500/20 text-emerald-300",
}

export function BiodiversitySection() {
  const [activeCategory, setActiveCategory] = useState<Category>("aves")

  return (
    <section id="biodiversidad" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            {biodiversityData.section.label}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">
            {biodiversityData.section.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {biodiversityData.section.description}
          </p>
        </div>

        {/* Category switcher */}
        <div className="mt-12 flex justify-center gap-2 sm:gap-3">
          {biodiversityData.categories.map((cat) => {
            const Icon = iconMap[cat.icon as keyof typeof iconMap]
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as Category)}
                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all sm:px-4 sm:py-2.5 ${activeCategory === cat.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Species cards */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {biodiversityData.species[activeCategory].map((sp) => (
            <div
              key={sp.name}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={sp.image}
                  alt={sp.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span
                    className={`rounded-md px-2 py-1 text-[10px] font-semibold ${statusColors[sp.status] || "bg-muted text-muted-foreground"
                      }`}
                  >
                    {sp.status}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg font-bold text-foreground">
                  {sp.name}
                </h3>
                <p className="mt-0.5 text-xs italic text-primary">
                  {sp.scientific}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {sp.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Biodiversity stats */}
        <div className="mt-16 rounded-2xl border border-border bg-card p-6 lg:p-10">
          <h3 className="text-center font-serif text-xl font-bold text-foreground lg:text-2xl">
            {biodiversityData.stats.title}
          </h3>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {biodiversityData.stats.items.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-3xl font-bold text-primary lg:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {stat.label}
                </p>
                <p className="text-xs text-muted-foreground">{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
