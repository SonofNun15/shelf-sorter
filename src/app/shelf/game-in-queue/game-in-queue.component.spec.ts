import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameInQueueComponent } from './game-in-queue.component';

describe('GameInQueueComponent', () => {
  let component: GameInQueueComponent;
  let fixture: ComponentFixture<GameInQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameInQueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameInQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
