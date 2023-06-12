'use client'
import clsx from 'clsx'
import Image from 'next/image'

import { Button } from '@/components/ui/Button'
import type { PropsWithDict } from '@/libs/i18n/utils'
import type { TemTypeEffectivenessAgainstMultiple } from '@/models/tem-type'
import { calculateEffectiveness, temTypeImage } from '@/models/tem-type'

import { useMultipleTypeQuiz } from './useMultipleTypeQuiz'

import type { dictKeys } from './dictKeys'
import type { FC } from 'react'

const EffectivenessList = [
  0.25, 0.5, 1, 2, 4,
] satisfies TemTypeEffectivenessAgainstMultiple[]

type Props = PropsWithDict<typeof dictKeys>
export const MultipleTypeQuiz: FC<Props> = ({ dict }) => {
  const {
    round,
    problems,
    isEnded,
    correctCount,
    currentProblem,
    answerCurrentProblem,
    reset,
    regenerateProblems,
  } = useMultipleTypeQuiz()

  return (
    <div className="mx-auto flex max-w-xl flex-col justify-center gap-4">
      <div className="flex w-full flex-col items-center justify-center gap-4">
        {isEnded ? (
          <div className="text-lg font-bold">
            {dict.score}: {correctCount}/{problems.length}
          </div>
        ) : (
          <>
            <div className="text-lg font-bold">
              {`${round}/${problems.length}`}
            </div>
            <div className="flex w-full items-center justify-center">
              <Image
                src={temTypeImage(currentProblem.quiz.attack)}
                height={60}
                width={60}
                alt={currentProblem.quiz.attack}
              />
              <Image
                src="/arrow-right-solid.svg"
                alt={'against to'}
                height={40}
                width={40}
              />
              {currentProblem.quiz.defense.length === 1 ? (
                <Image
                  src={temTypeImage(currentProblem.quiz.defense[0])}
                  alt={currentProblem.quiz.defense[0]}
                  height={60}
                  width={60}
                />
              ) : (
                <div className="flex items-center">
                  <Image
                    src={temTypeImage(currentProblem.quiz.defense[0])}
                    alt={currentProblem.quiz.defense[0]}
                    height={60}
                    width={60}
                  />
                  <div className="text-3xl font-bold">+</div>
                  <Image
                    src={temTypeImage(currentProblem.quiz.defense[1])}
                    alt={currentProblem.quiz.defense[1]}
                    height={60}
                    width={60}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <hr className=" border-t-zinc-700" />
      <div className="flex flex-col gap-6">
        {isEnded ? (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
              <Button onPress={reset} className="w-full">
                {dict.retry}
              </Button>
              <Button onPress={regenerateProblems} className="w-full">
                {dict['another-quiz']}
              </Button>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-2">
              {problems.map((problem, i) => (
                <div
                  key={i}
                  className={clsx(
                    'flex w-full flex-col items-center justify-center rounded-md p-2',
                    problem.status === 'correct' ? 'bg-green-500' : 'bg-red-500'
                  )}
                >
                  <div className="flex w-full items-center justify-center">
                    <Image
                      src={temTypeImage(problem.quiz.attack)}
                      alt={problem.quiz.attack}
                      height={40}
                      width={40}
                    />
                    <Image
                      src="/arrow-right-solid.svg"
                      alt={'against to'}
                      height={25}
                      width={25}
                    />
                    {problem.quiz.defense.length === 1 ? (
                      <Image
                        src={temTypeImage(problem.quiz.defense[0])}
                        alt={problem.quiz.defense[0]}
                        height={40}
                        width={40}
                      />
                    ) : (
                      <div className="flex items-center">
                        <Image
                          src={temTypeImage(problem.quiz.defense[0])}
                          alt={problem.quiz.defense[0]}
                          height={40}
                          width={40}
                        />
                        <div className="text-3xl font-bold text-gray-900">
                          +
                        </div>
                        <Image
                          src={temTypeImage(problem.quiz.defense[1])}
                          alt={problem.quiz.defense[1]}
                          height={40}
                          width={40}
                        />
                      </div>
                    )}
                  </div>
                  <div className="text-center text-xl font-bold">
                    {calculateEffectiveness(
                      problem.quiz.attack,
                      problem.quiz.defense
                    )}
                    x
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {EffectivenessList.map((effectiveness) => (
              <Button
                key={`${effectiveness}`}
                onPress={() => {
                  answerCurrentProblem(effectiveness)
                }}
              >
                {effectiveness}x
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
