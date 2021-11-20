import { Score } from "./score";

export interface GamePlay {
  date: Date;

  scores: Score[] | null;
}

export const emptyPlay = {
  date: new Date(),
  scores: [],
}
