import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, switchMap, map } from 'rxjs';
import { GameSummary } from '../models/game-summary';
import { parseStringPromise } from 'xml2js';
import { any, ensureArray, first, split } from '../utils/array';
import { GameDetail } from '../models/game-detail';
import { baseBoardGameGeekUrl, BoardGameGeekLoadResult, BoardGameGeekQueryResult } from './board-game-geek';

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
        var gamesWithPrimaryNames = ensureArray(query.items.item?.filter(queryItem => any(queryItem.name, name => name.$.type === 'primary')));
        return gamesWithPrimaryNames.map(queryItem => ({
          id: queryItem.$.id,
          name: first(queryItem.name.filter(name => name.$.type === 'primary'))?.$.value ?? '',
          yearPublished: first(queryItem.yearpublished)?.$.value ?? '',
        }));
      }),
    );
  }

  load(game: GameSummary): Observable<GameDetail> {
    return this.http.get(`${baseBoardGameGeekUrl}/thing?id=${game.id}`, {
      responseType: 'text',
    }).pipe(
      switchMap((xml: string) => from(parseStringPromise(xml))),
      map<BoardGameGeekLoadResult, GameDetail>((queryResult): GameDetail => {
        const item = queryResult.items.item[0];
        const [primary, others] = split(item.name, nameResult => nameResult.$.type === 'primary');
        return {
          id: item.$.id,
          description: item.description[0],
          image: item.image[0],
          thumbnail: item.thumbnail[0],
          link: item.link.map(linkResult => linkResult.$),
          minPlayers: parseInt(item.minplayers[0].$.value),
          maxPlayers: parseInt(item.maxplayers[0].$.value),
          minAge: parseInt(item.minage[0].$.value),
          minPlayTime: parseInt(item.minplaytime[0].$.value),
          playingTime: parseInt(item.playingtime[0].$.value),
          maxPlayTime: parseInt(item.maxplaytime[0].$.value),
          yearPublished: item.yearpublished[0].$.value,
          name: first(primary)?.$.value ?? '',
          alternateNames: others.map(nameResult => nameResult.$.value),
        };
      }),
    );
  }
}
