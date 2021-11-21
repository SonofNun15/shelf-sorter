import { TestBed } from '@angular/core/testing';

import { DrawGameService } from './draw-game.service';

describe('DrawGameService', () => {
  let service: DrawGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
