import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { ShelfRoutingModule } from './shelf-routing.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from'@angular/material/progress-spinner';

import { ListComponent } from './list/list.component';
import { AddGamesComponent } from './add-games/add-games.component';
import { GameResultComponent } from './game-result/game-result.component';
import { GameDisplayComponent } from './game-display/game-display.component';

@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    AddGamesComponent,
    GameResultComponent,
    GameDisplayComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShelfRoutingModule,

    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ]
})
export class ShelfModule { }
