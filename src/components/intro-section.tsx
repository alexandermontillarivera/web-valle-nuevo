import Image from "next/image"
import { Droplets, TreePine, Wind } from "lucide-react"
import introData from "../data/intro.json"

const iconMap = {
  TreePine,
  Droplets,
  Wind,
}

export function IntroSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            {introData.section.label}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">
            {introData.section.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground lg:text-lg">
            {introData.section.description}
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {introData.features.map((feature) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap]
            return (
              <div
                key={feature.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:bg-secondary/50 lg:p-8"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Image + text block */}
        <div className="mt-24 grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={introData.heritage.image}
              alt={introData.heritage.imageAlt}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/10" />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              {introData.heritage.label}
            </p>
            <h3 className="mt-2 font-serif text-2xl font-bold text-foreground lg:text-3xl text-balance">
              {introData.heritage.title}
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {introData.heritage.description1}
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {introData.heritage.description2}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
