import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, Subscription } from 'rxjs';
import { emptyGameRecord, GameRecord } from 'src/app/models/game-record';
import { getRating, ratings } from 'src/app/models/ratings';
import { elementAt } from 'src/app/utils/array';

@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.scss']
})
export class GameDisplayComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  game: GameRecord = emptyGameRecord;

  @Output()
  addGameToQueue = new EventEmitter<GameRecord>();

  @Output()
  play = new EventEmitter<GameRecord>();

  @Output()
  showPlays = new EventEmitter<GameRecord>();

  @Output()
  removeGame = new EventEmitter<GameRecord>();

  @Output()
  gameRated = new EventEmitter<{ game: GameRecord, rating: number | null }>();

  ratingCtrl = new FormControl(null);

  ratingOptions = [null, ...ratings];

  private sub: Subscription | null = null;

  plays(game: GameRecord): number {
    return game.plays?.length;
  }

  ngOnInit() {
    this.sub = this.ratingCtrl.valueChanges.subscribe(value => {
      this.gameRated.emit({ game: this.game, rating: elementAt(value, 0) });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const rating = getRating(changes['game'].currentValue?.rating);
    this.ratingCtrl.setValue(rating);
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
