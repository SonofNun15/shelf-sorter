import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameDetail } from 'src/app/models/game-detail';
import { IStore } from 'src/app/store';
import { removeGame } from '../shelf.actions';
import { selectGames } from '../shelf.selectors';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  games$: Observable<GameDetail[]>;

  constructor(private store: Store<IStore>) {
    this.games$ = this.store.select(selectGames);
  }

  removeGame(game: GameDetail) {
    this.store.dispatch(removeGame({ game }));
  }
}
