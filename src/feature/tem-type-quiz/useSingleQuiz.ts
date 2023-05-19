import { useState } from "react";
import {
  SingleTypeQuiz,
  answerToSingleTypeQuiz,
  generateSingleTypeQuiz,
} from "../../models/tem-type-quiz";
import { TemTypeEffectiveNess } from "../../models/tem-type";

type Problem = {
  quiz: SingleTypeQuiz;
  status: "correct" | "incorrect" | "unanswered";
};

const generateProblems = () => {
  const problems: Problem[] = [];
  for (let i = 0; i < 10; i++) {
    problems.push({
      quiz: generateSingleTypeQuiz(),
      status: "unanswered",
    });
  }
  return problems;
};

const resetProblems = (problems: Problem[]): Problem[] => {
  return problems.map((p) => ({ ...p, status: "unanswered" }));
};

const MAX_ROUND = 10;

export const useSingleTypeQuiz = () => {
  const [round, setRound] = useState(1);
  const [problems, setProblems] = useState<Problem[]>(generateProblems());

  const isLastRound = round === MAX_ROUND;
  const correctCount = problems.filter((p) => p.status === "correct").length;
  const currentProblemIndex = round - 1;
  const currentProblem = problems[currentProblemIndex];
  const isEnded = isLastRound && currentProblem.status !== "unanswered";

  const answerCurrentProblem = (effectiveness: TemTypeEffectiveNess) => {
    const result = answerToSingleTypeQuiz(currentProblem.quiz, effectiveness);
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
    setProblems((prev) => resetProblems(prev));
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
