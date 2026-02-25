"use client"

import { Mountain, TreePine, Home, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function NotFound() {
  const router = useRouter()
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 text-center">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Mist layers */}
        <div className="absolute -left-20 top-1/4 h-64 w-96 rounded-full bg-forest/10 blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-72 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-forest-deep/30 to-transparent" />

        {/* Scattered trees */}
        <TreePine className="absolute bottom-12 left-[8%] h-24 w-24 text-forest/20" />
        <TreePine className="absolute bottom-8 left-[18%] h-32 w-32 text-forest/15" />
        <TreePine className="absolute bottom-16 right-[10%] h-28 w-28 text-forest/20" />
        <TreePine className="absolute bottom-6 right-[22%] h-20 w-20 text-forest/15" />
        <TreePine className="absolute bottom-10 left-[45%] h-16 w-16 text-forest/10" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Mountain icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-card">
          <Mountain className="h-10 w-10 text-primary" />
        </div>

        {/* 404 number */}
        <h1 className="font-serif text-8xl font-bold tracking-tight text-primary md:text-9xl">
          404
        </h1>

        {/* Message */}
        <p className="mt-4 font-serif text-2xl font-semibold text-foreground md:text-3xl">
          Sendero no encontrado
        </p>
        <p className="mx-auto mt-3 max-w-md text-base text-muted-foreground leading-relaxed">
          Parece que te has adentrado en un camino sin marcar.
          No te preocupes, te ayudamos a regresar al parque.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex text-white items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Home className="h-4 w-4" />
            Volver al inicio
          </Link>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            Página anterior
          </button>
        </div>
      </div>
    </div>
  )
}
