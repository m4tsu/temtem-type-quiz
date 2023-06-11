import dynamic from 'next/dynamic'

const TemSpeciesQuizWithoutSSR = dynamic(
  () => import('@/feature/tem-species-quiz'),
  { ssr: false }
)

const SpeciesPage = () => {
  return <TemSpeciesQuizWithoutSSR />
}
export default SpeciesPage
