import { useMemo } from 'react'

import type { SelectProps } from '@/components/ui'
import { Select } from '@/components/ui'
import { speciesList } from '@/data/species'
import { useLanguage } from '@/libs/i18next/i18n'
import type { Language } from '@/libs/i18next/types'
import type { Species } from '@/models/species'
import { findSpecies, getName } from '@/models/species'
import { katakanaToHiragana } from '@/utils/kana'

import type { FC } from 'react'

type Option = {
  value: string
  label: string
}
const getSpeciesOptions = (lang: Language): Option[] => {
  return speciesList.map((species) => ({
    value: String(species.number),
    label: getName(species, lang),
  }))
}

type Props = Omit<
  SelectProps,
  | 'data'
  | 'value'
  | 'onChange'
  | 'placeholder'
  | 'searchable'
  | 'nothingFound'
  | 'maxDropdownHeight'
  | 'filter'
> & {
  selectedTem: Species | null
  onSelectTem: (species: Species) => void
}
export const TemSelect: FC<Props> = ({
  onSelectTem,
  selectedTem,
  ...props
}) => {
  const { language } = useLanguage()
  const options = useMemo(() => getSpeciesOptions(language), [language])

  return (
    <Select
      {...props}
      data={options}
      value={String(selectedTem?.number)}
      onChange={(value) => {
        if (value == null) return
        onSelectTem(findSpecies(Number(value)))
      }}
      placeholder="Select TemTem"
      searchable
      nothingFound="Not Found"
      maxDropdownHeight={300}
      filter={(value, item: Option) => {
        if (item.label.toLowerCase().includes(value.toLowerCase())) return true
        if (katakanaToHiragana(item.label).includes(value)) return true
        return false
      }}
    />
  )
}
