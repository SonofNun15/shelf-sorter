import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IStore } from 'src/app/store';
import { selectGameCount } from '../shelf.selectors';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  gameCount$: Observable<number>;

  constructor(private store: Store<IStore>) {
    this.gameCount$ = this.store.select(selectGameCount);
  }
}
