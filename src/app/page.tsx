import { BiodiversitySection } from "@/components/biodiversity-section"
import { ConservationSection } from "@/components/conservation-section"
import { VideosSection } from "@/components/videos-section"
import { EcosystemsSection } from "@/components/ecosystems-section"
import { WatershedSection } from "@/components/watershed-section"
import { ClimateSection } from "@/components/climate-section"
import { IntroSection } from "@/components/intro-section"
import { HeroSection } from "@/components/hero-section"
import { TerrainMap } from "@/components/terrain-map"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <IntroSection />
        <EcosystemsSection />
        <BiodiversitySection />
        <TerrainMap />
        <ClimateSection />
        <WatershedSection />
        <ConservationSection />
        <VideosSection />
      </main>
    </>
  )
}
