import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { todoUpdateSchema } from '@/lib/validations'
import { z } from 'zod'

type Params = {
  params: Promise<{
    id: string
  }>
}

// PUT /api/todos/:id - ToDo更新
export async function PUT(request: Request, context: Params) {
  try {
    const { id } = await context.params
    const json = await request.json()
    const body = todoUpdateSchema.parse(json)

    const updateData: any = {
      ...body,
    }

    // dueDateが文字列で来た場合、Date型に変換
    if (body.dueDate) {
      updateData.dueDate = new Date(body.dueDate)
    }

    const todo = await prisma.todo.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(todo)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      )
    }
    console.error('Failed to update todo:', error)
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    )
  }
}

// DELETE /api/todos/:id - ToDo削除
export async function DELETE(request: Request, context: Params) {
  try {
    const { id } = await context.params
    await prisma.todo.delete({
      where: { id },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Failed to delete todo:', error)
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    )
  }
}
