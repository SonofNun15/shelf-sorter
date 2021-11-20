import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { GamePlay } from 'src/app/models/game-play';
import { GameRecord } from 'src/app/models/game-record';
import { IStore } from 'src/app/store';
import { updatePlays } from '../shelf.actions';
import { selectGame } from '../shelf.selectors';

export interface PlaysDisplayDialogData {
  gameId: string;
}

@Component({
  templateUrl: './plays-display-dialog.component.html',
  styleUrls: ['./plays-display-dialog.component.scss']
})
export class PlaysDisplayDialogComponent {
  game$: Observable<GameRecord | undefined>;
  plays$: Observable<GamePlay[]>;
  playCount$: Observable<number>;

  constructor(
    public dialogRef: MatDialogRef<PlaysDisplayDialogComponent>,
    private store: Store<IStore>,
    @Inject(MAT_DIALOG_DATA) public data: PlaysDisplayDialogData,
  ) {
    this.game$ = this.store.select(selectGame(data.gameId));
    this.plays$ = this.game$.pipe(
      map(game => game?.plays ?? []),
    );
    this.playCount$ = this.plays$.pipe(
      map(plays => plays.length),
    );
  }

  removePlay(plays: GamePlay[], index: number) {
    let updatedPlays = [...plays];
    updatedPlays.splice(index, 1);
    this.store.dispatch(updatePlays({ gameId: this.data.gameId, plays: updatedPlays }));
  }

  close() {
    this.dialogRef.close();
  }
}
