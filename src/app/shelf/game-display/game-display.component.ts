import { Component, Input } from '@angular/core';
import { GameDetail } from 'src/app/models/game-detail';

@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.scss']
})
export class GameDisplayComponent {
  @Input()
  game: GameDetail | undefined;

  constructor() { }
}
