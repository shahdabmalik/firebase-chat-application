import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUp from "./pages/signUp/SignUp"
import Login from "./pages/login/Login"
import Chats from "./pages/chats/Chats"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chats" element={<Chats />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
