'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Input, Label, TextField } from 'react-aria-components'

import { useLanguage } from '@/libs/i18n/i18n'
import type { Species, Stats } from '@/models/species'
import { getIconImageUrl } from '@/models/species'
import { getName } from '@/models/species'
import {
  MAX_TOTAL_TV,
  calculateHP,
  calculateMostDurableTv,
  calculateOthers,
} from '@/models/species/stats'

import type { FC, PropsWithChildren } from 'react'

const Cell: FC<PropsWithChildren> = ({ children }) => (
  <th className="border border-zinc-700 p-2">{children}</th>
)

type Props = {
  species: Species
}
export const TvCalculatorTable: FC<Props> = ({ species }) => {
  const { language } = useLanguage()
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
              {getName(species, language)}
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
  )
}
