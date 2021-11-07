import { Action, ActionReducer } from "@ngrx/store";
import { ShelfEffects } from "./shelf/shelf.effects";
import { shelfReducer, ShelfState } from "./shelf/shelf.reducer";

export interface IStore {
  shelf: ShelfState,
}

export const store: { [key in keyof IStore]: ActionReducer<any, Action> } = {
  shelf: shelfReducer,
};

export const effects = [
  ShelfEffects,
];
