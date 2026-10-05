import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const projects = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      // 日単位までは分からないプロジェクトが多いため、日は常に1日固定。実際の精度は月単位で、並べ替え専用（日付として画面表示しない）
      startDate: z.coerce.date(),
      title: z.string(),
      description: z.string(),
      tech: z.array(z.string()),
      team: z
        .object({
          format: z.enum(['個人開発', 'チーム開発']),
          size: z.union([z.number(), z.string()]).optional(), // チーム開発の場合の人数（"10人以上"のような曖昧な表現は文字列で）
          context: z.enum(['自主制作', '授業課題', 'ハッカソン', 'プロジェクト']),
          projectName: z.string().optional(), // context: プロジェクトの場合の名称（例: "LiveFx"）
        })
        .superRefine((team, ctx) => {
          if (team.format === '個人開発' && team.size !== undefined) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'format: 個人開発 の場合、size は設定できません',
              path: ['size'],
            })
          }
          if (team.context !== 'プロジェクト' && team.projectName !== undefined) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'projectName は context: プロジェクト の場合のみ設定できます',
              path: ['projectName'],
            })
          }
        }),
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
