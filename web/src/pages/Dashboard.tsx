import React from 'react'
export default function Dashboard(){
  return (
    <div className="p-8">
      <h2>Dashboard</h2>
      <ul>
        <li><a href="/sante-map">Carte santé</a></li>
        <li><a href="/calendar">Calendrier</a></li>
      </ul>
    </div>
  )
}
