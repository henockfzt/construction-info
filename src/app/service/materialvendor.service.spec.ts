import { TestBed } from '@angular/core/testing';

import { MaterialvendorService } from './materialvendor.service';

describe('MaterialvendorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialvendorService = TestBed.get(MaterialvendorService);
    expect(service).toBeTruthy();
  });
});
