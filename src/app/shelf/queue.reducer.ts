import { createReducer, on } from '@ngrx/store';
import { addToQueue, moveDownInQueue, moveInQueue, moveToBottomOfQueue, moveToTopOfQueue, moveUpInQueue, queueLoaded, removeFromQueue } from './queue.actions';
import { playGame } from './shelf.actions';

export interface QueueState {
  games: string[];
}

export const initialState: QueueState = {
  games: [],
};

export const queueReducer = createReducer(
  initialState,
  on(queueLoaded, (_, { queue }) => {
    return {
      games: queue,
    };
  }),
  on(addToQueue, moveToBottomOfQueue, (state, { gameId }) => {
    const otherGames = withoutGame(state.games, gameId);
    return {
      games: otherGames.concat([gameId]),
    }
  }),
  on(playGame, removeFromQueue, (state, { gameId }) => {
    return {
      games: withoutGame(state.games, gameId),
    }
  }),
  on(moveToTopOfQueue, (state, { gameId }) => {
    const otherGames = withoutGame(state.games, gameId);
    return {
      games: [gameId, ...otherGames],
    };
  }),
  on(moveInQueue, (state, { gameId, position }) => {
    const otherGames = withoutGame(state.games, gameId);
    return {
      games: moveTo(gameId, otherGames, position),
    };
  }),
  on(moveUpInQueue, (state, { gameId }) => {
    const position = state.games.indexOf(gameId);
    const otherGames = withoutGame(state.games, gameId);
    return {
      games: moveTo(gameId, otherGames, position - 1),
    };
  }),
  on(moveDownInQueue, (state, { gameId }) => {
    const position = state.games.indexOf(gameId);
    const otherGames = withoutGame(state.games, gameId);
    return {
      games: moveTo(gameId, otherGames, position + 1),
    };
  }),
  on(moveToBottomOfQueue, (state, { gameId }) => {
    const otherGames = withoutGame(state.games, gameId);
    return {
      games: moveTo(gameId, otherGames, state.games.length),
    };
  }),
);

function moveTo(game: string, otherGames: string[], position: number): string[] {
  const front = otherGames.slice(0, position);
  const back = otherGames.slice(position, otherGames.length);
  return [...front, game, ...back];
}


function withoutGame(games: string[], game: string) {
  return games.filter(g => g !== game);
}
