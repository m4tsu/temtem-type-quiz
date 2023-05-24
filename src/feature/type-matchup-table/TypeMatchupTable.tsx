'use client'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

import { Select } from '@/components/ui'
import { Button } from '@/components/ui/Button'
import { speciesList } from '@/data/species'
import { useLanguage } from '@/libs/i18next/i18n'
import { imageLoader } from '@/libs/nextjs/imageLoader'
import type { Species } from '@/models/species'
import { findSpecies, getIconImageUrl, getName } from '@/models/species'
import type { TemType } from '@/models/tem-type'
import {
  TemTypes,
  calculateEffectiveness,
  temTypeImage,
} from '@/models/tem-type'

import type { FC } from 'react'

type TemTemCellProps = {
  species: Species
}
const TemTemCell: FC<TemTemCellProps> = ({ species }) => {
  const { language } = useLanguage()

  return (
    <td className={cellClassName}>
      <div className="flex items-center gap-1">
        <Image
          height={48}
          width={48}
          loader={imageLoader}
          src={getIconImageUrl(species)}
          alt={species.name}
        />
        <div className="flex w-full flex-col items-center">
          <div className="flex">
            {species.types.map((type) => (
              <Image
                key={type}
                loader={imageLoader}
                src={temTypeImage(type)}
                alt={type}
                height={30}
                width={30}
              />
            ))}
          </div>
          <div className="text-md whitespace-nowrap text-center text-white">
            {getName(species, language)}
          </div>
        </div>
      </div>
    </td>
  )
}

type EffectivenessCellProps = {
  attack: TemType
  defense: Species['types']
}
const EffectivenessCell: FC<EffectivenessCellProps> = ({ attack, defense }) => {
  const effectiveness = calculateEffectiveness(attack, defense)

  if (effectiveness === 1) {
    return (
      <td className={clsx(cellClassName, 'min-w-[62px]')}>
        <div className="text-center text-lg font-bold text-white">-</div>
      </td>
    )
  }
  const colorClassName =
    effectiveness === 0.25
      ? 'bg-red-500'
      : effectiveness === 0.5
      ? 'bg-yellow-500'
      : effectiveness === 2
      ? 'bg-green-600'
      : 'bg-green-400'

  return (
    <td className={clsx(cellClassName, 'min-w-[62px]', colorClassName)}>
      <div className="text-md text-center  font-bold text-white">
        {effectiveness}x
      </div>
    </td>
  )
}

const speciesOptions = speciesList.map((species) => ({
  value: String(species.number),
  label: getName(species, 'ja'),
}))

const cellClassName = 'border border-zinc-700 p-1'

export const TypeMatchupTable: FC = () => {
  const [selectedSpeciesList, setSelectedSpeciesList] = useState<Species[]>([])
  const addSpecies = (speciesNumber: Species['number']) => {
    const species = findSpecies(speciesNumber)
    setSelectedSpeciesList((prev) => [...prev, species])
  }
  const removeSpecies = (speciesNumber: Species['number']) => {
    setSelectedSpeciesList((prev) =>
      prev.filter((s) => s.number !== speciesNumber)
    )
  }

  const [selectedSpeciesNumber, setSelectedSpeciesNumber] = useState<
    Species['number'] | null
  >(null)

  return (
    <div className="flex flex-col gap-4">
      <table className="w-full table-auto border-collapse border border-zinc-700">
        <thead>
          <tr>
            <th className={cellClassName} rowSpan={2}>
              種族
            </th>
            <th className={cellClassName} colSpan={TemTypes.length}>
              耐性
            </th>
            <th rowSpan={2} />
          </tr>
          <tr>
            {TemTypes.map((type) => (
              <th className={cellClassName} key={type}>
                <div className="flex justify-center">
                  <Image
                    loader={imageLoader}
                    src={temTypeImage(type)}
                    alt={type}
                    height={30}
                    width={30}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {selectedSpeciesList.map((species) => (
            <tr key={species.number}>
              <TemTemCell species={species} />
              {TemTypes.map((type) => (
                <EffectivenessCell
                  key={type}
                  attack={type}
                  defense={species.types}
                />
              ))}
              <td className={cellClassName}>
                <div className="flex justify-center">
                  <Button
                    aria-label="削除"
                    onPress={() => removeSpecies(species.number)}
                  >
                    ×
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center gap-4">
        <Select
          data={speciesOptions}
          onChange={(value) =>
            setSelectedSpeciesNumber(value ? Number(value) : null)
          }
          placeholder="Select TemTem"
          searchable
          nothingFound="Not Found"
          maxDropdownHeight={300}
        />
        <Button
          isDisabled={selectedSpeciesNumber === null}
          onPress={() =>
            selectedSpeciesNumber && addSpecies(selectedSpeciesNumber)
          }
        >
          追加
        </Button>
      </div>
    </div>
  )
}
