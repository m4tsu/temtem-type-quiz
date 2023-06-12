import TemSpeciesQuiz from '@/feature/tem-species-quiz'
import { dictKeys } from '@/feature/tem-species-quiz/dictKeys'
import { useTranslation } from '@/libs/i18n/i18n.server'
import { makeDict } from '@/libs/i18n/utils'

import type { PageProps } from '../../_types/PageProps'

const SpeciesPage = async ({ params: { lng } }: PageProps) => {
  const { t } = await useTranslation(lng, 'type-quiz')
  return <TemSpeciesQuiz dict={makeDict(t, dictKeys)} />
}
export default SpeciesPage
