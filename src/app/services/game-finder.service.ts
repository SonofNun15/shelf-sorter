import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, switchMap, map } from 'rxjs';
import { GameSummary } from '../models/game-summary';
import { parseStringPromise } from 'xml2js';
import { any, first } from '../utils/array';
import { baseBoardGameGeekUrl } from './board-game-geek';

interface BoardGameGeekQueryResult {
  items: {
    $: {
      total: number;
      termsofuse: string;
    };
    item: {
      $: {
        id: string;
        type: 'boardgame';
      };
      name: {
        $: {
          type: string;
          value: string;
        };
      }[];
      yearpublished: [{
        $: { value: string };
      }];
    }[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class GameFinderService {

  constructor(private http: HttpClient) { }

  lookup(name: string): Observable<GameSummary[]> {
    return this.http.get(`${baseBoardGameGeekUrl}/search?type=boardgame&query=${name}`, {
      responseType: 'text',
    }).pipe(
      switchMap((xml: string) => from(parseStringPromise(xml))),
      map((query: BoardGameGeekQueryResult) => {
        var gamesWithPrimaryNames = query.items.item.filter(queryItem => any(queryItem.name, name => name.$.type === 'primary'));
        return gamesWithPrimaryNames.map(queryItem => ({
          id: queryItem.$.id,
          name: first(queryItem.name.filter(name => name.$.type === 'primary'))?.$.value ?? '',
          yearPublished: first(queryItem.yearpublished)?.$.value ?? '',
        }));
      }),
    );
  }
}
