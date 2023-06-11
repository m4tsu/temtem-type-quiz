import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'

import { defaultNS } from './resources'
import { getOptions } from './settings'

import type { NameSpaces } from './resources'
import type { Language } from './settings'

const initI18next = async (lng: Language, ns: NameSpaces) => {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns))
  return i18nInstance
}

export const useTranslation = async (
  lng: Language,
  ns: NameSpaces = defaultNS
) => {
  const i18nextInstance = await initI18next(lng, ns)
  return {
    t: i18nextInstance.getFixedT<NameSpaces>(
      lng,
      ns
      // Array.isArray(ns) ? ns[0] : ns
      // options.keyPrefix
    ),
    i18n: i18nextInstance,
  }
}
