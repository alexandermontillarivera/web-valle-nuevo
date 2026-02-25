"use client"

import { useEffect, useRef, useState } from "react"
import { YouTubeEmbed } from "@next/third-parties/google"
import videosData from "../data/videos.json"

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
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

export function VideosSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef)

  return (
    <section
      id="videos"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block text-sm font-medium uppercase tracking-widest text-accent">
            {videosData.section.label}
          </span>
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl lg:text-6xl text-balance">
            {videosData.section.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {videosData.section.description}
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {videosData.videos.map((video, i) => (
            <div
              key={video.id}
              className="group rounded-2xl border border-border bg-card p-4 transition-all duration-500 hover:border-accent/50 hover:shadow-lg"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView
                  ? "translateY(0)"
                  : "translateY(24px)",
                transitionDelay: `${i * 120}ms`,
              }}
            >
              <div className="aspect-video overflow-hidden rounded-xl [&>lite-youtube]:rounded-xl">
                <YouTubeEmbed
                  videoid={video.id}
                  params="rel=0"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-foreground">
                  {video.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
