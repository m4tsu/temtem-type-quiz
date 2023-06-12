import { MultipleTypeQuiz } from '@/feature/tem-type-quiz/MutipleTypeQuiz'
import { dictKeys } from '@/feature/tem-type-quiz/MutipleTypeQuiz/dictKeys'
import { useTranslation } from '@/libs/i18n/i18n.server'
import { makeDict } from '@/libs/i18n/utils'

import type { PageProps } from '../../_types/PageProps'

const MultipleTypeQuizPage = async ({ params: { lng } }: PageProps) => {
  const { t } = await useTranslation(lng, 'type-quiz')
  return <MultipleTypeQuiz dict={makeDict(t, dictKeys)} />
}

export default MultipleTypeQuizPage
