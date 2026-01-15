'use client'

import { useState } from 'react'
import { Check, Trash2, Edit2 } from 'lucide-react'
import type { Todo } from '@/types/todo'

type TodoItemProps = {
  todo: Todo
  onUpdate: (id: string, data: { completed?: boolean; title?: string; description?: string }) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description || '')

  const handleToggleComplete = async () => {
    await onUpdate(todo.id, { completed: !todo.completed })
  }

  const handleSaveEdit = async () => {
    if (editTitle.trim()) {
      await onUpdate(todo.id, {
        title: editTitle,
        description: editDescription || undefined
      })
      setIsEditing(false)
    }
  }

  const handleCancelEdit = () => {
    setEditTitle(todo.title)
    setEditDescription(todo.description || '')
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md space-y-3">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={2}
        />
        <div className="flex gap-2">
          <button
            onClick={handleSaveEdit}
            className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            保存
          </button>
          <button
            onClick={handleCancelEdit}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            キャンセル
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md flex items-start gap-4 ${todo.completed ? 'opacity-60' : ''}`}>
      <button
        onClick={handleToggleComplete}
        className={`mt-1 flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-green-500 border-green-500'
            : 'border-gray-300 hover:border-green-500'
        }`}
      >
        {todo.completed && <Check size={16} className="text-white" />}
      </button>

      <div className="flex-1 min-w-0">
        <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
          {todo.title}
        </h3>
        {todo.description && (
          <p className={`mt-1 text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
            {todo.description}
          </p>
        )}
        <p className="mt-2 text-xs text-gray-400">
          {new Date(todo.createdAt).toLocaleString('ja-JP')}
        </p>
      </div>

      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
          title="編集"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
          title="削除"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  )
}
