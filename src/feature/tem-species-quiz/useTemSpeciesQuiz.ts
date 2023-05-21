import { useState } from "react";
import {
  Species,
  findSpecies,
  pickRandomSpeciesNumber,
} from "@/models/species";
import { TemType } from "@/models/tem-type";
import { answerToSpeciesQuiz } from "@/models/species-quiz";
import { shuffleArray } from "@/utils/shuffleArray";

type Problem = {
  species: Species;
  status: "correct" | "incorrect" | "unanswered";
};

const MAX_ROUND = 12;

const generateProblems = () => {
  const generateUniquNumbers = () => {
    const numbers: number[] = [];
    while (numbers.length < MAX_ROUND) {
      const number = pickRandomSpeciesNumber();
      if (!numbers.includes(number)) {
        numbers.push(number);
      }
    }
    return numbers;
  };
  const problems: Problem[] = generateUniquNumbers().map((number) => ({
    species: findSpecies(number),
    status: "unanswered",
  }));
  return problems;
};

const resetProblems = (problems: Problem[]): Problem[] => {
  return problems.map((p) => ({ ...p, status: "unanswered" }));
};

export const useTemSpeciesQuiz = () => {
  const [round, setRound] = useState(1);
  const [problems, setProblems] = useState<Problem[]>(generateProblems());

  const isLastRound = round === MAX_ROUND;
  const correctCount = problems.filter((p) => p.status === "correct").length;
  const currentProblemIndex = round - 1;
  const currentProblem = problems[currentProblemIndex];
  const isEnded = isLastRound && currentProblem.status !== "unanswered";

  const answerCurrentProblem = (guess: [TemType] | [TemType, TemType]) => {
    const result = answerToSpeciesQuiz(currentProblem.species, guess);
    setProblems((prevProblems) => {
      const newProblems = [...prevProblems];
      newProblems[currentProblemIndex] = {
        ...currentProblem,
        status: result,
      };
      return newProblems;
    });
    if (!isLastRound) {
      setRound(round + 1);
    }
  };

  const reset = () => {
    setRound(1);
    setProblems((prev) => shuffleArray(resetProblems(prev)));
  };

  const regenerateProblems = () => {
    setRound(1);
    setProblems(generateProblems());
  };

  return {
    round,
    problems,
    isEnded,
    correctCount,
    currentProblem,
    answerCurrentProblem,
    reset,
    regenerateProblems,
  };
};
