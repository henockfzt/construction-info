import { TestBed } from '@angular/core/testing';

import { WoredaserviceService } from './woredaservice.service';

describe('WoredaserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WoredaserviceService = TestBed.get(WoredaserviceService);
    expect(service).toBeTruthy();
  });
});
