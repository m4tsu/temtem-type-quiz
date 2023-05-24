import Link from 'next/link'

import { Container } from './_components/Container'
import { RootProviders } from './_providers'

import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <RootProviders>
        <body>
          <div className="flex min-h-screen flex-col  bg-zinc-900">
            <header className="border-b border-solid border-b-zinc-700">
              <Container>
                <nav className="flex items-center justify-between py-2">
                  <Link href="/" className="text-xl font-bold text-white">
                    TemTemQuiz
                  </Link>
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
