import fs from 'fs'

import dataList from './knownTemtemSpecies.json' assert { type: 'json' }

import type { Species } from '../src/models/species'

const writeSpeciesData = async () => {
  // 最終進化系だけ抽出
  const speciesList: Species[] = dataList
    .filter((data) => data.evolution.evolves === false || !data.evolution.to)
    .map(
      (data) =>
        ({
          number: data.number,
          name: data.name,
          stats: data.stats,
          types: data.types,
          icon: data.icon,
        } as unknown as Species)
    )
  await fs.writeFileSync('./src/data/species.json', JSON.stringify(speciesList))
  console.log('write!!!!')
}

// exec
;(async () => {
  await writeSpeciesData()
})()
