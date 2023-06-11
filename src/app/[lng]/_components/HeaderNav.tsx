import Link from 'next/link'

import { Container } from '@/app/_components/Container'
import type { Language } from '@/libs/i18n/settings'

import { LanguageSwitcher } from './LanguageSwitcher'

import type { FC } from 'react'

type Props = {
  lng: Language
}
export const HeaderNav: FC<Props> = ({ lng }) => {
  return (
    <header className="border-b border-solid border-b-zinc-700">
      <Container>
        <nav className="flex items-center justify-between py-2">
          <Link href={`/${lng}`} className="text-xl font-bold text-white">
            TemTem Utils
          </Link>
          <LanguageSwitcher />
        </nav>
      </Container>
    </header>
  )
}
