import React, { useState } from 'react'
import api, { setToken } from '../lib/api'

export default function Register(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [full_name, setName] = useState('')
  async function submit(e: any){
    e.preventDefault();
    try{
      const res = await api.post('/auth/register', { email, password, full_name });
      const token = res.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      window.location.href = '/dashboard';
    } catch(e){ alert('Register failed') }
  }
  return (
    <div className="p-8">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input value={full_name} onChange={e=>setName(e.target.value)} placeholder="Full name" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
