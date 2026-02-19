"use client"

import { useState } from "react"
import Image from "next/image"
import { Bird, Bug, Flower2, Fish } from "lucide-react"

type Category = "fauna" | "flora" | "aves" | "acuatica"

const categories: { id: Category; label: string; icon: typeof Bird }[] = [
  { id: "aves", label: "Aves", icon: Bird },
  { id: "fauna", label: "Fauna", icon: Bug },
  { id: "flora", label: "Flora", icon: Flower2 },
  { id: "acuatica", label: "Vida Acuatica", icon: Fish },
]

const species: Record<
  Category,
  {
    name: string
    scientific: string
    image: string
    status: string
    description: string
  }[]
> = {
  aves: [
    {
      name: "Pico Cruzado Hispaniolano",
      scientific: "Loxia megaplaga",
      image: "/images/bird-endemic.jpg",
      status: "En Peligro",
      description:
        "Ave endemica de La Hispaniola, especializada en extraer semillas de los conos del pino. Su pico cruzado es una adaptacion unica. Solo quedan aproximadamente 3,000 individuos en estado silvestre.",
    },
    {
      name: "Ciguita Aliblanca",
      scientific: "Xenoligea montana",
      image: "/images/cloud-forest.jpg",
      status: "Vulnerable",
      description:
        "Tanagra endemica que habita exclusivamente los bosques de montana por encima de 1,500 metros. Se alimenta de insectos y frutos pequenos en el sotobosque denso.",
    },
    {
      name: "Zorzal de La Selle",
      scientific: "Turdus swalesi",
      image: "/images/pine-forest.jpg",
      status: "En Peligro",
      description:
        "Uno de los zorzales mas raros del mundo. Habita unicamente los bosques nublados de las montanas mas altas de La Hispaniola, incluyendo Valle Nuevo.",
    },
  ],
  fauna: [
    {
      name: "Solenodonte",
      scientific: "Solenodon paradoxus",
      image: "/images/solenodon.jpg",
      status: "En Peligro",
      description:
        "Mamifero insectivoro primitivo, unico en el mundo por su capacidad de inyectar veneno a traves de sus dientes. Es un fosil viviente que sobrevivio a los dinosaurios y es endemico de La Hispaniola.",
    },
    {
      name: "Hutia",
      scientific: "Plagiodontia aedium",
      image: "/images/cloud-forest.jpg",
      status: "En Peligro",
      description:
        "Roedor endemico de La Hispaniola, nocturno y arboricola. Es el mayor mamifero terrestre nativo de la isla. Su poblacion ha disminuido drasticamente por la perdida de habitat.",
    },
    {
      name: "Rana Verde de La Hispaniola",
      scientific: "Eleutherodactylus auriculatoides",
      image: "/images/frog-endemic.jpg",
      status: "Vulnerable",
      description:
        "Pequena rana endemica que habita en la hojarasca del bosque nublado. Su canto nocturno es caracteristico de las noches frescas de Valle Nuevo.",
    },
  ],
  flora: [
    {
      name: "Pino Criollo",
      scientific: "Pinus occidentalis",
      image: "/images/pine-forest.jpg",
      status: "Casi Amenazado",
      description:
        "Especie endemica de La Hispaniola y arbol nacional. En Valle Nuevo forma extensos bosques a altitudes superiores a 1,500 m. Puede alcanzar 30 metros de altura y vivir varios siglos.",
    },
    {
      name: "Orquideas de Montana",
      scientific: "Lepanthes spp.",
      image: "/images/orchid-endemic.jpg",
      status: "Endemica",
      description:
        "Valle Nuevo alberga mas de 30 especies de orquideas, muchas de ellas endemicas. Crecen como epifitas en los troncos de los arboles del bosque nublado, donde la humedad constante favorece su desarrollo.",
    },
    {
      name: "Pajon de Montaña",
      scientific: "Danthonia domingensis",
      image: "/images/panoramic-valley.jpg",
      status: "Endemica",
      description:
        "Graminea endemica que domina las sabanas de paramo sobre los 2,200 m. Forma extensas praderas doradas que se cubren de escarcha al amanecer, creando un paisaje unico en el Caribe.",
    },
  ],
  acuatica: [
    {
      name: "Trucha Criolla",
      scientific: "Micropterus sp.",
      image: "/images/river-watershed.jpg",
      status: "Vulnerable",
      description:
        "Los rios de montaña de Valle Nuevo albergan poblaciones de peces adaptados a aguas frias y cristalinas. Estos ecosistemas acuaticos son extremadamente sensibles a la contaminacion.",
    },
    {
      name: "Cangrejo de Rio",
      scientific: "Epilobocera sinuatifrons",
      image: "/images/river-watershed.jpg",
      status: "Endemico",
      description:
        "Crustaceo de agua dulce endemico que habita los arroyos de montaña. Juega un papel crucial en el ecosistema fluvial como detritívoro y fuente de alimento para otras especies.",
    },
    {
      name: "Camarones de Montana",
      scientific: "Atya scabra",
      image: "/images/river-watershed.jpg",
      status: "Estable",
      description:
        "Pequenos camarones de agua dulce que habitan los arroyos frios de montana, filtrando particulas del agua y contribuyendo a mantener la calidad de los recursos hidricos.",
    },
  ],
}

const statusColors: Record<string, string> = {
  "En Peligro": "bg-red-500/20 text-red-300",
  Vulnerable: "bg-amber-500/20 text-amber-300",
  "Casi Amenazado": "bg-orange-500/20 text-orange-300",
  Endemica: "bg-primary/20 text-primary",
  Endemico: "bg-primary/20 text-primary",
  Estable: "bg-emerald-500/20 text-emerald-300",
}

export function BiodiversitySection() {
  const [activeCategory, setActiveCategory] = useState<Category>("aves")

  return (
    <section id="biodiversidad" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
            Biodiversidad
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">
            Especies Unicas en el Mundo
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Valle Nuevo es un refugio de endemismo, hogar de especies que no
            existen en ningun otro lugar del planeta. Desde el primitivo solenodonte
            hasta el delicado pico cruzado, cada especie cuenta una historia de
            millones de anos de evolucion aislada.
          </p>
        </div>

        {/* Category switcher */}
        <div className="mt-12 flex justify-center gap-2 sm:gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all sm:px-4 sm:py-2.5 ${
                  activeCategory === cat.id
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
          {species[activeCategory].map((sp) => (
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
                    className={`rounded-md px-2 py-1 text-[10px] font-semibold ${
                      statusColors[sp.status] || "bg-muted text-muted-foreground"
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
            Valle Nuevo en Numeros
          </h3>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: "138", label: "Especies de Aves", detail: "32 endemicas" },
              {
                value: "500+",
                label: "Especies de Plantas",
                detail: "40% endemicas",
              },
              {
                value: "67",
                label: "Especies de Orquideas",
                detail: "30+ endemicas",
              },
              {
                value: "29",
                label: "Especies de Reptiles",
                detail: "95% endemicas",
              },
            ].map((stat) => (
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
