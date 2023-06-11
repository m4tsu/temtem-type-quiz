import { dir } from 'i18next'
import Link from 'next/link'

import { useTranslation } from '@/libs/i18n/i18n.server'
import type { Language } from '@/libs/i18n/settings'
import { languages } from '@/libs/i18n/settings'

import { Container } from '../_components/Container'

import { RootProviders } from './_providers'

import './globals.css'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default async function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode
  params: { lng: Language }
}) {
  const { t } = await useTranslation(lng, 'sample-page')

  return (
    <html lang={lng} dir={dir(lng)}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <RootProviders lng={lng}>
        <body>
          <div className="flex min-h-screen flex-col  bg-zinc-900">
            <header className="border-b border-solid border-b-zinc-700">
              <Container>
                <nav className="flex items-center justify-between py-2">
                  <Link
                    href={`/${lng}`}
                    className="text-xl font-bold text-white"
                  >
                    TemTem Utils
                  </Link>
                  <p>{t('title')}</p>
                </nav>
              </Container>
            </header>
            <main className="grow pt-8 text-white">
              <Container>{children}</Container>
            </main>
            <footer className="py-2">
              {/* <Container>Footer</Container> */}
            </footer>
          </div>
        </body>
      </RootProviders>
    </html>
  )
}
