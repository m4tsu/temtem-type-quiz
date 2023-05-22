"use client";
import { useState } from "react";

import type { TemTypeEffectivenessAgainstMultiple } from "@/models/tem-type";
import type { MultipleTypeQuiz } from "@/models/tem-type-quiz";
import {
  answerToMultipleTypeQuiz,
  generateMultipleTypeQuiz,
} from "@/models/tem-type-quiz";
import { shuffleArray } from "@/utils/shuffleArray";

type Problem = {
  quiz: MultipleTypeQuiz;
  status: "correct" | "incorrect" | "unanswered";
};

const MAX_ROUND = 12;

const generateProblems = () => {
  const problems: Problem[] = [];
  for (let i = 0; i < MAX_ROUND; i++) {
    problems.push({
      quiz: generateMultipleTypeQuiz(),
      status: "unanswered",
    });
  }
  return problems;
};

const resetProblems = (problems: Problem[]): Problem[] => {
  return problems.map((p) => ({ ...p, status: "unanswered" }));
};

export const useMultipleTypeQuiz = () => {
  const [round, setRound] = useState(1);
  const [problems, setProblems] = useState<Problem[]>(generateProblems());

  const isLastRound = round === MAX_ROUND;
  const correctCount = problems.filter((p) => p.status === "correct").length;
  const currentProblemIndex = round - 1;
  const currentProblem = problems[currentProblemIndex];
  const isEnded = isLastRound && currentProblem.status !== "unanswered";

  const answerCurrentProblem = (
    effectiveness: TemTypeEffectivenessAgainstMultiple
  ) => {
    const result = answerToMultipleTypeQuiz(currentProblem.quiz, effectiveness);
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
