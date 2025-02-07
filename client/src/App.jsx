import { useState } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Home from './pages/home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import RegSuccess from './pages/RegSuccess'
import Verified from './pages/Verified'
import TwoFA from './pages/TwoFA'
import Enable2FA from './pages/Enable2FA'
import Disable2FA from './pages/Disable2FA'

const App = () => {


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notes" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/regsuccess" element={<RegSuccess />} />
        <Route path="/verified" element={<Verified />} />
        <Route path="/twofa" element={<TwoFA />} />
        <Route path="/enable2fa" element={<Enable2FA />} />
        <Route path="/disable2fa" element={<Disable2FA />} />

      </Route>
    )
  );
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
