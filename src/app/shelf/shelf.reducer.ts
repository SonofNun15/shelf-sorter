import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { GameDetail } from '../models/game-detail';
import { addGame, gamesLoaded, removeGame } from './shelf.actions';

export type ShelfState = EntityState<GameDetail>;

export const shelfAdapter = createEntityAdapter<GameDetail>({
  selectId: game => game.id,
  sortComparer: (g1, g2) => g1?.name?.localeCompare(g2?.name),
});

export const initialState: ShelfState = shelfAdapter.getInitialState();

export const shelfReducer = createReducer(
  initialState,
  on(gamesLoaded, (state, { games }) => {
    return shelfAdapter.setAll(games, state);
  }),
  on(addGame, (state, { game }) => {
    return shelfAdapter.upsertOne(game, state);
  }),
  on(removeGame, (state, { game }) => {
    return shelfAdapter.removeOne(game.id, state);
  }),
);
