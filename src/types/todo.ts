import { Todo } from '@prisma/client'

export type { Todo }

export type TodoCreateInput = {
  title: string
  description?: string
  dueDate: string
}

export type TodoUpdateInput = {
  title?: string
  description?: string
  dueDate?: string
  completed?: boolean
}
