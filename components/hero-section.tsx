"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

export function HeroSection() {
  const [offsetY, setOffsetY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section id="inicio" className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background image with parallax */}
      <div
        className="absolute inset-0"
        style={{ transform: `translateY(${offsetY * 0.3}px)` }}
      >
        <Image
          src="/images/hero-valle-nuevo.jpg"
          alt="Vista aerea del Parque Nacional Valle Nuevo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-primary lg:text-base">
            Parque Nacional
          </p>
          <h1 className="font-serif text-5xl font-bold leading-tight text-foreground md:text-7xl lg:text-8xl xl:text-9xl">
            Valle Nuevo
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg lg:text-xl">
            Un santuario de vida en las alturas de la Cordillera Central dominicana.
            Hogar de bosques de pinos milenarios, especies endemicas y nacimientos
            de los rios mas importantes de la isla.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#ecosistemas"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
            >
              Explorar
            </a>
            <a
              href="#mapa"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:bg-secondary"
            >
              Mapa 3D Interactivo
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Descubre
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce text-primary" />
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-border/50 bg-background/80 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border/50 md:grid-cols-4">
          {[
            { value: "910", unit: "km2", label: "Area Protegida" },
            { value: "2,842", unit: "m", label: "Punto Mas Alto" },
            { value: "500+", unit: "", label: "Especies de Flora" },
            { value: "4", unit: "", label: "Rios Principales" },
          ].map((stat) => (
            <div key={stat.label} className="px-4 py-4 text-center lg:py-5">
              <p className="font-serif text-xl font-bold text-foreground lg:text-2xl">
                {stat.value}
                <span className="ml-1 text-sm text-primary">{stat.unit}</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
