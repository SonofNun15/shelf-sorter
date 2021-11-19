export interface GameDetail {
  id: string;
  description: string;
  image: string;
  thumbnail: string;
  link: Link[];
  minPlayers: number;
  maxPlayers: number;
  minAge: number;
  minPlayTime: number;
  playingTime: number;
  maxPlayTime: number;
  name: string;
  alternateNames: string[];
  yearPublished: string;
}

export interface Link {
  id: string;
  type: BggType;
  value: string;
}

export type BggType = 'boardgamecategory' | 'boardgamemechanic' | 'boardgamefamily' | 'boardgameexpansion' | 'boardgamedesigner' | 'boardgameartist' | 'boardgamepublisher';

export const emptyGame: GameDetail = {
  id: '',
  description: '',
  image: '',
  thumbnail: '',
  link: [],
  minPlayers: 0,
  maxPlayers: 0,
  minAge: 0,
  minPlayTime: 0,
  playingTime: 0,
  maxPlayTime: 0,
  name: '',
  alternateNames: [],
  yearPublished: '',
};
