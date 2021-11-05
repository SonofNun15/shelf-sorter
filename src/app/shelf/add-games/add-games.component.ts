import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { GameSummary } from 'src/app/models/game-summary';
import { GameFinderService } from 'src/app/services/game-finder.service';

@Component({
  selector: 'app-add-games',
  templateUrl: './add-games.component.html',
  styleUrls: ['./add-games.component.scss']
})
export class AddGamesComponent {
  searchForm = new FormGroup({
    name: new FormControl(''),
  });

  results: Observable<GameSummary[]> | null = null;

  @Output()
  addGame = new EventEmitter<GameSummary>();

  @Output()
  close = new EventEmitter();

  constructor(private gameService: GameFinderService) { }

  search() {
    this.results = this.gameService.lookup(this.searchForm.value.name);
  }

  onAddGame(game: GameSummary) {
    this.addGame.emit(game);
  }
}
