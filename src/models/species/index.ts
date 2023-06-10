import { speciesJaNameMap, speciesMap, speciesNumberList } from '@/data/species'
import type { Language } from '@/libs/i18next/types'
import { randomInt } from '@/utils/randomInt'

import type { TemType } from '../tem-type'

export type Stats = {
  hp: number
  sta: number
  spd: number
  atk: number
  def: number
  spatk: number
  spdef: number
}

export type BaseStats = Stats & {
  total: number
}

export type Species = {
  number: number
  name: string
  types: readonly [TemType] | readonly [TemType, TemType]
  icon: string
  stats: BaseStats
}

export const pickRandomSpeciesNumber = () => {
  const numberIndex = randomInt(0, speciesNumberList.length - 1)
  const number = speciesNumberList[numberIndex]
  return number
}

export const findSpecies = (speciesNumber: number): Species => {
  const s = speciesMap.get(speciesNumber)
  if (s === undefined) {
    throw new Error(`species(number: ${speciesNumber})not found`)
  }
  return s
}

export const getName = (species: Species, language: Language) => {
  if (language === 'ja') {
    return speciesJaNameMap[species.number].name
  }
  return species.name
}

export const getIconImageUrl = (species: Species) =>
  `https://temtem-api.mael.tech${species.icon}`
