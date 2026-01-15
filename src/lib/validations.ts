import { z } from 'zod'

export const todoCreateSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(200, 'タイトルは200文字以内です'),
  description: z.string().max(1000, '説明文は1000文字以内です').optional(),
})

export const todoUpdateSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(200, 'タイトルは200文字以内です').optional(),
  description: z.string().max(1000, '説明文は1000文字以内です').optional(),
  completed: z.boolean().optional(),
})
