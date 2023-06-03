'use client'

import clsx from 'clsx'
import Image from 'next/image'

import { Button } from '@/components/ui/Button'
import { useLanguage } from '@/libs/i18next/i18n'
import { imageLoader } from '@/libs/nextjs/imageLoader'
import type { Species } from '@/models/species'
import { getName } from '@/models/species'
import { TemTypes, temTypeImage } from '@/models/tem-type'

import { isValidGuess, useSpeciesTypesGuess } from './useSpeciesTypesGuess'
import { useTemSpeciesQuiz } from './useTemSpeciesQuiz'

import type { FC } from 'react'

const iconImage = (species: Species) =>
  `https://temtem-api.mael.tech${species.icon}`

export const TemSpeciesQuiz: FC = () => {
  const { language } = useLanguage()
  const {
    round,
    problems,
    isEnded,
    correctCount,
    currentProblem,
    answerCurrentProblem,
    reset,
    regenerateProblems,
  } = useTemSpeciesQuiz()

  const { selectedTypes, toggleType, resetSelectedTypes } =
    useSpeciesTypesGuess()

  return (
    <div className="mx-auto flex max-w-xl flex-col justify-center gap-4">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        {isEnded ? (
          <div className="text-lg font-bold">
            正解: {correctCount}/{problems.length}
          </div>
        ) : (
          <>
            <div className="text-lg font-bold">
              {round}問目 ({`${problems.length}問中`})
            </div>
            {/* 種族名表示するか選べるようにする？ */}
            {/* <Flex direction="column" gap="4px" justify="center"> */}
            <div className="rounded-md border border-solid border-zinc-700">
              <Image
                unoptimized
                src={iconImage(currentProblem.species)}
                alt={currentProblem.species.name}
                height={80}
                width={80}
              />
            </div>
            {/* <Text align="center" size="md" fw="bold">
                {getName(currentProblem.species, language)}
              </Text> */}
            {/* </Flex> */}
          </>
        )}
      </div>
      <hr className=" border-t-zinc-700" />
      {isEnded ? (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            <Button onPress={reset} className="w-full" slot="aaaaaaa">
              もう一度
            </Button>
            <Button onPress={regenerateProblems} className="w-full">
              別の問題
            </Button>
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2">
            {problems.map((problem, i) => (
              <div
                key={i}
                className={clsx(
                  'flex w-full flex-col items-center justify-center gap-2 rounded-md p-2',
                  problem.status === 'correct' ? 'bg-green-500' : 'bg-red-500'
                )}
              >
                <div className="flex items-center gap-4">
                  <Image
                    unoptimized
                    className=" rounded-sm bg-zinc-800"
                    src={iconImage(problem.species)}
                    alt={getName(problem.species, language)}
                    height={50}
                    width={50}
                  />
                  <div className="flex justify-center">
                    {problem.species.types.map((type) => (
                      <Image
                        unoptimized
                        key={type}
                        src={temTypeImage(type)}
                        alt={type}
                        height={30}
                        width={30}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-md text-center font-bold text-zinc-100">
                  <div>{getName(problem.species, 'ja')}</div>
                  <div>{getName(problem.species, 'en')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col justify-center gap-4">
            <div className="text-center text-xl font-bold">選択中</div>
            <div className="flex justify-center gap-1 text-center text-xl font-bold">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="flex h-[60px] w-[60px] items-center justify-center rounded-md border border-zinc-800"
                >
                  {selectedTypes[i] ? (
                    <Image
                      unoptimized
                      src={temTypeImage(selectedTypes[i])}
                      alt={selectedTypes[i]}
                      height={40}
                      width={40}
                    />
                  ) : (
                    <div>*</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="mx-auto grid w-8/12 grid-cols-[repeat(auto-fill,minmax(60px,20%))] justify-center gap-4">
            {TemTypes.map((type) => (
              <div className="flex justify-center" key={type}>
                <Button
                  variant="outline"
                  onPress={() => toggleType(type)}
                  aria-label={type}
                  className=" h-fit w-fit rounded-full p-1.5"
                >
                  <Image
                    unoptimized
                    src={temTypeImage(type)}
                    alt={type}
                    height={50}
                    width={50}
                  />
                </Button>
              </div>
            ))}
          </div>
          <div className="mx-auto flex w-8/12 justify-center">
            {isValidGuess(selectedTypes) ? (
              <Button
                onPress={() => {
                  answerCurrentProblem(selectedTypes)
                  resetSelectedTypes()
                }}
                className="w-full"
              >
                決定
              </Button>
            ) : (
              <Button isDisabled className="w-full">
                決定
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
