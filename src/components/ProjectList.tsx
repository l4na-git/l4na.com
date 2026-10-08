import { useState } from "react"
import type { Project } from "./ProjectModal"

const FORMATS = ["個人開発", "チーム開発"] as const
const CONTEXTS = ["自主制作", "授業課題", "ハッカソン", "プロジェクト"] as const

interface Props {
  projects: Project[]
}

interface FilterGroupProps {
  label: string
  options: readonly string[]
  selected: string | null
  onSelect: (value: string | null) => void
}

function FilterGroup({ label, options, selected, onSelect }: FilterGroupProps) {
  return (
    <div
      className="grid gap-x-4 gap-y-2 sm:grid-cols-[7.5rem_1fr] sm:items-center"
      role="group"
      aria-label={label}
    >
      <span className="text-xs font-medium text-navy">{label}</span>
      <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option === selected
        return (
          <button
            key={option}
            type="button"
            aria-pressed={active}
            onClick={() => onSelect(active ? null : option)}
            className={`min-h-9 px-4 py-1.5 text-sm font-medium rounded-full border transition-colors cursor-pointer ${
              active
                ? "bg-sky-medium hover:bg-sky-dark border-sky-medium hover:border-sky-dark text-white"
                : "bg-background border-sky-medium/50 text-sky-dark hover:bg-sky-light"
            }`}
          >
            {option}
          </button>
        )
      })}
      </div>
    </div>
  )
}

export function ProjectList({ projects }: Props) {
  const [format, setFormat] = useState<string | null>(null)
  const [context, setContext] = useState<string | null>(null)

  const filtered = projects.filter(
    (p) => (format === null || p.format === format) && (context === null || p.context === context)
  )
  const isFiltered = format !== null || context !== null

  const openModal = (project: Project) => {
    window.dispatchEvent(new CustomEvent("open-project-modal", { detail: project }))
  }

  return (
    <>
      <div className="mb-8">
        <div className="flex flex-col gap-3 w-fit max-w-full mx-auto mb-4">
          <FilterGroup label="開発形態" options={FORMATS} selected={format} onSelect={setFormat} />
          <FilterGroup label="制作のきっかけ" options={CONTEXTS} selected={context} onSelect={setContext} />
        </div>
        <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
          <span aria-live="polite">
            {filtered.length} / {projects.length} 件
          </span>
          {isFiltered && (
            <button
              type="button"
              onClick={() => {
                setFormat(null)
                setContext(null)
              }}
              className="underline text-sky-dark hover:text-navy cursor-pointer"
            >
              絞り込みを解除
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground py-12">該当する制作物はありません</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <article
              key={project.title}
              className="bg-card rounded-2xl p-6 shadow-sm border border-border flex flex-col"
            >
              <h3 className="text-lg font-medium text-navy mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">{project.description}</p>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-2 py-1 text-xs bg-sky-light/50 text-sky-dark rounded-md">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>
                    <span className="font-medium text-foreground">時期：</span>
                    {project.period}
                  </p>
                  <p>
                    <span className="font-medium text-foreground">形態：</span>
                    {project.team}
                  </p>
                  {project.role && (
                    <p>
                      <span className="font-medium text-foreground">担当：</span>
                      {project.role}
                    </p>
                  )}
                  <p>
                    <span className="font-medium text-foreground">工夫：</span>
                    {project.highlight}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border border-sky-medium/30 text-sky-dark hover:bg-sky-light transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border border-sky-medium/30 text-sky-dark hover:bg-sky-light transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      Demo
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => openModal(project)}
                    className="inline-flex items-center px-3 py-1.5 text-sm rounded-lg border border-sky-medium/30 text-sky-dark hover:bg-sky-light transition-colors cursor-pointer"
                    aria-label={`${project.title} の詳細`}
                  >
                    詳しく
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  )
}
