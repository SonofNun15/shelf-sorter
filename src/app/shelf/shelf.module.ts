import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { ShelfRoutingModule } from './shelf-routing.module';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from'@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';

import { ListComponent } from './list/list.component';
import { AddGamesComponent } from './add-games/add-games.component';
import { GameResultComponent } from './game-result/game-result.component';
import { GameDisplayComponent } from './game-display/game-display.component';
import { QueueComponent } from './queue/queue.component';
import { GameInQueueComponent } from './game-in-queue/game-in-queue.component';
import { AddPlayDialogComponent } from './add-play-dialog/add-play-dialog.component';
import { PlaysDisplayDialogComponent } from './plays-display-dialog/plays-display-dialog.component';
import { PlayDisplayComponent } from './play-display/play-display.component';
import { GamePickerComponent } from './game-picker/game-picker.component';
import { EmojiComponent } from '../emoji/emoji/emoji.component';
import { GameDetailComponent } from './game-detail/game-detail.component';

@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    AddGamesComponent,
    GameResultComponent,
    GameDisplayComponent,
    QueueComponent,
    GameInQueueComponent,
    AddPlayDialogComponent,
    PlaysDisplayDialogComponent,
    PlayDisplayComponent,
    GamePickerComponent,
    EmojiComponent,
    GameDetailComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShelfRoutingModule,

    DragDropModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatDividerModule,
    MatBadgeModule,
    MatTooltipModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSliderModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
  ],
})
export class ShelfModule { }
