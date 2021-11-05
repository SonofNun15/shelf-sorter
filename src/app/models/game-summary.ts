export interface GameSummary {
  id: string;
  name: string;
  publishYear: string;
}

export const emptyGameSummary = {
  name: '',
  id: '',
  publishYear: '',
};
