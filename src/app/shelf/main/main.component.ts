import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GameDetail } from 'src/app/models/game-detail';
import { ShelfService } from 'src/app/services/shelf.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  gameCount$: Observable<number>;

  constructor(private shelf: ShelfService) {
    this.gameCount$ = this.shelf.games$.pipe(
      map(games => games.length),
    );
  }
}
