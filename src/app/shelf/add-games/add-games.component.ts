import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  adding = new Set<string>();

  @Output()
  close = new EventEmitter();

  constructor(
    private gameService: GameFinderService,
    private store: Store<IStore>,
  ) {}

  search({ name }: { name: string }) {
    this.searching = true;
    this.gameService.lookup(name).subscribe(games => {
      this.games = games;
      this.searching = false;
    });
  }

  addGame(gameSummary: GameSummary) {
    this.adding.add(gameSummary.id);
    this.gameService.load(gameSummary).subscribe(game => {
      if (game != null) {
        this.store.dispatch(addGame({ game }));
      }

      this.adding.delete(gameSummary.id);
    });
  }

  addingGame(gameSummary: GameSummary) {
    return this.adding.has(gameSummary.id);
  }

  onShelf(gameSummary: GameSummary): Observable<boolean> {
    return this.store.select(selectGameOnShelf(gameSummary.id));
  }
}
