'use client'
import clsx from 'clsx'
import Image from 'next/image'

import { Button } from '@/components/ui/Button'
import { imageLoader } from '@/libs/nextjs/imageLoader'
import type { TemTypeEffectiveNess } from '@/models/tem-type'
import { calculateEffectiveness, temTypeImage } from '@/models/tem-type'

import { useSingleTypeQuiz } from './useSingleQuiz'

const EffectivenessList = [0.5, 1, 2] satisfies TemTypeEffectiveNess[]

export const SingleTypeQuiz = () => {
  const {
    round,
    problems,
    isEnded,
    correctCount,
    currentProblem,
    answerCurrentProblem,
    reset,
    regenerateProblems,
  } = useSingleTypeQuiz()

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
            <div className="flex w-full items-center justify-center">
              <Image
                loader={imageLoader}
                src={temTypeImage(currentProblem.quiz.attack)}
                alt={currentProblem.quiz.attack}
                height={60}
                width={60}
              />
              <Image
                loader={imageLoader}
                src="/arrow-right-solid.svg"
                alt="against to"
                height={40}
                width={40}
              />
              <Image
                loader={imageLoader}
                src={temTypeImage(currentProblem.quiz.defense)}
                alt={currentProblem.quiz.defense}
                height={60}
                width={60}
              />
            </div>
          </>
        )}
      </div>
      <hr className=" border-t-zinc-700" />
      <div className="flex flex-col gap-6">
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
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
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
                      loader={imageLoader}
                      src={temTypeImage(problem.quiz.attack)}
                      alt={problem.quiz.attack}
                      height={40}
                      width={40}
                    />
                    <Image
                      loader={imageLoader}
                      src="/arrow-right-solid.svg"
                      alt="against to"
                      height={25}
                      width={25}
                    />
                    <Image
                      loader={imageLoader}
                      src={temTypeImage(problem.quiz.defense)}
                      alt={problem.quiz.defense}
                      height={40}
                      width={40}
                    />
                  </div>
                  <div className="text-center text-xl font-bold">
                    {calculateEffectiveness(problem.quiz.attack, [
                      problem.quiz.defense,
                    ])}
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
