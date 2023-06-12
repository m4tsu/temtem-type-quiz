'use client'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { Button, Popover, Item, Select, ListBox } from 'react-aria-components'

import { useTranslation } from '@/libs/i18n/i18n'
import type { Language } from '@/libs/i18n/settings'
import { languages } from '@/libs/i18n/settings'

// eslint-disable-next-line no-useless-escape
const languagesPattern = new RegExp(`\/${languages.join('|')}`, 'gi')

export const LanguageSwitcher = () => {
  const { t } = useTranslation('translation')
  const router = useRouter()
  const pathname = usePathname()

  const changeLanguage = (language: Language) => {
    if (!pathname) throw new Error('pathname is not found')
    const nextPathname = pathname.replace(languagesPattern, language)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.push(nextPathname as any) // next の 自動生成する RouteType にキャストする手段わからず...
  }

  return (
    <Select
      aria-label="select language"
      onSelectionChange={(k) => {
        if (k === null) return
        changeLanguage(k as Language)
      }}
    >
      <Button
        aria-label="Langage"
        className="rounded-sm  border border-zinc-800 px-2 py-1 text-sm"
      >
        Language
      </Button>
      <Popover offset={0}>
        <ListBox className="rounded-sm border border-gray-600 bg-zinc-800 p-2  text-white">
          {languages.map((language) => (
            <Item
              key={language}
              id={language}
              className={({ isHovered }) =>
                clsx(isHovered && 'bg-zinc-600', 'px-2 py-1')
              }
            >
              {t(language)}
            </Item>
          ))}
        </ListBox>
      </Popover>
    </Select>
  )
}
