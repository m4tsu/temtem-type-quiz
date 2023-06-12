import type { Language } from '@/libs/i18n/settings'

// eslint-disable-next-line @typescript-eslint/ban-types
export type PageProps<T extends Record<string, unknown> = {}> = {
  params: {
    lng: Language
  }
} & T
