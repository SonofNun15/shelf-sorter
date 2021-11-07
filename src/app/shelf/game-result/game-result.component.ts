import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameSummary, emptyGameSummary } from 'src/app/models/game-summary';

@Component({
  selector: 'app-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss']
})
export class GameResultComponent {
  @Input()
  game: GameSummary = emptyGameSummary;

  @Input()
  addingGame = false;

  @Input()
  onShelf = false;

  @Output()
  addGame = new EventEmitter<GameSummary>();

  add(game: GameSummary) {
    if (!this.onShelf) {
      this.addGame.emit(game);
    }
  }
}
