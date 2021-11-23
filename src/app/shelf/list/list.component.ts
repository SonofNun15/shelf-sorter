import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, startWith, Subscription, withLatestFrom } from 'rxjs';
import { GamePlay } from 'src/app/models/game-play';
import { GameRecord } from 'src/app/models/game-record';
import { IStore } from 'src/app/store';
import { isNullOrWhitespace } from 'src/app/utils/string';
import { AddPlayDialogComponent } from '../add-play-dialog/add-play-dialog.component';
import { PlaysDisplayDialogComponent, PlaysDisplayDialogData } from '../plays-display-dialog/plays-display-dialog.component';
import { addToQueue } from '../queue.actions';
import { playGame, rateGame, removeGame } from '../shelf.actions';
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

  constructor(
    private store: Store<IStore>,
    private dialog: MatDialog,
  ) {
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
    this.dialog.open<AddPlayDialogComponent, GameRecord>(AddPlayDialogComponent, {
      data: game,
    });
  }

  showPlays(game: GameRecord) {
    this.dialog.open<PlaysDisplayDialogComponent, PlaysDisplayDialogData>(PlaysDisplayDialogComponent, {
      data: { gameId: game.id },
    });
  }

  removeGame(game: GameRecord) {
    this.store.dispatch(removeGame({ game }));
  }

  rateGame(game: GameRecord, rating: number | null) {
    this.store.dispatch(rateGame({ gameId: game.id, rating }));
  }
}
