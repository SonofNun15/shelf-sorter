import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { GameDetail } from '../models/game-detail';

const shelfKey = 'boardGameShelf';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {
  load(): Observable<GameDetail[]> {
    const gamesJson = localStorage.getItem(shelfKey) ?? '[]';
    const games: GameDetail[] = JSON.parse(gamesJson);
    return of(games);
  }

  save(games: GameDetail[]): Observable<void> {
    const gamesJson = JSON.stringify(games);
    localStorage.setItem(shelfKey, gamesJson);
    return EMPTY;
  }
}
