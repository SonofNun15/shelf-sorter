import { Component } from '@angular/core';
import { GameSummary } from 'src/app/models/game-summary';
import { ShelfService } from 'src/app/services/shelf.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private shelfService: ShelfService) { }

  addToShelf(game: GameSummary) {
    const sub = this.shelfService.addToShelf(game).subscribe(() => {
      sub.unsubscribe();
      console.log('finished');
    });
  }
}
