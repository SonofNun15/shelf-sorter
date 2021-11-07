import { createSelector } from '@ngrx/store';
import { GameDetail } from '../models/game-detail';
import { IStore } from '../store';
import { ShelfState } from './shelf.reducer';

export const selectShelfState = (state: IStore) => state.shelf;

export const selectGames = createSelector(
  selectShelfState,
  (state: ShelfState): GameDetail[] => state.ids.map(gameId => state.entities[gameId] as GameDetail),
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
