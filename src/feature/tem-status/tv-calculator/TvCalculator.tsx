'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Input, Label, TextField } from 'react-aria-components'

import { Select } from '@/components/ui'
import { speciesList } from '@/data/species'
import type { Species, Stats } from '@/models/species'
import { getIconImageUrl } from '@/models/species'
import { getName } from '@/models/species'
import { findSpecies } from '@/models/species'
import {
  MAX_TOTAL_TV,
  calculateHP,
  calculateMostDurableTv,
  calculateOthers,
} from '@/models/species/stats'
import { katakanaToHiragana } from '@/utils/kana'

import type { FC, PropsWithChildren } from 'react'

type Option = {
  value: string
  label: string
}
const speciesOptions: Option[] = speciesList.map((species) => ({
  value: String(species.number),
  label: getName(species, 'ja'),
}))

const Cell: FC<PropsWithChildren> = ({ children }) => (
  <th className="border border-zinc-700 p-2">{children}</th>
)

export const TvCalculator: FC = () => {
  const [selectedSpeciesNumber, setSelectedSpeciesNumber] =
    useState<Species['number']>(1)
  const species = findSpecies(selectedSpeciesNumber)
  const [totalTv, setTotalTv] = useState(1000)

  const mostDurableTvResult = calculateMostDurableTv(species, totalTv)

  const tv = mostDurableTvResult.tvDistribution

  const stats: Pick<Stats, 'hp' | 'def' | 'spdef'> = {
    hp: calculateHP(species, { tv: tv.hp }),
    def: calculateOthers(species, 'def', { tv: tv.def }),
    spdef: calculateOthers(species, 'spdef', {
      tv: tv.spdef,
    }),
  }

  return (
    <div className="flex flex-col gap-4 ">
      <div>
        <h2 className="text-lg font-bold">耐久TV計算機</h2>
        <p className="text-xs text-gray-300 ">
          耐久に割り振るTVの合計値から、{' '}
          <span className="mx-1 italic">(H * B * D) / (B + D)</span>
          が最大になる配分を算出します
        </p>
      </div>

      <Select
        data={speciesOptions}
        value={String(selectedSpeciesNumber)}
        onChange={(value) => {
          if (value == null) return
          setSelectedSpeciesNumber(Number(value))
        }}
        placeholder="Select TemTem"
        searchable
        nothingFound="Not Found"
        maxDropdownHeight={300}
        filter={(value, item: Option) => {
          if (item.label.toLowerCase().includes(value.toLowerCase()))
            return true
          if (katakanaToHiragana(item.label).includes(value)) return true
          return false
        }}
      />
      <table className="w-full table-auto border-collapse border border-zinc-700">
        <thead>
          <tr>
            <Cell>
              <div className="flex flex-col items-center gap-1">
                <Image
                  height={48}
                  width={48}
                  src={getIconImageUrl(species)}
                  alt={species.name}
                />
                {getName(species, 'ja')}
              </div>
            </Cell>
            <Cell>Base</Cell>
            <Cell>
              <TextField
                className="flex gap-2"
                type="number"
                minLength={0}
                maxLength={MAX_TOTAL_TV}
                value={String(totalTv)}
                onChange={(v) => setTotalTv(Number(v))}
              >
                <Label>total TV:</Label>
                <Input className="px-2" />
              </TextField>
            </Cell>
            <Cell>Stats</Cell>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Cell>HP</Cell>
            <Cell>{species.stats.hp}</Cell>
            <Cell>{tv.hp}</Cell>
            <Cell>{stats.hp}</Cell>
          </tr>
          <tr>
            <Cell>DEF</Cell>
            <Cell>{species.stats.def}</Cell>
            <Cell>{tv.def}</Cell>
            <Cell>{stats.def}</Cell>
          </tr>
          <tr>
            <Cell>SPDEF</Cell>
            <Cell>{species.stats.spdef}</Cell>
            <Cell>{tv.spdef}</Cell>
            <Cell>{stats.spdef}</Cell>
          </tr>
          <tr>
            <Cell>
              <span className="italic tracking-widest">
                (H * B * D) / (B + D)
              </span>
            </Cell>
            <Cell>-</Cell>
            <Cell>{Math.floor(mostDurableTvResult.durabilityIndex)}</Cell>
            <Cell>-</Cell>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
