import { SingleTypeQuiz } from '@/feature/tem-type-quiz/SingleTypeQuiz'
import { dictKeys } from '@/feature/tem-type-quiz/SingleTypeQuiz/dictKeys'
import { useTranslation } from '@/libs/i18n/i18n.server'
import { makeDict } from '@/libs/i18n/utils'

import type { PageProps } from '../../_types/PageProps'

const SingleTypeQuizPage = async ({ params: { lng } }: PageProps) => {
  const { t } = await useTranslation(lng, 'type-quiz')
  return <SingleTypeQuiz dict={makeDict(t, dictKeys)} />
}

export default SingleTypeQuizPage
