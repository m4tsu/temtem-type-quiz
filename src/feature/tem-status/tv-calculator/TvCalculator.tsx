'use client'
import { useState } from 'react'

import { TemSelect } from '@/feature/tem-utils/TemSelect'
import type { Species } from '@/models/species'

import { TvCalculatorTable } from './TvCalculatorTable'

import type { FC } from 'react'

export const TvCalculator: FC = () => {
  const [selectedTem, setSelectedTem] = useState<Species | null>(null)

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
      <div className="flex">
        <TemSelect selectedTem={selectedTem} onSelectTem={setSelectedTem} />
      </div>
      {selectedTem && <TvCalculatorTable species={selectedTem} />}
    </div>
  )
}
