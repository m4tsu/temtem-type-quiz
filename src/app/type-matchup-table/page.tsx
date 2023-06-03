import dynamic from 'next/dynamic'

const TypeMatchupTableWithoutSSR = dynamic(
  () => import('@/feature/type-matchup-table'),
  { ssr: false }
)

const TypeMatchupTablePage = () => {
  return <TypeMatchupTableWithoutSSR />
}

export default TypeMatchupTablePage
