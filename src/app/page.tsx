import Link from 'next/link'

const linkClassName =
  'text-xl font-bold text-white hover:underline underline-offset-2'

const HomePage = () => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <Link href="/type-quiz/single" className={linkClassName}>
          タイプ相性（単）
        </Link>
        <Link href="/type-quiz/multiple" className={linkClassName}>
          タイプ相性（複合）
        </Link>
        <Link href="/type-quiz/species" className={linkClassName}>
          種族
        </Link>
        <Link href="/type-matchup-table" className={linkClassName}>
          耐性表
        </Link>
        <Link href="/tv-calc" className={linkClassName}>
          Tv Calc
        </Link>
      </div>
    </div>
  )
}

export default HomePage
