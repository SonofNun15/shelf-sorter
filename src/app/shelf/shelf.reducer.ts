import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { GamePlay } from '../models/game-play';
import { GameRecord } from '../models/game-record';
import { addGame, gamesLoaded, playGame, removeGame, updatePlays } from './shelf.actions';

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
  on(playGame, (state, { gameId, play }) => {
    const game = state.entities[gameId];
    if (game != null) {
      return updateGamePlays(state, game, [...game.plays, play]);
    } else {
      return state;
    }
  }),
  on(updatePlays, (state, { gameId, plays }) => {
    const game = state.entities[gameId];
    if (game != null) {
      return updateGamePlays(state, game, plays);
    } else {
      return state;
    }
  }),
);

function updateGamePlays(state: ShelfState, game: GameRecord, plays: GamePlay[]) {
  return shelfAdapter.updateOne({
    id: game.id,
    changes: {
      plays,
    },
  }, state);
}
