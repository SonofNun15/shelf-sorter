import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { ShelfService } from '../services/shelf.service';
import { IStore } from '../store';
import { addGame, gamesLoaded, loadGames, playGame, removeGame } from './shelf.actions';
import { selectGames } from './shelf.selectors';

@Injectable()
export class ShelfEffects implements OnInitEffects {
  loadGames$ = createEffect(() => this.actions$.pipe(
    ofType(loadGames),
    switchMap(() => this.shelfService.load().pipe(
      map(games => gamesLoaded({ games })),
      catchError(() => EMPTY)
    )),
  ));

  saveGames$ = createEffect(() => this.actions$.pipe(
    ofType(addGame, removeGame, playGame),
    concatLatestFrom(() => this.store.select(selectGames)),
    switchMap(([_, games]) => {
      return this.shelfService.save(games);
    }),
  ), { dispatch: false });

  ngrxOnInitEffects() {
    return loadGames();
  }

  constructor(
    private actions$: Actions,
    private store: Store<IStore>,
    private shelfService: ShelfService,
  ) {}
}
