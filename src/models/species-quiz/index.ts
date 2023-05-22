import type { Species } from "../species";
import type { TemType } from "../tem-type";

export type QuizResult = "correct" | "incorrect";
export const answerToSpeciesQuiz = (
  species: Species,
  guess: [TemType] | [TemType, TemType]
) => {
  const correctTypes = species.types;
  if (
    correctTypes.length === guess.length &&
    correctTypes.every((t) => guess.includes(t))
  ) {
    return "correct";
  }
  return "incorrect";
};
