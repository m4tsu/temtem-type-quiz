import resourceEn from './locales/en/resource.json'
import sampleEn from './locales/en/sample-page.json'
import resourceJa from './locales/ja/resource.json'
import sampleJa from './locales/ja/sample-page.json'

export const defaultNS = 'resource'
export const resources = {
  en: {
    [defaultNS]: resourceEn,
    'sample-page': sampleEn,
  },
  ja: {
    [defaultNS]: resourceJa,
    'sample-page': sampleJa,
  },
} as const

export type NameSpaces = keyof (typeof resources)['en']
