import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import AppRouter from './Router'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
)
