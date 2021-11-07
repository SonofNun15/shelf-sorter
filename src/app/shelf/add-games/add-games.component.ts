import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { delay, Observable, Subject, switchMap } from 'rxjs';
import { GameSummary } from 'src/app/models/game-summary';
import { GameFinderService } from 'src/app/services/game-finder.service';
import { IStore } from 'src/app/store';
import { addGame } from '../shelf.actions';
import { selectGameOnShelf } from '../shelf.selectors';

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
  games: GameSummary[] | null = null
  adding: GameSummary | null = null;
  searchSubject = new Subject<string>();

  @Output()
  close = new EventEmitter();

  constructor(
    private gameService: GameFinderService,
    private store: Store<IStore>,
  ) {
    this.searchSubject.asObservable().pipe(
      switchMap(gameName => this.gameService.lookup(gameName)),
    ).subscribe(games => {
      this.games = games;
      this.searching = false;
    });
  }

  search({ name }: { name: string }) {
    this.searching = true;
    this.searchSubject.next(name);
  }

  addGame(gameSummary: GameSummary) {
    this.adding = gameSummary;
    this.gameService.load(gameSummary).subscribe(game => {
      this.store.dispatch(addGame({ game }));
      this.adding = null;
    });
  }

  onShelf(gameSummary: GameSummary): Observable<boolean> {
    return this.store.select(selectGameOnShelf(gameSummary.id));
  }
}
