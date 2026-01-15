import { Todo } from '@prisma/client'

export type { Todo }

export type TodoCreateInput = {
  title: string
  description?: string
}

export type TodoUpdateInput = {
  title?: string
  description?: string
  completed?: boolean
}
