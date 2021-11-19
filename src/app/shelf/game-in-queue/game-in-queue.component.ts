import { Component, EventEmitter, Input, Output } from '@angular/core';
import { emptyGameRecord, GameRecord } from 'src/app/models/game-record';

@Component({
  selector: 'app-game-in-queue',
  templateUrl: './game-in-queue.component.html',
  styleUrls: ['./game-in-queue.component.scss']
})
export class GameInQueueComponent {
  @Input()
  game: GameRecord = emptyGameRecord;

  @Output()
  play = new EventEmitter<GameRecord>();

  @Output()
  remove = new EventEmitter<GameRecord>();

  @Output()
  moveToTop = new EventEmitter<GameRecord>();
  @Output()
  moveToBottom = new EventEmitter<GameRecord>();
  @Output()
  moveUp = new EventEmitter<GameRecord>();
  @Output()
  moveDown = new EventEmitter<GameRecord>();
}
