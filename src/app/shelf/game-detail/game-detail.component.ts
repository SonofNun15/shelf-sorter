import { Component, Input } from '@angular/core';
import { emptyGameRecord, GameRecord } from 'src/app/models/game-record';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent {
  @Input()
  game: GameRecord = emptyGameRecord;
}
