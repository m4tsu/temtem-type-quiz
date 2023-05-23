'use client'
import i18n from 'i18next'
import { useCallback } from 'react'
import {
  initReactI18next,
  useTranslation as useTranslation_,
} from 'react-i18next'

import homeEn from '@/locales/page/home/en.json'
import homeJa from '@/locales/page/home/ja.json'

import type { Language } from './types'

export const defaultNS = 'page' as const
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
  i18n.use(initReactI18next).init({
    lng: 'ja',
    ns: ['page'],
    defaultNS,
    resources,
  })
}

export const useTranslation = (...args: Parameters<typeof useTranslation_>) => {
  const res = useTranslation_(...args)
  return res as Omit<typeof res, 'i18n'> & {
    i18n: Omit<typeof i18n, 'language'> & { language: Language } // i18n.language に型付けしたい
  }
}

export const useLanguage = () => {
  const { i18n } = useTranslation()
  const changeLanguage = useCallback(
    (language: Language) => {
      i18n.changeLanguage(language)
    },
    [i18n]
  )
  return {
    changeLanguage,
    language: i18n.language,
  }
}
