import { TreePine, MapPin, Mail } from "lucide-react"
import footerData from "../data/footer.json"
import navData from "../data/navigation.json"

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
                  {footerData.brand.name}
                </span>
              </div>
              <p className="mt-4 max-w-xs text-sm text-muted-foreground leading-relaxed">
                {footerData.brand.description}
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                {footerData.navigationLabel}
              </h4>
              <nav className="flex flex-col gap-2">
                {navData.links.map((link) => (
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
                {footerData.infoLabel}
              </h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <p className="text-sm text-muted-foreground">
                    {footerData.contact.location.text}
                    <br />
                    {footerData.contact.location.subtext}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <p className="text-sm text-muted-foreground">
                    {footerData.contact.email.text}
                    <br />
                    {footerData.contact.email.subtext}
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
              {footerData.bottom.text1}
            </p>
            <p className="text-xs text-muted-foreground">
              {footerData.bottom.text2}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
