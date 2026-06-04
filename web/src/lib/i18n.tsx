import { useState, useCallback } from 'react'

const resources: Record<string, Record<string, string>> = {
  fr: {
    welcome: 'Bienvenue sur JammCare Rural — prototype.'
  },
  wo: {
    welcome: 'JammCare Rural — ak jamm.'
  }
}

export function useI18n() {
  const [locale, setLocaleState] = useState<string>(localStorage.getItem('locale') || 'fr')
  const setLocale = useCallback((l: string) => {
    localStorage.setItem('locale', l)
    setLocaleState(l)
  }, [])
  const t = (k: string) => resources[locale]?.[k] || k
  return { t, locale, setLocale }
}

export { useI18n as default }
