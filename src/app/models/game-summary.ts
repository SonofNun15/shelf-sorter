export interface GameSummary {
  id: string;
  name: string;
  yearPublished: string;
}

export const emptyGameSummary: GameSummary = {
  name: '',
  id: '',
  yearPublished: '',
};
