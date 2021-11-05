import { Component, OnInit } from '@angular/core';
import { GameSummary } from 'src/app/models/game-summary';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  addToShelf(game: GameSummary) {
    console.log(`Add game to shelf '${game.name}''`);
  }
}
