import { speciesMap, speciesNumberList } from "../../data/species";
import { randomInt } from "../../utils/randomInt";
import { TemType } from "../tem-type";

export type Species = {
  number: number;
  name: string;
  types: readonly [TemType] | readonly [TemType, TemType];
  icon: string;
};

export const pickRandomSpeciesNumber = () => {
  const numberIndex = randomInt(0, speciesNumberList.length - 1);
  const number = speciesNumberList[numberIndex];
  return number;
};

export const findSpecies = (speciesNumber: number): Species => {
  const s = speciesMap.get(speciesNumber);
  if (s === undefined) {
    throw new Error(`species(number: ${speciesNumber})not found`);
  }
  return s;
};
