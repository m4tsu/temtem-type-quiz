import type { Species } from '..'

const LEVEL = 100
export const calculateHP = (
  species: Species,
  { sv = 50, tv }: { sv?: number; tv: number }
) => {
  const base = species.stats
  const stats =
    ((1.5 * base.hp + sv + tv / 5) * LEVEL) / 80 +
    (sv * base.hp * LEVEL) / 20000 +
    LEVEL +
    15
  return Math.floor(stats)
}

type OthersStatusName = 'atk' | 'def' | 'spatk' | 'spdef'
export const calculateOthers = (
  species: Species,
  statusName: OthersStatusName,
  { sv = 50, tv }: { sv?: number; tv: number }
) => {
  const base = species.stats[statusName]
  const stats =
    ((1.5 * base + sv + tv / 5) * LEVEL) / 100 +
    (sv * base * LEVEL) / 25000 +
    10
  return Math.floor(stats)
}

/**
 * 総合耐久指数を計算する
 * (hp * def * spdef) / (def * spdef)
 */
export const calculateTotalDurabilityIndex = ({
  hp,
  def,
  spdef,
}: {
  hp: number
  def: number
  spdef: number
}) => {
  return (hp * def * spdef) / (def + spdef)
}

/** TVが0の時のstatsよりstatsが大きくなる最小のTVの値(HP) */
const getHpInterceptPointTv = (species: Species) => {
  const initial = calculateHP(species, { tv: 0 })
  for (let tv = 1; tv <= MAX_TV; tv++) {
    const stats = calculateHP(species, { tv })
    if (stats > initial) {
      return tv
    }
  }
  throw new Error('not found')
}

/** TVが0の時のstatsよりstatsが大きくなる最小のTVの値(ATK, DEF, SPATK, SPDEF) */
const getOthersInterceptPointTv = (
  species: Species,
  statusName: OthersStatusName
) => {
  const initial = calculateOthers(species, statusName, { tv: 0 })
  for (let tv = 1; tv <= MAX_TV; tv++) {
    const stats = calculateOthers(species, statusName, { tv })
    if (stats > initial) {
      return tv
    }
  }
  throw new Error('not found')
}

/** 割り振ることができるTVの合計の最大値 */
export const MAX_TOTAL_TV = 1000
/** 各ステータスに割り振ることができるTVの最大値 */
export const MAX_TV = 500

const HP_INCREMENT_INTERVAL = 4
const DEF_INCREMENT_INTERVAL = 5
const SPDEF_INCREMENT_INTERVAL = 5

/**
 * 総合耐久指数が最も高くなるような TV 配分を計算する
 */
export const calculateMostDurableTv = (species: Species, tvSum: number) => {
  type Result = {
    tvDistribution: {
      hp: number
      def: number
      spdef: number
      /** 余り */
      remainder: number
    }
    durabilityIndex: number
  }

  let result: Result = {
    tvDistribution: {
      hp: 0,
      def: 0,
      spdef: 0,
      remainder: 0,
    },
    durabilityIndex: calculateTotalDurabilityIndex({
      hp: calculateHP(species, { tv: 0 }),
      def: calculateOthers(species, 'def', { tv: 0 }),
      spdef: calculateOthers(species, 'spdef', { tv: 0 }),
    }),
  }

  const hpInterceptPointTv = getHpInterceptPointTv(species)
  const defInterceptPointTv = getOthersInterceptPointTv(species, 'def')
  const spdefInterceptPointTv = getOthersInterceptPointTv(species, 'spdef')

  const maxTvOfEachStats = Math.min(tvSum, MAX_TV)

  for (
    let i = 0;
    (i === 0 ? 0 : hpInterceptPointTv + HP_INCREMENT_INTERVAL * (i - 1)) <=
    maxTvOfEachStats;
    i++
  ) {
    const hp =
      i === 0 ? 0 : hpInterceptPointTv + HP_INCREMENT_INTERVAL * (i - 1)
    for (
      let j = 0;
      (j === 0 ? 0 : defInterceptPointTv + DEF_INCREMENT_INTERVAL * (j - 1)) <=
      Math.min(MAX_TV, tvSum - hp);
      j++
    ) {
      const def =
        j === 0 ? 0 : defInterceptPointTv + DEF_INCREMENT_INTERVAL * (j - 1)
      const spdef = Math.min(MAX_TV, tvSum - hp - def)

      const statsHp = calculateHP(species, { tv: hp })
      const statsDef = calculateOthers(species, 'def', { tv: def })
      const statsSpdef = calculateOthers(species, 'spdef', {
        tv: spdef,
      })
      const durabilityIndex = calculateTotalDurabilityIndex({
        hp: statsHp,
        def: statsDef,
        spdef: statsSpdef,
      })

      if (durabilityIndex > result.durabilityIndex) {
        result = {
          tvDistribution: {
            hp,
            def,
            spdef,
            remainder: 0,
          },
          durabilityIndex,
        }
      }
    }
  }

  // spdef は hp, def を余らないように振った後全て振るので余剰がある可能性がある。その場合はそれが分かるようにする
  const spdefRemainder =
    result.tvDistribution.spdef >= spdefInterceptPointTv
      ? (result.tvDistribution.spdef - spdefInterceptPointTv) %
        SPDEF_INCREMENT_INTERVAL
      : result.tvDistribution.spdef
  if (spdefRemainder !== 0) {
    result = {
      ...result,
      tvDistribution: {
        ...result.tvDistribution,
        spdef: result.tvDistribution.spdef - spdefRemainder,
        remainder: spdefRemainder,
      },
    }
  }

  return result
}
