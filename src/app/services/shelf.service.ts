import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { GameRecord } from '../models/game-record';

const shelfKey = 'boardGameShelf';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {
  load(): Observable<GameRecord[]> {
    const gamesJson = localStorage.getItem(shelfKey) ?? '[]';
    const games: GameRecord[] = JSON.parse(gamesJson);
    return of(games);
  }

  save(games: GameRecord[]): Observable<void> {
    const gamesJson = JSON.stringify(games);
    localStorage.setItem(shelfKey, gamesJson);
    return EMPTY;
  }
}
