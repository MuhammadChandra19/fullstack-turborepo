import { CreateTodoRequest, TodoResponse } from '@packages/types'
import { useEffect, useState } from 'react'

const useTodo = () => {
  const [todos, setTodos] = useState<TodoResponse[]>()

  const addTodo = async (payload: CreateTodoRequest) => {
    const res = await fetch('/api/todo', {
      body: JSON.stringify(payload),
      method: 'POST'
    })
    const id = await res.json()
    if (todos?.length) {
      setTodos([...todos, {
        id: id.insertedID,
        status: payload.status,
        title: payload.title
      }])
    } else {
      setTodos([{
        id: id.insertedID,
        status: payload.status,
        title: payload.title
      }])
    }
  }

  const deleteTodo = async (id: string) => {
    await fetch(`/api/todo/${id}`, {
      method: 'DELETE'
    })
    const filtered = todos?.filter(t => t.id !== id)
    setTodos(filtered)
  }

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/todo/list')
      const data = await res.json()
      setTodos(data.todos)
    })()
  }, [])

  return {
    todos,
    addTodo,
    deleteTodo
  }
}

export default useTodo
