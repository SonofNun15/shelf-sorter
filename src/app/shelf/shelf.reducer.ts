import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { GameRecord } from '../models/game-record';
import { addGame, gamesLoaded, playGame, removeGame } from './shelf.actions';

export type ShelfState = EntityState<GameRecord>;

export const shelfAdapter = createEntityAdapter<GameRecord>({
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
  on(playGame, (state, { gameId, scores }) => {
    const game = state.entities[gameId];
    if (game != null) {
      return shelfAdapter.updateOne({
        id: gameId,
        changes: {
          plays: [...game.plays, {
            date: new Date(),
            scores,
          }],
        },
      }, state);
    } else {
      return state;
    }
  }),
);
