import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, Observable, switchMap, tap } from 'rxjs';
import { parseStringPromise } from 'xml2js';
import { BggType, GameDetail } from '../models/game-detail';
import { GameSummary } from '../models/game-summary';
import { first, split } from '../utils/array';
import { baseBoardGameGeekUrl } from './board-game-geek';

interface BoardGameGeekQueryResult {
  items: {
    $: {
      termsofuse: 'https://boardgamegeek.com/wiki/page/XML_API_Terms_of_Use';
    };
    item: [{
      $: {
        type: 'boardgame';
        id: string;
      };
      description: string[];
      image: string[];
      thumbnail: string[];
      link: {
        $: {
          id: string;
          type: BggType;
          value: string;
        };
      }[];
      maxplayers: [{
        $: { value: string };
      }];
      maxplaytime: [{
        $: { value: string };
      }];
      minage: [{
        $: { value: string };
      }];
      minplayers: [{
        $: { value: string };
      }];
      minplaytime: [{
        $: { value: string };
      }];
      name: {
        $: {
          type: string;
          sortindex: string;
          value: string;
        };
      }[];
      playingtime: [{
        $: { value: string };
      }];
      yearpublished: [{
        $: { value: string };
      }];
    }];
  };
}

@Injectable({
  providedIn: 'root'
})
export class ShelfService {
  constructor(private http: HttpClient) { }

  addToShelf(gameSummary: GameSummary): Observable<void> {
    return this.http.get(`${baseBoardGameGeekUrl}/thing?type=boardgame&id=${gameSummary.id}`, {
      responseType: 'text',
    }).pipe(
      switchMap((xml: string) => from(parseStringPromise(xml))),
      map<BoardGameGeekQueryResult, GameDetail>((queryResult): GameDetail => {
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
      tap(game => {
        console.log(game);
      }),
      map(_ => {}),
    );
  }
}
