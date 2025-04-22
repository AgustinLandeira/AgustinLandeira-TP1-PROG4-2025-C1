import { TestBed } from '@angular/core/testing';

import { MayorMenorScoreService } from './mayor-menor-score.service';

describe('MayorMenorScoreService', () => {
  let service: MayorMenorScoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MayorMenorScoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
