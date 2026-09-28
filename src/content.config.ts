import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const projects = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      // 日単位までは分からないプロジェクトが多いため、日は常に1日固定。実際の精度は月単位で、並べ替え専用（日付として画面表示しない）
      startDate: z.coerce.date(),
      category: z.enum(['個人開発', 'チーム開発', '授業課題']),
      title: z.string(),
      description: z.string(),
      tech: z.array(z.string()),
      team: z.string(),
      role: z.string().optional(),
      highlight: z.string(),
      details: z.string().optional(),
      github: z.string().optional(),
      demo: z.string().optional(),
      media: z
        .array(
          z.object({
            image: image(),
            alt: z.string(),
          })
        )
        .optional(),
    }),
})

export const collections = { projects }
