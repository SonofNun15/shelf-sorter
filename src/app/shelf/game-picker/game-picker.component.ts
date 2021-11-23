import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GameRecord } from 'src/app/models/game-record';
import { DrawGameService, FilterDirection, PickSource } from 'src/app/services/draw-game.service';
import { AddPlayDialogComponent } from '../add-play-dialog/add-play-dialog.component';

@Component({
  selector: 'app-game-picker',
  templateUrl: './game-picker.component.html',
  styleUrls: ['./game-picker.component.scss']
})
export class GamePickerComponent implements OnDestroy {
  sourceCtrl = new FormControl(PickSource.queue);

  playerCountCtrl = new FormControl(false);
  playerCountDirectionCtrl = new FormControl(FilterDirection.atLeast);
  playerCountValueCtrl = new FormControl(2);

  durationCtrl = new FormControl(false);
  durationDirectionCtrl = new FormControl(FilterDirection.atLeast);
  durationValueCtrl = new FormControl(60);

  ageCtrl = new FormControl(false);
  ageDirectionCtrl = new FormControl(FilterDirection.atLeast);
  ageValueCtrl = new FormControl(12);

  ratingCtrl = new FormControl(false);
  ratingValueCtrl = new FormControl(3);

  pickForm = new FormGroup({
    source: this.sourceCtrl,
    playerCount: new FormGroup({
      enabled: this.playerCountCtrl,
      direction: this.playerCountDirectionCtrl,
      value: this.playerCountValueCtrl,
    }),
    duration: new FormGroup({
      enabled: this.durationCtrl,
      direction: this.durationDirectionCtrl,
      value: this.durationValueCtrl,
    }),
    age: new FormGroup({
      enabled: this.ageCtrl,
      direction: this.ageDirectionCtrl,
      value: this.ageValueCtrl,
    }),
    rating: new FormGroup({
      enabled: this.ratingCtrl,
      value: this.ratingValueCtrl,
    }),
  });

  shelf = PickSource.shelf;
  queue = PickSource.queue;

  atLeast = FilterDirection.atLeast;
  atMost = FilterDirection.atMost;

  result: GameRecord | null = null;

  private sub: Subscription | null = null;

  constructor(
    private dialogRef: MatDialogRef<GamePickerComponent>,
    private dialog: MatDialog,
    private drawGameService: DrawGameService,
  ) { }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  draw() {
    this.sub?.unsubscribe();
    this.sub = this.drawGameService.draw(this.pickForm.value).subscribe(game => {
      this.result = game;
    });
  }

  close() {
    this.dialogRef.close();
  }

  play() {
    this.dialogRef.close();
    this.dialog.open<AddPlayDialogComponent, GameRecord>(AddPlayDialogComponent, {
      data: this.result,
    });
  }
}
