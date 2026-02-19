import { TreePine, MapPin, Mail } from "lucide-react"

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Ecosistemas", href: "#ecosistemas" },
  { label: "Mapa 3D", href: "#mapa" },
  { label: "Biodiversidad", href: "#biodiversidad" },
  { label: "Clima", href: "#clima" },
  { label: "Cuencas", href: "#cuencas" },
  { label: "Conservación", href: "#conservacion" },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2">
                <TreePine className="h-6 w-6 text-accent" />
                <span className="font-serif text-xl font-bold text-foreground">
                  Valle Nuevo
                </span>
              </div>
              <p className="mt-4 max-w-xs text-sm text-muted-foreground leading-relaxed">
                Web documental dedicada a la preservación y difusión del
                patrimonio natural del Parque Nacional Valle Nuevo, República
                Dominicana.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                Navegación
              </h4>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Info */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                Información
              </h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <p className="text-sm text-muted-foreground">
                    Cordillera Central, República Dominicana
                    <br />
                    Provincias: La Vega, Monseñor Nouel, Azua, San José de Ocoa
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <p className="text-sm text-muted-foreground">
                    Ministerio de Medio Ambiente
                    <br />
                    ambiente.gob.do
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              Web documental con fines educativos y de conservación.
            </p>
            <p className="text-xs text-muted-foreground">
              Las imágenes son ilustrativas. Datos basados en investigaciones científicas publicadas.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
