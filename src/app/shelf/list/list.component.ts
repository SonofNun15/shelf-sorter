import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, startWith, Subscription, withLatestFrom } from 'rxjs';
import { GameRecord } from 'src/app/models/game-record';
import { IStore } from 'src/app/store';
import { isNullOrWhitespace } from 'src/app/utils/string';
import { addToQueue } from '../queue.actions';
import { playGame, removeGame } from '../shelf.actions';
import { selectGameCount, selectGames } from '../shelf.selectors';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnDestroy {
  filterCtrl = new FormControl('');
  filter$: Observable<string>;

  private sub: Subscription;
  games: GameRecord[] = [];
  totalGameCount = 0;
  gameCount = 0;

  @Output()
  addGameToShelf = new EventEmitter();

  constructor(private store: Store<IStore>) {
    this.filter$ = this.filterCtrl.valueChanges.pipe(
      startWith(''),
    );

    this.sub = combineLatest([
      this.store.select(selectGames),
      this.filter$,
    ]).pipe(
      map(([games, filter]) => {
        this.totalGameCount = games?.length ?? 0;
        return isNullOrWhitespace(filter)
          ? games
          : games.filter(game => game.name.toLowerCase().includes(filter.toLowerCase()))
      }),
    ).subscribe(games => {
      this.games = games ?? [];
      this.gameCount = games?.length ?? 0;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  addGameToQueue(game: GameRecord) {
    this.store.dispatch(addToQueue({ gameId: game.id }));
  }

  play(game: GameRecord) {
    this.store.dispatch(playGame({ gameId: game.id, scores: null }));
  }

  removeGame(game: GameRecord) {
    this.store.dispatch(removeGame({ game }));
  }
}
