import { defaultNS } from './resources'

export const fallbackLng = 'en'
export const languages = [fallbackLng, 'ja'] as const
export type Language = (typeof languages)[number]

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}
