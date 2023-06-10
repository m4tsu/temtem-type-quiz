'use client'
import { useState } from 'react'
import { Input, Label, TextField } from 'react-aria-components'

import { Select } from '@/components/ui'
import { speciesList } from '@/data/species'
import type { Species, Stats } from '@/models/species'
import { getName } from '@/models/species'
import { findSpecies } from '@/models/species'
import {
  MAX_TOTAL_TV,
  calculateHP,
  calculateMostDurableTv,
  calculateOthers,
} from '@/models/species/stats'

import type { FC, PropsWithChildren } from 'react'

const speciesOptions = speciesList.map((species) => ({
  value: String(species.number),
  label: getName(species, 'ja'),
}))

const Tr: FC<PropsWithChildren> = ({ children }) => (
  <tr className="">{children}</tr>
)

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
        onChange={(value) => {
          if (value == null) return
          setSelectedSpeciesNumber(Number(value))
        }}
        placeholder="Select TemTem"
        searchable
        nothingFound="Not Found"
        maxDropdownHeight={300}
      />
      <table className="w-full table-auto border-collapse border border-zinc-700">
        <thead>
          <Tr>
            <Cell>
              {species.number}: {species.name}
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
                <Label>total TV</Label>
                <Input className="px-2" />
              </TextField>
            </Cell>
            <Cell>Stats</Cell>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Cell>HP</Cell>
            <Cell>{species.stats.hp}</Cell>
            <Cell>{tv.hp}</Cell>
            <Cell>{stats.hp}</Cell>
          </Tr>
          <Tr>
            <Cell>DEF</Cell>
            <Cell>{species.stats.def}</Cell>
            <Cell>{tv.def}</Cell>
            <Cell>{stats.def}</Cell>
          </Tr>
          <Tr>
            <Cell>SPDEF</Cell>
            <Cell>{species.stats.spdef}</Cell>
            <Cell>{tv.spdef}</Cell>
            <Cell>{stats.spdef}</Cell>
          </Tr>
          <Tr>
            <Cell>
              <span className="mx-1 italic">(H * B * D) / (B + D)</span>
            </Cell>
            <Cell>-</Cell>
            <Cell>{Math.floor(mostDurableTvResult.durabilityIndex)}</Cell>
            <Cell>-</Cell>
          </Tr>
        </tbody>
      </table>
    </div>
  )
}
