import React, { useState } from 'react'
import api, { setToken } from '../lib/api'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  async function submit(e: any){
    e.preventDefault();
    try{
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      window.location.href = '/dashboard';
    } catch(e){ alert('Login failed') }
  }
  return (
    <div className="p-8">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
