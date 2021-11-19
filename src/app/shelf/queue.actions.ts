import { createAction, props } from "@ngrx/store";

export const loadQueue = createAction('[Queue] Load queue');
export const queueLoaded = createAction('[Queue] Queue loaded', props<{ queue: string[] }>());

export const addToQueue = createAction('[Queue] Add to queue', props<{ gameId: string }>());
export const removeFromQueue = createAction('[Queue] Remove from queue', props<{ gameId: string }>());
export const moveInQueue = createAction('[Queue] Move in queue', props<{ gameId: string, position: number }>());
export const moveToTopOfQueue = createAction('[Queue] Move to top of queue', props<{ gameId: string }>());
export const moveUpInQueue = createAction('[Queue] Move up in queue', props<{ gameId: string }>());
export const moveDownInQueue = createAction('[Queue] Move down in queue', props<{ gameId: string }>());
export const moveToBottomOfQueue = createAction('[Queue] Move to bottom of queue', props<{ gameId: string }>());
