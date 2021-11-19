
import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { QueueService } from '../services/queue.service';
import { IStore } from '../store';
import { addToQueue, loadQueue, moveDownInQueue, moveInQueue, moveToBottomOfQueue, moveToTopOfQueue, moveUpInQueue, queueLoaded, removeFromQueue } from './queue.actions';
import { selectQueueIds } from './queue.selectors';

@Injectable()
export class QueueEffects implements OnInitEffects {
  loadGames$ = createEffect(() => this.actions$.pipe(
    ofType(loadQueue),
    switchMap(() => this.queueService.load().pipe(
      map(queue => queueLoaded({ queue })),
      catchError(() => EMPTY)
    )),
  ));

  saveGames$ = createEffect(() => this.actions$.pipe(
    ofType(addToQueue, removeFromQueue, moveInQueue, moveToTopOfQueue, moveUpInQueue, moveDownInQueue, moveToBottomOfQueue),
    concatLatestFrom(() => this.store.select(selectQueueIds)),
    switchMap(([_, queue]) => {
      return this.queueService.save(queue);
    }),
  ), { dispatch: false });

  ngrxOnInitEffects() {
    return loadQueue();
  }

  constructor(
    private actions$: Actions,
    private store: Store<IStore>,
    private queueService: QueueService,
  ) {}
}
