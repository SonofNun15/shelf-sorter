import { Score } from "./score";

export interface GamePlay {
  date: Date;

  scores: Score[] | null;
}
