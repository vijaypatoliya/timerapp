import { TestBed, inject } from '@angular/core/testing';

import { WorkmeterService } from './workmeter.service';

describe('WorkmeterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkmeterService]
    });
  });

  it('should be created', inject([WorkmeterService], (service: WorkmeterService) => {
    expect(service).toBeTruthy();
  }));
});
