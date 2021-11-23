import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { GameRecord } from '../models/game-record';
import { selectQueue } from '../shelf/queue.selectors';
import { selectGames } from '../shelf/shelf.selectors';
import { IStore } from '../store';
import { RandomService } from './random.service';

export enum PickSource {
  queue,
  shelf,
}

export enum FilterDirection {
  atLeast,
  atMost,
}

export interface Filter<ValueType> {
  enabled: boolean;
  value: ValueType;
}

export interface FilterWithDirection<ValueType> extends Filter<ValueType> {
  direction: FilterDirection;
}

export interface GameFilters {
  source: PickSource;
  playerCount: FilterWithDirection<number>;
  duration: FilterWithDirection<number>;
  age: FilterWithDirection<number>;
  rating: Filter<number>;
}

export type FilterFunc = ((games: GameRecord[]) => GameRecord[]);

@Injectable({
  providedIn: 'root'
})
export class DrawGameService {
  constructor(
    private store: Store<IStore>,
    private random: RandomService,
  ) { }

  draw(filters: GameFilters): Observable<GameRecord> {
    const gameSelector = this.getSelector(filters);
    return this.store.select(gameSelector).pipe(
      map(games => this.filterGames(games, filters)),
      map(games => this.pickGame(games)),
    );
  }

  private getSelector(filters: GameFilters) {
    return filters.source === PickSource.queue
      ? selectQueue
      : selectGames
  }

  private filterGames(games: GameRecord[], filters: GameFilters): GameRecord[] {
    const filterFuncs = this.makeFilterFuncs(filters);
    return filterFuncs.reduce((games, filter) => {
      return filter(games);
    }, games);
  }

  private makeFilterFuncs(filters: GameFilters): FilterFunc[] {
    return [
      filterPlayerCount(filters.playerCount),
      filterDuration(filters.duration),
      filterAge(filters.age),
      filterRating(filters.rating),
    ]
  }

  private pickGame(games: GameRecord[]): GameRecord {
    const winner = this.random.nextWithin(games.length);
    return games[winner];
  }
}

function generalFilter<ValueType, FilterType extends Filter<ValueType>>(
  filter: FilterType,
  filterMaker: ((filter: FilterType) => FilterFunc)
): FilterFunc {
  if (!filter.enabled) {
    return games => games;
  } else {
    return filterMaker(filter);
  }
}

function filterPlayerCount(playerFilter: FilterWithDirection<number>): FilterFunc {
  return generalFilter(playerFilter, filter =>
    (filter.direction === FilterDirection.atLeast)
      ? games => games.filter(game => game.maxPlayers >= filter.value)
      : games => games.filter(game => game.minPlayers <= filter.value)
  );
}

function filterDuration(durationFilter: FilterWithDirection<number>): FilterFunc {
  return generalFilter(durationFilter, filter =>
    (filter.direction === FilterDirection.atLeast)
      ? games => games.filter(game => game.maxPlayTime >= filter.value)
      : games => games.filter(game => game.maxPlayTime <= filter.value)
  );
}

function filterAge(ageFilter: FilterWithDirection<number>): FilterFunc {
  return generalFilter(ageFilter, filter =>
    (filter.direction === FilterDirection.atLeast)
      ? games => games.filter(game => game.minAge >= filter.value)
      : games => games.filter(game => game.minAge <= filter.value)
  );
}

function filterRating(ratingFilter: Filter<number>): FilterFunc {
  return generalFilter(ratingFilter, filter =>
      games => games.filter(game => {
        if (game.rating != null) {
          return game.rating >= filter.value;
        } else {
          return false;
        }
      })
  );
}
