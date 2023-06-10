import type { Species } from '@/models/species'

import JaNameJson from './species-ja.json'
import speciesJson from './species.json'

export const speciesList = speciesJson as unknown as readonly Species[]

export const speciesMap: Map<number, Species> = new Map(
  speciesList.map((species) => [species.number, species])
)

export const speciesNumberList = Array.from(speciesMap.keys())

export const speciesJaNameMap: {
  [number: number]: {
    number: number
    name: string
  }
} = JaNameJson
