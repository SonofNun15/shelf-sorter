import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GameDetail } from 'src/app/models/game-detail';
import { ShelfService } from 'src/app/services/shelf.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  games$: Observable<GameDetail[]>;

  constructor(private shelf: ShelfService) {
    this.games$ = this.shelf.games$;
  }
}
