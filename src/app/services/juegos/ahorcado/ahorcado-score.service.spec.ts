import { TestBed } from '@angular/core/testing';

import { AhorcadoScoreService } from './ahorcado-score.service';

describe('AhorcadoScoreService', () => {
  let service: AhorcadoScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AhorcadoScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
