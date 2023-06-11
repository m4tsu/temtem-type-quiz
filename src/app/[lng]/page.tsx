import Link from 'next/link'

import type { Language } from '@/libs/i18n/settings'

const linkClassName =
  'text-xl font-bold text-white hover:underline underline-offset-2'

type Props = {
  params: { lng: Language }
}
const HomePage = ({ params: { lng } }: Props) => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <Link href={`/${lng}/type-quiz/single`} className={linkClassName}>
          タイプ相性（単）
        </Link>
        <Link href={`/${lng}/type-quiz/multiple`} className={linkClassName}>
          タイプ相性（複合）
        </Link>
        <Link href={`/${lng}/type-quiz/species`} className={linkClassName}>
          種族
        </Link>
        <Link href={`/${lng}/type-matchup-table`} className={linkClassName}>
          耐性表
        </Link>
        <Link href={`/${lng}/tv-calc`} className={linkClassName}>
          耐久計算期
        </Link>
      </div>
    </div>
  )
}

export default HomePage
