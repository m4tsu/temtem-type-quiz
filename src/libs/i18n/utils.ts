import type { DictKey, TFunc } from './i18n.server'

export type PropsWithDict<
  Keys extends readonly string[],
  // eslint-disable-next-line @typescript-eslint/ban-types
  T extends Record<string, unknown> = {}
> = {
  dict: Record<Keys[number], string>
} & T

export const makeDict = <Keys extends readonly DictKey[]>(
  t: TFunc,
  keys: Keys
): {
  [K in Keys[number]]: string
} => {
  const dict = {} as { [K in Keys[number]]: string }
  keys.forEach((key: Keys[number]) => {
    dict[key] = t(key)
  })
  return dict
}

// example
// const dictKeys = ['temtem', 'retry'] as const satisfies readonly DictKey[]
// client component
// 'use client'
// type Props = PropsWithDict<typeof dictKeys>
// const ClientComponent = ({ dict }: Props) => {
//   return (
//     <div>
//       {dict.temtem}
//     </div>
//   )
// }
// server component
// const Page = async () => {
//   const {t}  = await useTranslation(lng, 'namespace')
//   return (
//     <ClientComponent dict={makeDict(t, dictKeys)} />
//   )
// }
