import React from 'react'
import { Link } from 'react-router-dom'
export default function Home(){
  return (
    <div className="p-8">
      <h1 className="text-3xl">JammCare Rural</h1>
      <p>Prototype MVP</p>
      <Link to="/login">Login</Link> | <Link to="/register">Register"</Link>
    </div>
  )
}
