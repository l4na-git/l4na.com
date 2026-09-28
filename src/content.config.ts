import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const projects = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      order: z.number(),
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
