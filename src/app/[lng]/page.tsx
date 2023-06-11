import Link from 'next/link'

import { useTranslation } from '@/libs/i18n/i18n.server'
import type { Language } from '@/libs/i18n/settings'

const linkClassName =
  'text-xl font-bold text-white hover:underline underline-offset-2'

type Props = {
  params: { lng: Language }
}
const HomePage = async ({ params: { lng } }: Props) => {
  const { t } = await useTranslation(lng, 'home-page')

  return (
    <div>
      <div className="flex flex-col gap-4">
        <Link href={`/${lng}/type-quiz/single`} className={linkClassName}>
          {t('type-compatibility-quiz-single')}
        </Link>
        <Link href={`/${lng}/type-quiz/multiple`} className={linkClassName}>
          {t('type-compatibility-quiz-multiple')}
        </Link>
        <Link href={`/${lng}/type-quiz/species`} className={linkClassName}>
          {t('temtem-type-quiz')}
        </Link>
        <Link href={`/${lng}/type-matchup-table`} className={linkClassName}>
          {t('type-matchup-chart')}
        </Link>
        <Link href={`/${lng}/tv-calc`} className={linkClassName}>
          {t('tv-distribution-calculator')}
        </Link>
      </div>
    </div>
  )
}

export default HomePage
