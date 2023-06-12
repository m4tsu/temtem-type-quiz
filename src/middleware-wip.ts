import acceptLanguage from 'accept-language'
import { NextResponse } from 'next/server'

import { languages, fallbackLng } from '@/libs/i18n/settings'

import type { NextRequest } from 'next/server'

// 引数が reandonly をうけつけてないので回避
acceptLanguage.languages(languages as unknown as string[])

export const config = {
  // matcher: '/:lng*'
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|images).*)',
  ],
}

const cookieName = 'i18next'

export function middleware(req: NextRequest) {
  let lng: string | null = null
  console.log('middleware', req)
  if (req.cookies.has(cookieName)) {
    lng = acceptLanguage.get(req.cookies.get(cookieName)?.value)
  }
  if (!lng) {
    lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  }
  if (!lng) {
    lng = fallbackLng
  }

  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
    )
  }

  if (req.headers.has('referer')) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const refererUrl = new URL(req.headers.get('referer')!)
    const lngInReferer = languages.find((l) =>
      refererUrl.pathname.startsWith(`/${l}`)
    )
    const response = NextResponse.next()
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
    return response
  }

  return NextResponse.next()
}
