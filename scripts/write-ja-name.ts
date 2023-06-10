import fs from 'fs'

import dataList from './tem-ja.json' assert { type: 'json' }

type TemJa = {
  number: number // 図鑑番号
  name: string // 日本語名
}

// tem-ja.json のデータ中の名前が "ティラナク(Tyranak)" のようになっているので日本語名としてカタカナだけ抜き出す
const extractName = (input: string) => {
  const katakanaRegex = /[\u30A1-\u30F6ー]+/g
  const katakanaMatches = input.match(katakanaRegex)

  if (katakanaMatches) {
    return katakanaMatches.join('')
  } else {
    return input
  }
}

const writeSpeciesJaData = async () => {
  // 最終進化系だけ抽出
  const speciesJa: {
    [key: number]: TemJa
  } = {}

  dataList.forEach((data) => {
    const number = Number(data['フィールド'])
    const name = extractName(data['名前'])
    speciesJa[number] = {
      number,
      name,
    }
  })
  await fs.writeFileSync(
    './src/data/species-ja.json',
    JSON.stringify(speciesJa)
  )
  console.log('write!!!!')
}

// exec
;(async () => {
  await writeSpeciesJaData()
})()
