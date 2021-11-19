import { Component, EventEmitter, Input, Output } from '@angular/core';
import { emptyGameRecord, GameRecord } from 'src/app/models/game-record';

@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.scss']
})
export class GameDisplayComponent {
  @Input()
  game: GameRecord = emptyGameRecord;

  @Output()
  addGameToQueue = new EventEmitter<GameRecord>();

  @Output()
  play = new EventEmitter<GameRecord>();

  @Output()
  removeGame = new EventEmitter<GameRecord>();

  plays(game: GameRecord): number {
    return game.plays?.length;
  }
}
