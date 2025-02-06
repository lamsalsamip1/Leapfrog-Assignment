import { useState } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Home from './pages/home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  )
);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

// function App() {
//   return (
//     // <Home />
//     // <Profile />
//     // <Login />
//     <Register />
//   )

// }

export default App
