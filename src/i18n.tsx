import React, { createContext, useContext, useMemo, useState } from 'react'

import en from './locales/en.json'
import cs from './locales/cs.json'

type Locale = 'en' | 'cs'

type Messages = Record<string, any>

const messages: Record<Locale, Messages> = {
  en,
  cs,
}

type I18nContextValue = {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (path: string, vars?: Record<string, string | number>) => any
  formatPrice: (value: number) => string
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
  // Default to Czech
  const [locale, setLocale] = useState<Locale>('cs')

  const value = useMemo<I18nContextValue>(() => {
    const t = (path: string, vars?: Record<string, string | number>): any => {
      const parts = path.split('.')
      let cur: any = messages[locale]
      for (const p of parts) {
        if (cur && p in cur) cur = cur[p]
        else {
          // fallback to key
          return path
        }
      }
      // If the lookup returns an object/array, return it as-is (caller can cast)
      if (typeof cur === 'string') {
        let str = cur
        if (vars) {
          for (const k of Object.keys(vars)) {
            str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(vars[k]))
          }
        }
        return str
      }
      return cur
    }

    const formatPrice = (value: number): string => {
      // Use Intl.NumberFormat with currency formatting (CZK). This shows "49 Kč" for Czech locale
      const localeTag = locale === 'cs' ? 'cs-CZ' : 'en-US'
      const nf = new Intl.NumberFormat(localeTag, {
        style: 'currency',
        currency: 'CZK',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      return nf.format(value)
    }

    return { locale, setLocale, t, formatPrice }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const useI18n = (): I18nContextValue => {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
