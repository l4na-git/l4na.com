import { useState, useEffect } from "react"

export interface Project {
  title: string
  description: string
  tech: string[]
  role: string
  highlight: string
  github: string
  demo?: string
  details?: string
  media?: {
    type: "image" | "video"
    src: string
    alt?: string
  }
}

export function ProjectModal() {
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      setProject((e as CustomEvent<Project>).detail)
    }
    window.addEventListener("open-project-modal", handler)
    return () => window.removeEventListener("open-project-modal", handler)
  }, [])

  useEffect(() => {
    if (!project) return
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [project])

  useEffect(() => {
    if (!project) return
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProject(null)
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [project])

  if (!project) return null

  return (
    <div
      className="fixed inset-x-0 top-16 bottom-0 z-[100] flex items-center justify-center"
      onClick={() => setProject(null)}
    >
      {/* グリッド背景 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "oklch(0.85 0.04 220 / 0.95)",
          backgroundImage: `
            linear-gradient(to right, oklch(0.75 0.06 220 / 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.75 0.06 220 / 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      {/* 閉じるボタン */}
      <button
        onClick={() => setProject(null)}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-card/80 hover:bg-card text-navy transition-colors"
        aria-label="閉じる"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* コンテンツ */}
      <div
        className="relative w-full max-w-2xl mx-4 max-h-[calc(100vh-8rem)] overflow-y-auto bg-card rounded-2xl shadow-xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
          {project.title}
        </h2>

        {project.media && (
          <div className="mb-6 rounded-xl overflow-hidden border border-border">
            {project.media.type === "image" ? (
              <img
                src={project.media.src}
                alt={project.media.alt || project.title}
                className="w-full h-auto object-cover"
              />
            ) : (
              <video src={project.media.src} controls className="w-full h-auto">
                お使いのブラウザは動画再生に対応していません。
              </video>
            )}
          </div>
        )}

        <p className="text-muted-foreground mb-6">{project.description}</p>

        {project.details && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-navy mb-2">詳細説明</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {project.details}
            </p>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-navy mb-2">使用技術</h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="px-3 py-1.5 text-sm bg-sky-light/50 text-sky-dark rounded-lg">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-navy mb-2">担当</h3>
          <p className="text-sm text-muted-foreground">{project.role}</p>
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-semibold text-navy mb-2">工夫した点</h3>
          <p className="text-sm text-muted-foreground">{project.highlight}</p>
        </div>

        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-medium hover:bg-sky-dark text-white text-sm font-medium transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-sky-medium/50 text-sky-dark hover:bg-sky-light text-sm font-medium transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
