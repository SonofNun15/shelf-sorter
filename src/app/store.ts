import { Action, ActionReducer } from "@ngrx/store";
import { QueueEffects } from "./shelf/queue.effects";
import { queueReducer, QueueState } from "./shelf/queue.reducer";
import { ShelfEffects } from "./shelf/shelf.effects";
import { shelfReducer, ShelfState } from "./shelf/shelf.reducer";

export interface IStore {
  shelf: ShelfState,
  queue: QueueState,
}

export const store: { [key in keyof IStore]: ActionReducer<any, Action> } = {
  shelf: shelfReducer,
  queue: queueReducer,
};

export const effects = [
  ShelfEffects,
  QueueEffects,
];
