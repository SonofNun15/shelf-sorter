import { emptyGame, GameDetail } from './game-detail';
import { GamePlay } from './game-play';

export interface GameRecord {
  id: string;
  description: string;
  image: string;
  thumbnail: string;
  minPlayers: number;
  maxPlayers: number;
  minAge: number;
  minPlayTime: number;
  playingTime: number;
  maxPlayTime: number;
  name: string;
  yearPublished: string;

  plays: GamePlay[],
  rating: number | null,
}

export function fromGameDetail(game: GameDetail): GameRecord {
  return {
    id: game.id,
    description: game.description,
    image: game.image,
    thumbnail: game.thumbnail,
    minPlayers: game.minPlayers,
    maxPlayers: game.maxPlayers,
    minAge: game.minAge,
    playingTime: game.playingTime,
    minPlayTime: game.minPlayTime,
    maxPlayTime: game.maxPlayTime,
    name: game.name,
    yearPublished: game.yearPublished,
    plays: [],
    rating: null,
  } as GameRecord;
}

export const emptyGameRecord = fromGameDetail(emptyGame);
