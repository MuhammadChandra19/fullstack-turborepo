import { CircleCheckBig, CirclePlus, Delete } from 'lucide-react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import useTodo from './hooks/useTodo'
import { FormEvent, useState } from 'react'
import { TodoType } from '@packages/types'

function App() {
  const { addTodo, deleteTodo, todos } = useTodo()
  const [value, setValue] = useState("")

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addTodo({
      status: TodoType.IN_PROGRESS,
      title: value,
      description: ''
    })
  }

  return (
    <div className="w-full justify-center">
      <div className="container m-auto flex flex-col gap-4">
        <h1>Todo App</h1>
        <form className="flex gap-2 w-full" onSubmit={handleAddTodo}>
          <Input placeholder="Task" onChange={(e) => setValue(e.target.value)} value={value} />
          <Button type="submit"> <CirclePlus /> </Button>
        </form>
        {
          todos?.map((todo, idx) => (
            <div className="flex w-full gap-2 justify-between" key={idx}>
              <p>{todo.title}</p>
              <div className="flex gap-2">
                <Button onClick={() => deleteTodo(todo.id)}><Delete /> </Button>
                <Button><CircleCheckBig /></Button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App
