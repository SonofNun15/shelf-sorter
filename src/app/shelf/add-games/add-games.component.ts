import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { delay, Observable, Subject, switchMap, tap } from 'rxjs';
import { GameDetail } from 'src/app/models/game-detail';
import { GameSummary } from 'src/app/models/game-summary';
import { GameFinderService } from 'src/app/services/game-finder.service';
import { IStore } from 'src/app/store';
import { any } from 'src/app/utils/array';
import { exists } from 'src/app/utils/boolean';
import { addGame } from '../shelf.actions';

@Component({
  selector: 'app-add-games',
  templateUrl: './add-games.component.html',
  styleUrls: ['./add-games.component.scss']
})
export class AddGamesComponent {
  searchForm = new FormGroup({
    name: new FormControl(''),
  });

  searching = false;
  adding$: Observable<GameDetail> | null = null;
  searchSubject = new Subject<string>();
  results$: Observable<GameSummary[]>;

  @Output()
  close = new EventEmitter();

  constructor(
    private gameService: GameFinderService,
    private store: Store<IStore>,
  ) {
    this.results$ = this.searchSubject.asObservable().pipe(
      // delay(1500),
      switchMap(gameName => this.gameService.lookup(gameName)),
      tap(_ => this.searching = false),
    );
  }

  search({ name }: { name: string }) {
    this.searching = true;
    this.searchSubject.next(name);
  }

  exists(value: any) {
    return exists(value);
  }

  addGame(gameSummary: GameSummary) {
    this.adding$ = this.gameService.load(gameSummary).pipe(
      delay(4000),
      tap(game => this.store.dispatch(addGame({ game })))
    );
  }
}
