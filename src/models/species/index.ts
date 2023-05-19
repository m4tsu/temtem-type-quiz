import { TemType } from "../tem-type";

export type Species = {
  number: number;
  name: string;
  types: readonly [TemType] | readonly [TemType, TemType];
  icon: string;
};
