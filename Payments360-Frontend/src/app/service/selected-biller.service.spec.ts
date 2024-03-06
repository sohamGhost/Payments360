import { TestBed } from '@angular/core/testing';

import { SelectedBillerService } from './selected-biller.service';

describe('SelectedBillerService', () => {
  let service: SelectedBillerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedBillerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
