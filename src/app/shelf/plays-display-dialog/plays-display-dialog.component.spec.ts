import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaysDisplayDialogComponent } from './plays-display-dialog.component';

describe('PlaysDisplayDialogComponent', () => {
  let component: PlaysDisplayDialogComponent;
  let fixture: ComponentFixture<PlaysDisplayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaysDisplayDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaysDisplayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
