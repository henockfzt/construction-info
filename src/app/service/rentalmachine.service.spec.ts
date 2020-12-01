import { TestBed } from '@angular/core/testing';

import { RentalmachineService } from './rentalmachine.service';

describe('RentalmachineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RentalmachineService = TestBed.get(RentalmachineService);
    expect(service).toBeTruthy();
  });
});
