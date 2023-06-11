'use client'
import { SSRProvider } from 'react-aria'

import { MantineProvider } from '@/components/ui'
import { LanguageProvider, initialize } from '@/libs/i18n/i18n'
import type { Language } from '@/libs/i18n/settings'

import type { FC, PropsWithChildren } from 'react'

initialize()
export const RootProviders: FC<PropsWithChildren<{ lng: Language }>> = ({
  children,
  lng,
}) => {
  return (
    <SSRProvider>
      <LanguageProvider lng={lng}>
        <MantineProvider
          theme={{ colorScheme: 'dark' }}
          withGlobalStyles
          withNormalizeCSS
        >
          {children}
        </MantineProvider>
      </LanguageProvider>
    </SSRProvider>
  )
}
