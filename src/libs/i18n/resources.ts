import homePageEn from './locales/en/home-page.json'
import resourceEn from './locales/en/resource.json'
import translationEn from './locales/en/translation.json'
import typeQuizSinglePageEn from './locales/en/type-quiz.json'
import homePageJa from './locales/ja/home-page.json'
import resourceJa from './locales/ja/resource.json'
import translationJa from './locales/ja/translation.json'
import typeQuizSinglePageJa from './locales/ja/type-quiz.json'

export const defaultNS = 'resource'
export const resources = {
  en: {
    [defaultNS]: resourceEn,
    'home-page': homePageEn,
    'type-quiz': typeQuizSinglePageEn,
    translation: translationEn,
  },
  ja: {
    [defaultNS]: resourceJa,
    'home-page': homePageJa,
    'type-quiz': typeQuizSinglePageJa,
    translation: translationJa,
  },
} as const

export type NameSpaces = keyof (typeof resources)['en']
