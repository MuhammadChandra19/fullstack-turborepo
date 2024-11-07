import { useEffect } from 'react'
import type { HelloType } from "@packages/types"

function App() {
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/hello')
      const message = await res.json() as HelloType
      console.log(message)
    })()
  }, [])

  return (
    <div className="w-full justify-center">
      <div className="container m-auto">
        <h1 className="font-bold text-xl">Hello</h1>
      </div>
    </div>
  )
}

export default App
