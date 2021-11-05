import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject, switchMap, tap } from 'rxjs';
import { GameSummary } from 'src/app/models/game-summary';
import { GameFinderService } from 'src/app/services/game-finder.service';

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
  searchSubject = new Subject<string>();
  results$: Observable<GameSummary[]>;

  @Output()
  close = new EventEmitter();

  constructor(private gameService: GameFinderService) {
    this.results$ = this.searchSubject.asObservable().pipe(
      switchMap(gameName => this.gameService.lookup(gameName)),
      tap(_ => this.searching = false),
    );
  }

  search({ name }: { name: string }) {
    this.searching = true;
    this.searchSubject.next(name);
  }
}
