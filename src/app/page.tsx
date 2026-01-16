'use client'

import { useEffect, useState } from 'react'
import TodoForm from '@/components/TodoForm'
import TodoItem from '@/components/TodoItem'
import type { Todo } from '@/types/todo'

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todos')
      if (response.ok) {
        const data = await response.json()
        setTodos(data)
      }
    } catch (error) {
      console.error('Failed to fetch todos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleCreateTodo = async (data: { title: string; description?: string }) => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      await fetchTodos()
    }
  }

  const handleUpdateTodo = async (id: string, data: any) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      await fetchTodos()
    }
  }

  const handleDeleteTodo = async (id: string) => {
    if (confirm('このToDoを削除しますか?')) {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchTodos()
      }
    }
  }

  const completedCount = todos.filter(t => t.completed).length
  const totalCount = todos.length

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ToDoデモアプリ
          </h1>
          <p className="text-gray-600">
            完了: {completedCount} / 全体: {totalCount}
          </p>
        </header>

        <div className="mb-8">
          <TodoForm onSubmit={handleCreateTodo} />
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center text-gray-500">読み込み中...</div>
          ) : todos.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              ToDoがありません。上のフォームから追加してください。
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
              />
            ))
          )}
        </div>
      </div>
    </main>
  )
}
