import { Component, Inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { GameRecord } from 'src/app/models/game-record';
import { IStore } from 'src/app/store';
import { playGame } from '../shelf.actions';

@Component({
  templateUrl: './add-play-dialog.component.html',
  styleUrls: ['./add-play-dialog.component.scss']
})
export class AddPlayDialogComponent {
  scoreCtrls = new FormArray([]);

  playForm = new FormGroup({
    date: new FormControl(new Date()),
    scores: this.scoreCtrls,
  });

  constructor(
    private dialogRef: MatDialogRef<AddPlayDialogComponent>,
    private store: Store<IStore>,
    @Inject(MAT_DIALOG_DATA) public game: GameRecord,
  ) { }

  addScore() {
    this.scoreCtrls.push(this.makeScoreControl());
  }

  removeScore(index: number) {
    this.scoreCtrls.removeAt(index);
  }

  private makeScoreControl() {
    return new FormGroup({
      playerName: new FormControl(''),
      points: new FormControl(''),
    });
  }

  asFormGroup(group: AbstractControl): FormGroup {
    return group as FormGroup;
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.store.dispatch(playGame({ gameId: this.game.id, play: this.playForm.value }));
    this.dialogRef.close(this.playForm.value);
  }
}
