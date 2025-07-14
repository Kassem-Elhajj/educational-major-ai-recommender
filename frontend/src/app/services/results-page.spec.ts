import { TestBed } from '@angular/core/testing';

import { ResultsPage } from './results-page';

describe('ResultsPage', () => {
  let service: ResultsPage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultsPage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
