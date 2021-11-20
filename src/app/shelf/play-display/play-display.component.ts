import { Component, EventEmitter, Input, Output } from '@angular/core';
import { emptyPlay, GamePlay } from 'src/app/models/game-play';

@Component({
  selector: 'app-play-display',
  templateUrl: './play-display.component.html',
  styleUrls: ['./play-display.component.scss']
})
export class PlayDisplayComponent {
  @Input()
  play: GamePlay = emptyPlay;

  @Output()
  remove = new EventEmitter<GamePlay>();
}
