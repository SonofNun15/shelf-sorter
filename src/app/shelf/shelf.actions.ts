import { createAction, props } from "@ngrx/store";
import { GameDetail } from "../models/game-detail";

export const loadGames = createAction('[Shelf] Load games');
export const gamesLoaded = createAction('[Shelf] Games loaded', props<{ games: GameDetail[] }>());
export const saveGames = createAction('[Shelf] Save games');

export const addGame = createAction('[Shelf] Add game', props<{ game: GameDetail }>());
export const removeGame = createAction('[Shelf] Remove game', props<{ game: GameDetail }>());
