'use client'

import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { createContext, useContext, useEffect } from 'react'
import {
  initReactI18next,
  useTranslation as useTranslation_,
} from 'react-i18next'

import homeEn from '@/locales/page/home/en.json'
import homeJa from '@/locales/page/home/ja.json'

import { getOptions } from './settings'

import type { Language } from './settings'
import type { FC, PropsWithChildren } from 'react'

export const defaultNS = 'page'
export const resources = {
  en: {
    page: {
      home: homeEn,
    },
  },
  ja: {
    page: {
      home: homeJa,
    },
  },
} as const

export const initialize = () => {
  i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(
      resourcesToBackend(
        (lng: string, ns: string) => import(`./locales/${lng}/${ns}.json`)
      )
    )
    .init({
      ...getOptions(),
      lng: 'en',
      detection: {
        order: ['path', 'htmlTag', 'cookie', 'navigator'],
      },
    })
  return i18n
}

const runsOnServerSide = typeof window === 'undefined'

const LanguageContext = createContext<Language | undefined>(undefined)
export const LanguageProvider: FC<PropsWithChildren<{ lng: Language }>> = ({
  lng,
  children,
}) => (
  <LanguageContext.Provider value={lng}>{children}</LanguageContext.Provider>
)
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
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (i18n.resolvedLanguage === lng) return
      i18n.changeLanguage(lng)
    }, [lng, i18n])
  }

  return ret as Omit<typeof ret, 'i18n'> & {
    i18n: Omit<typeof i18n, 'language'> & { language: Language } // i18n.language に型付けしたい
  }
}
