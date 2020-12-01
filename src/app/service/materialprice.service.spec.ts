import { TestBed } from '@angular/core/testing';

import { MaterialpriceService } from './materialprice.service';

describe('MaterialpriceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaterialpriceService = TestBed.get(MaterialpriceService);
    expect(service).toBeTruthy();
  });
});
