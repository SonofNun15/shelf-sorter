import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { exhaustMap, Subject, Subscription } from 'rxjs';
import { GameSummary, emptyGameSummary } from 'src/app/models/game-summary';
import { GameFinderService } from 'src/app/services/game-finder.service';
import { ShelfService } from 'src/app/services/shelf.service';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss']
})
export class GameResultComponent implements OnDestroy {
  @Input()
  game: GameSummary = emptyGameSummary;

  @Output()
  addGame = new EventEmitter<GameSummary>();

  addingGame = false;
  addSubject = new Subject<GameSummary>();

  sub: Subscription;

  constructor(
    private gameService: GameFinderService,
    private shelfService: ShelfService,
  ) {
    this.sub = this.addSubject.asObservable().pipe(
      exhaustMap(game => this.gameService.load(game)),
    ).subscribe(game => {
      this.shelfService.addToShelf(game);
      this.addGame.emit(game)
      this.addingGame = false;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  add(game: GameSummary) {
    this.addingGame = true;
    this.addSubject.next(game);
  }
}
