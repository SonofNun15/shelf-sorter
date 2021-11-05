import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GameDetail } from '../models/game-detail';

const shelfKey = 'boardGameShelf';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {
  constructor() { }

  addToShelf(game: GameDetail) {
    // localStorage.setItem(shelfKey, game)
    console.log(game);
  }
}
