import type { DictKey } from '@/libs/i18n/i18n.server'

export const dictKeys = [
  'score',
  'retry',
  'another-quiz',
  'submit',
] as const satisfies readonly DictKey[]
