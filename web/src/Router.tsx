import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import MapPage from './pages/SanteMap'
import CalendarPage from './pages/CalendarPage'
import CallPage from './pages/CallPage'

export default function AppRouter(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/sante-map" element={<MapPage/>} />
        <Route path="/calendar" element={<CalendarPage/>} />
        <Route path="/call/:id" element={<CallPage/>} />
      </Routes>
    </BrowserRouter>
  )
}
