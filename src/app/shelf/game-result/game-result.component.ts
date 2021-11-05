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

  @Output()
  addGame = new EventEmitter<GameSummary>();

  constructor() { }

  add() {
    this.addGame.emit(this.game);
  }
}
