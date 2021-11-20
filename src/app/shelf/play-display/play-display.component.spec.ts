import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayDisplayComponent } from './play-display.component';

describe('PlayDisplayComponent', () => {
  let component: PlayDisplayComponent;
  let fixture: ComponentFixture<PlayDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
