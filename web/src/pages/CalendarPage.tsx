import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { parseISO } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'

export default function CalendarPage(){
  return (
    <div className="p-8">
      <h2>Calendrier</h2>
      <p>Calendrier intégré (à connecter aux endpoints)</p>
    </div>
  )
}
