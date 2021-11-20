import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayDialogComponent } from './add-play-dialog.component';

describe('AddPlayDialogComponent', () => {
  let component: AddPlayDialogComponent;
  let fixture: ComponentFixture<AddPlayDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlayDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
