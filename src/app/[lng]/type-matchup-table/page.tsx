import TypeMatchupTable from '@/feature/type-matchup-table'
import { dictKeys } from '@/feature/type-matchup-table/dictKeys'
import { useTranslation } from '@/libs/i18n/i18n.server'
import { makeDict } from '@/libs/i18n/utils'

import type { PageProps } from '../_types/PageProps'

const TypeMatchupTablePage = async ({ params: { lng } }: PageProps) => {
  const { t } = await useTranslation(lng, 'resource')

  return <TypeMatchupTable dict={makeDict(t, dictKeys)} />
}

export default TypeMatchupTablePage
