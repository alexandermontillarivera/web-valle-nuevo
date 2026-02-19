import Image from "next/image"
import { Droplets, TreePine, Wind } from "lucide-react"

const features = [
  {
    icon: TreePine,
    title: "Bosques de Pino",
    description:
      "El mayor bosque de Pinus occidentalis del Caribe, con ejemplares que superan los 30 metros de altura y siglos de antiguedad.",
  },
  {
    icon: Droplets,
    title: "Nacimiento de Rios",
    description:
      "Origen de los rios Nizao, Ocoa, Las Cuevas y Blanco, cuencas hidrograficas que abastecen a millones de dominicanos.",
  },
  {
    icon: Wind,
    title: "Clima de Montana",
    description:
      "Temperaturas que pueden descender bajo cero, con heladas frecuentes y un microclima unico en el Caribe insular.",
  },
]

export function IntroSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Un Tesoro Natural
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">
            La Madre de las Aguas del Caribe
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground lg:text-lg">
            Ubicado en el corazon de la Cordillera Central a mas de 2,200 metros
            sobre el nivel del mar, Valle Nuevo es uno de los ecosistemas de
            montana mas importantes de las Antillas. Sus paramos y bosques nublados
            albergan una biodiversidad excepcional y constituyen la principal
            fabrica de agua de la Republica Dominicana.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
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
              src="/images/panoramic-valley.jpg"
              alt="Vista panoramica del valle con bosques de pinos"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/10" />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
              Patrimonio Natural
            </p>
            <h3 className="mt-2 font-serif text-2xl font-bold text-foreground lg:text-3xl text-balance">
              Un Paramo en el Tropico
            </h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Valle Nuevo presenta un paisaje que desafia la imaginacion caribena:
              extensas sabanas de pajones cubiertas de escarcha al amanecer, bosques
              densos de pinos envueltos en niebla y temperaturas que pueden
              descender hasta -5°C. Esta singularidad climatica lo convierte en un
              laboratorio natural unico para el estudio de la ecologia de montana
              tropical.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Declarado Parque Nacional en 1983, protege un area de 910 km2 que
              incluye picos como el Alto de la Bandera (2,842 m), la Pirámide
              (2,367 m) y extensas mesetas que forman el paramo mas alto de todas
              las Antillas.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
