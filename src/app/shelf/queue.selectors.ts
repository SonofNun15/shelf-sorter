import { createSelector } from '@ngrx/store';
import { GameRecord } from '../models/game-record';
import { IStore } from '../store';
import { QueueState } from './queue.reducer';
import { ShelfState } from './shelf.reducer';
import { selectShelfState } from './shelf.selectors';

export const selectQueueState = (state: IStore) => state.queue;

export const selectQueueIds = createSelector(
  selectQueueState,
  (queueState: QueueState) => queueState.games,
);

export const selectQueue = createSelector(
  selectShelfState,
  selectQueueIds,
  (shelfState: ShelfState, queue): GameRecord[] =>
    queue.map(gameId => shelfState.entities[gameId] as GameRecord),
);
