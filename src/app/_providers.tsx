'use client'
import { SSRProvider } from 'react-aria'

import { MantineProvider } from '@/components/ui'
import { initialize } from '@/libs/i18next/i18n'

import type { FC, PropsWithChildren } from 'react'

initialize()

export const RootProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SSRProvider>
      <MantineProvider
        theme={{ colorScheme: 'dark' }}
        withGlobalStyles
        withNormalizeCSS
      >
        {children}
      </MantineProvider>
    </SSRProvider>
  )
}
