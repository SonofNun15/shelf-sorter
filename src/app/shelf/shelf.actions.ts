import { createAction, props } from "@ngrx/store";
import { GameRecord } from "../models/game-record";
import { Score } from "../models/score";

export const loadGames = createAction('[Shelf] Load games');
export const gamesLoaded = createAction('[Shelf] Games loaded', props<{ games: GameRecord[] }>());
export const saveGames = createAction('[Shelf] Save games');

export const addGame = createAction('[Shelf] Add game', props<{ game: GameRecord }>());
export const removeGame = createAction('[Shelf] Remove game', props<{ game: GameRecord }>());

export const playGame = createAction('[General] Play game', props<{ gameId: string, scores: Score[] | null }>());;
