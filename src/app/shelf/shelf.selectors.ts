import { createSelector } from '@ngrx/store';
import { GameRecord } from '../models/game-record';
import { IStore } from '../store';
import { ShelfState } from './shelf.reducer';

export const selectShelfState = (state: IStore) => state.shelf;

export const selectGames = createSelector(
  selectShelfState,
  (state: ShelfState): GameRecord[] => state.ids.map(gameId => state.entities[gameId] as GameRecord),
);

export const selectGameCount = createSelector(
  selectShelfState,
  (state: ShelfState) => state.ids.length,
);

export function selectGameOnShelf(gameId: string) {
  return createSelector(
    selectShelfState,
    (state: ShelfState) => state.entities[gameId] != null,
  );
}

export function selectGame(gameId: string) {
  return createSelector(
    selectShelfState,
    (state: ShelfState) => state.entities[gameId],
  );
}
