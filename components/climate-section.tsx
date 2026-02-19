"use client"

import { useEffect, useRef, useState } from "react"
import { Thermometer, Droplets, Wind, Sun } from "lucide-react"

const climateData = [
  {
    month: "Ene",
    tempMax: 18,
    tempMin: 4,
    precipitacion: 45,
  },
  {
    month: "Feb",
    tempMax: 19,
    tempMin: 5,
    precipitacion: 35,
  },
  {
    month: "Mar",
    tempMax: 20,
    tempMin: 6,
    precipitacion: 50,
  },
  {
    month: "Abr",
    tempMax: 21,
    tempMin: 8,
    precipitacion: 85,
  },
  {
    month: "May",
    tempMax: 22,
    tempMin: 10,
    precipitacion: 150,
  },
  {
    month: "Jun",
    tempMax: 23,
    tempMin: 12,
    precipitacion: 120,
  },
  {
    month: "Jul",
    tempMax: 24,
    tempMin: 13,
    precipitacion: 110,
  },
  {
    month: "Ago",
    tempMax: 24,
    tempMin: 13,
    precipitacion: 130,
  },
  {
    month: "Sep",
    tempMax: 23,
    tempMin: 12,
    precipitacion: 140,
  },
  {
    month: "Oct",
    tempMax: 22,
    tempMin: 10,
    precipitacion: 160,
  },
  {
    month: "Nov",
    tempMax: 20,
    tempMin: 7,
    precipitacion: 100,
  },
  {
    month: "Dic",
    tempMax: 18,
    tempMin: 5,
    precipitacion: 55,
  },
]

const maxPrecip = Math.max(...climateData.map((d) => d.precipitacion))

const stats = [
  {
    icon: Thermometer,
    label: "Temperatura Promedio",
    value: "18掳C",
    detail: "Puede descender bajo 0掳C en invierno",
  },
  {
    icon: Droplets,
    label: "Precipitaci贸n Anual",
    value: "1,080 mm",
    detail: "Distribuida principalmente mayo-octubre",
  },
  {
    icon: Wind,
    label: "Altitud Promedio",
    value: "2,200 m",
    detail: "Punto m谩s alto: 2,842 msnm",
  },
  {
    icon: Sun,
    label: "Humedad Relativa",
    value: "85%",
    detail: "Niebla frecuente durante todo el a帽o",
  },
]

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.2) {
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

export default function ClimateSection() {
  const chartRef = useRef<HTMLDivElement>(null)
  const inView = useInView(chartRef)

  return (
    <section id="clima" className="relative py-24 md:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-accent">
            Condiciones Atmosf茅ricas
          </span>
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl text-balance">
            Clima de Monta帽a
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Valle Nuevo posee un microclima 煤nico en el Caribe: temperaturas que
            pueden descender bajo cero, heladas frecuentes y una neblina
            persistente que envuelve sus cumbres.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                <stat.icon className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>
              <p className="mt-1 text-3xl font-bold text-foreground">
                {stat.value}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-serif text-2xl font-bold text-foreground">
                Variaci贸n Clim谩tica Anual
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Temperatura y precipitaci贸n mensual promedio
              </p>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-accent" />
                <span className="text-xs text-muted-foreground">
                  Temp. M谩x
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#60a5fa]" />
                <span className="text-xs text-muted-foreground">
                  Temp. M铆n
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-accent/30" />
                <span className="text-xs text-muted-foreground">
                  Precipitaci贸n
                </span>
              </div>
            </div>
          </div>

          <div ref={chartRef} className="relative h-64 md:h-80">
            {/* Y Axis labels */}
            <div className="absolute left-0 top-0 flex h-full flex-col justify-between text-xs text-muted-foreground">
              <span>25掳C</span>
              <span>15掳C</span>
              <span>5掳C</span>
              <span>0掳C</span>
            </div>

            {/* Chart area */}
            <div className="ml-10 flex h-full items-end gap-1 sm:gap-2 md:gap-3">
              {climateData.map((d, i) => {
                const barHeight = inView ? (d.precipitacion / maxPrecip) * 100 : 0
                const tempMaxPos = inView ? ((d.tempMax / 25) * 100) : 0
                const tempMinPos = inView ? ((d.tempMin / 25) * 100) : 0

                return (
                  <div
                    key={d.month}
                    className="group/bar relative flex flex-1 flex-col items-center justify-end"
                    style={{ height: "100%" }}
                  >
                    {/* Temperature dots */}
                    <div
                      className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-accent shadow-sm shadow-accent/30 transition-all duration-700 ease-out"
                      style={{
                        bottom: `${tempMaxPos}%`,
                        transitionDelay: `${i * 60}ms`,
                        opacity: inView ? 1 : 0,
                      }}
                    />
                    <div
                      className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#60a5fa] shadow-sm shadow-blue-400/30 transition-all duration-700 ease-out"
                      style={{
                        bottom: `${tempMinPos}%`,
                        transitionDelay: `${i * 60 + 30}ms`,
                        opacity: inView ? 1 : 0,
                      }}
                    />

                    {/* Precipitation bar */}
                    <div
                      className="w-full rounded-t-md bg-accent/20 transition-all duration-700 ease-out group-hover/bar:bg-accent/30"
                      style={{
                        height: `${barHeight}%`,
                        transitionDelay: `${i * 60}ms`,
                      }}
                    />

                    {/* Month label */}
                    <span className="mt-2 text-xs text-muted-foreground">
                      {d.month}
                    </span>

                    {/* Tooltip */}
                    <div className="pointer-events-none absolute -top-20 left-1/2 z-10 -translate-x-1/2 rounded-lg bg-foreground/90 px-3 py-2 text-xs text-background opacity-0 shadow-lg transition-opacity group-hover/bar:opacity-100">
                      <p className="font-semibold">{d.month}</p>
                      <p>
                        M谩x: {d.tempMax}掳C / M铆n: {d.tempMin}掳C
                      </p>
                      <p>Lluvia: {d.precipitacion}mm</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
