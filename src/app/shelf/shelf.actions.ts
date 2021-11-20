import { createAction, props } from "@ngrx/store";
import { GamePlay } from "../models/game-play";
import { GameRecord } from "../models/game-record";

export const loadGames = createAction('[Shelf] Load games');
export const gamesLoaded = createAction('[Shelf] Games loaded', props<{ games: GameRecord[] }>());
export const saveGames = createAction('[Shelf] Save games');

export const addGame = createAction('[Shelf] Add game', props<{ game: GameRecord }>());
export const removeGame = createAction('[Shelf] Remove game', props<{ game: GameRecord }>());

export const playGame = createAction('[General] Play game', props<{ gameId: string, play: GamePlay }>());
export const updatePlays = createAction('[General] Update game plays', props<{ gameId: string, plays: GamePlay[] }>());
