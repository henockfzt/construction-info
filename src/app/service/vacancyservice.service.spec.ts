import { TestBed } from '@angular/core/testing';

import { VacancyserviceService } from './vacancyservice.service';

describe('VacancyserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VacancyserviceService = TestBed.get(VacancyserviceService);
    expect(service).toBeTruthy();
  });
});
