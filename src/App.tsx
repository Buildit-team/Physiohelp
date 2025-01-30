import { RouterProvider } from "react-router-dom"
import { Routes } from "./router"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
      <RouterProvider router={Routes} />
      <Toaster/>
    </>
  )
}

export default App
