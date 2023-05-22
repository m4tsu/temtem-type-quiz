import { randomInt } from "@/utils/randomInt";

import { TemTypes, calculateEffectiveness } from "../tem-type";

import type {
  TemType,
  TemTypeEffectiveNess,
  TemTypeEffectivenessAgainstMultiple,
} from "../tem-type";

export type SingleTypeQuiz = {
  attack: TemType;
  defense: TemType;
};

export type MultipleTypeQuiz = {
  attack: TemType;
  defense: [TemType] | [TemType, TemType];
};

const temTypeLength = TemTypes.length;

const pickRandomType = () => {
  const temTypeIndex = randomInt(0, temTypeLength - 1);
  return TemTypes[temTypeIndex];
};

export const generateSingleTypeQuiz = (): SingleTypeQuiz => {
  const attack = pickRandomType();
  const defense = pickRandomType();
  return { attack, defense };
};

export const generateMultipleTypeQuiz = (): MultipleTypeQuiz => {
  const attack = pickRandomType();

  // 単タイプと複合タイプの出る確率をそれなりに同じくらいにする
  const typesWithEmpty: (TemType | "Empty")[] = [...TemTypes, "Empty"];
  const defense1Index = randomInt(0, typesWithEmpty.length - 1);
  const defense1 = typesWithEmpty[defense1Index];

  const defense2 = pickRandomType();

  if (defense1 === "Empty") {
    return { attack, defense: [defense2] };
  }
  if (defense1 === defense2) {
    return { attack, defense: [defense1] };
  }
  return { attack, defense: [defense1, defense2] };
};

export type QuizResult = "correct" | "incorrect";
export const answerToSingleTypeQuiz = (
  quiz: SingleTypeQuiz,
  effectiveness: TemTypeEffectiveNess
): QuizResult => {
  const correctEffectiveness = calculateEffectiveness(quiz.attack, [
    quiz.defense,
  ]);
  if (effectiveness === correctEffectiveness) {
    return "correct";
  }
  return "incorrect";
};

export const answerToMultipleTypeQuiz = (
  quiz: MultipleTypeQuiz,
  effectiveness: TemTypeEffectivenessAgainstMultiple
): QuizResult => {
  const correctEffectiveness = calculateEffectiveness(
    quiz.attack,
    quiz.defense
  );
  if (effectiveness === correctEffectiveness) {
    return "correct";
  }
  return "incorrect";
};
