import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GamePlay } from 'src/app/models/game-play';
import { GameRecord } from 'src/app/models/game-record';
import { IStore } from 'src/app/store';
import { AddPlayDialogComponent } from '../add-play-dialog/add-play-dialog.component';
import { GamePickerComponent } from '../game-picker/game-picker.component';
import { addToQueue, moveDownInQueue, moveInQueue, moveToBottomOfQueue, moveToTopOfQueue, moveUpInQueue, removeFromQueue } from '../queue.actions';
import { selectQueue } from '../queue.selectors';
import { playGame } from '../shelf.actions';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnDestroy {
  private sub: Subscription;
  queue: GameRecord[] | null = null;

  constructor(
    private store: Store<IStore>,
    private dialog: MatDialog,
  ) {
    this.sub = this.store.select(selectQueue).subscribe(queue => {
      this.queue = queue;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  add(dropEvent: CdkDragDrop<GameRecord[] | null, GameRecord, GameRecord>) {
    this.store.dispatch(addToQueue({ gameId: dropEvent.item.data.id }));
  }

  drop(dropEvent: CdkDragDrop<GameRecord[] | null, GameRecord, GameRecord>) {
    this.store.dispatch(moveInQueue({ gameId: dropEvent.item.data.id, position: dropEvent.currentIndex }));
  }

  play(game: GameRecord) {
    let dialogRef = this.dialog.open<AddPlayDialogComponent, GameRecord>(AddPlayDialogComponent, {
      data: game,
    });
  }

  remove(game: GameRecord) {
    this.store.dispatch(removeFromQueue({ gameId: game.id }));
  }

  moveToTop(game: GameRecord) {
    this.store.dispatch(moveToTopOfQueue({ gameId: game.id }));
  }

  moveUp(game: GameRecord) {
    this.store.dispatch(moveUpInQueue({ gameId: game.id }));
  }

  moveDown(game: GameRecord) {
    this.store.dispatch(moveDownInQueue({ gameId: game.id }));
  }

  moveToBottom(game: GameRecord) {
    this.store.dispatch(moveToBottomOfQueue({ gameId: game.id }));
  }

  openPicker() {
    this.dialog.open(GamePickerComponent);
  }
}
