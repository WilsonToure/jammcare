import React from 'react'
import { useState, useEffect } from 'react'
import { useI18n } from './lib/i18n'

export default function App() {
  const { t, locale, setLocale } = useI18n();
  const [msg, setMsg] = useState<string>('');

  useEffect(() => {
    setMsg(t('welcome'))
  }, [t])

  return (
    <div className="min-h-screen bg-surface p-8">
      <header className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif">JammCare Rural</h1>
        <select value={locale} onChange={e => setLocale(e.target.value)}>
          <option value="fr">Français</option>
          <option value="wo">Wolof</option>
        </select>
      </header>

      <main className="max-w-4xl mx-auto mt-6">
        <p>{msg}</p>
        <a href="/sante-map">Carte santé (bientôt)</a>
      </main>
    </div>
  )
}
