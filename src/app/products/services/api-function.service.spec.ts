import { TestBed } from '@angular/core/testing';

import { ApiFunctionService } from './api-function.service';

describe('ApiFunctionService', () => {
  let service: ApiFunctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFunctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
