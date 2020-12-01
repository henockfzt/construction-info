import { TestBed } from '@angular/core/testing';

import { ContractdealerService } from './contractdealer.service';

describe('ContractdealerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContractdealerService = TestBed.get(ContractdealerService);
    expect(service).toBeTruthy();
  });
});
