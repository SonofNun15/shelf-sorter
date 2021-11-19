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

import { ListComponent } from './list/list.component';
import { AddGamesComponent } from './add-games/add-games.component';
import { GameResultComponent } from './game-result/game-result.component';
import { GameDisplayComponent } from './game-display/game-display.component';
import { VarDirective } from '../utils/app-var';
import { QueueComponent } from './queue/queue.component';
import { GameInQueueComponent } from './game-in-queue/game-in-queue.component';

@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    AddGamesComponent,
    GameResultComponent,
    GameDisplayComponent,
    VarDirective,
    QueueComponent,
    GameInQueueComponent,
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
  ]
})
export class ShelfModule { }
