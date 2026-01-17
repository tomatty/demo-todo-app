import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { todoCreateSchema } from '@/lib/validations'
import { z } from 'zod'

// GET /api/todos - 全ToDo取得
export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(todos)
  } catch (error) {
    console.error('Failed to fetch todos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    )
  }
}

// POST /api/todos - 新規ToDo作成
export async function POST(request: Request) {
  try {
    const json = await request.json()
    const body = todoCreateSchema.parse(json)

    const todo = await prisma.todo.create({
      data: {
        title: body.title,
        description: body.description,
        dueDate: new Date(body.dueDate),
      },
    })

    return NextResponse.json(todo, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors)
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      )
    }
    console.error('Failed to create todo:', error)
    console.error('Error details:', JSON.stringify(error, null, 2))
    return NextResponse.json(
      { error: 'Failed to create todo', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}
