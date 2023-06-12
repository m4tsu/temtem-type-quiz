'use client'

import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { createContext, useContext, useEffect } from 'react'
import {
  initReactI18next,
  useTranslation as useTranslation_,
} from 'react-i18next'

import { getOptions } from './settings'

import type { Language } from './settings'
import type { FC, PropsWithChildren } from 'react'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (lng: string, ns: string) => import(`./locales/${lng}/${ns}.json`)
    )
  )
  .init({
    ...getOptions(),
    lng: undefined as unknown as string,
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
    react: {
      bindI18n: 'languageChanged',
      useSuspense: true,
    },
  })
//   return i18next
// }

const runsOnServerSide = typeof window === 'undefined'

const LanguageContext = createContext<Language | undefined>(undefined)
export const LanguageProvider: FC<PropsWithChildren<{ lng: Language }>> = ({
  lng,
  children,
}) => {
  console.log('LanguageProvider', lng)
  return (
    <LanguageContext.Provider value={lng}>{children}</LanguageContext.Provider>
  )
}
export const useLanguage = () => {
  const lng = useContext(LanguageContext)
  if (lng === undefined) throw new Error('LanguageProvider is not provided')
  return { language: lng }
}

export const useTranslation = (...args: Parameters<typeof useTranslation_>) => {
  const { language: lng } = useLanguage()
  const ret = useTranslation_(...args)
  const { i18n } = ret

  if (runsOnServerSide && i18n.resolvedLanguage !== lng) {
    i18n.changeLanguage(lng)
  }

  useEffect(() => {
    if (i18n.resolvedLanguage === lng) return
    // 実行されても client component が再レンダリングされない...
    i18n.changeLanguage(lng)
  }, [i18n, lng])

  return ret as Omit<typeof ret, 'i18n'> & {
    i18n: Omit<typeof i18n, 'language'> & { language: Language } // i18n.language に型付けしたい
  }
}
