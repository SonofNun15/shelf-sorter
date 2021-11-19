import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';

const queueKey = 'boardGameQueue';

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  load(): Observable<string[]> {
    const queueJson = localStorage.getItem(queueKey) ?? '[]';
    const queue: string[] = JSON.parse(queueJson);
    return of(queue);
  }

  save(games: string[]): Observable<void> {
    const queueJson = JSON.stringify(games);
    localStorage.setItem(queueKey, queueJson);
    return EMPTY;
  }
}
