import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { GameDetail } from '../models/game-detail';

const shelfKey = 'boardGameShelf';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {
  private gameSubject: BehaviorSubject<GameDetail[]>;

  constructor() {
    const games = this.loadGames();
    this.gameSubject = new BehaviorSubject(games);
    this.gameSubject.subscribe(games => {
      this.saveGames(games);
    });
  }

  private loadGames(): GameDetail[] {
    var gamesJson = localStorage.getItem(shelfKey) ?? '[]';
    return JSON.parse(gamesJson);
  }

  private saveGames(games: GameDetail[]) {
    var gamesJson = JSON.stringify(games);
    localStorage.setItem(shelfKey, gamesJson);
  }

  get games$(): Observable<GameDetail[]> {
    return this.gameSubject.asObservable();
  }

  addToShelf(game: GameDetail) {
    const newGames = [
      ...this.gameSubject.value,
      game,
    ].sort((x, y) => x?.name.localeCompare(y?.name));
    this.gameSubject.next(newGames);
  }

  removeFromShelf(game: GameDetail) {
    const games = this.gameSubject.value.filter(g => g.id !== game.id);
    this.gameSubject.next(games);
  }
}
