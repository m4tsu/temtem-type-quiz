'use client'
import { useState } from 'react'

import type { TemType } from '@/models/tem-type'

type Guess = [TemType] | [TemType, TemType]

const MAX_SELECTED_TYPE_COUNT = 2

export const isValidGuess = (types: TemType[]): types is Guess => {
  return types.length === 1 || types.length === 2
}

export const useSpeciesTypesGuess = () => {
  const [selectedTypes, setSelectedTypes] = useState<TemType[]>([])

  const toggleType = (type: TemType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes((prev) => prev.filter((t) => t !== type))
    } else if (selectedTypes.length < MAX_SELECTED_TYPE_COUNT) {
      setSelectedTypes((prev) => [...prev, type])
    } else {
      setSelectedTypes((prev) => {
        const lastItem = prev.at(-1)
        if (lastItem === undefined) {
          throw new Error('lastItem is undefined')
        }
        return [lastItem, type]
      })
    }
  }

  const resetSelectedTypes = () => {
    setSelectedTypes([])
  }

  return {
    selectedTypes,
    toggleType,
    resetSelectedTypes,
  }
}
