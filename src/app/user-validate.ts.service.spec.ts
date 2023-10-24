import { TestBed } from '@angular/core/testing';

import { UserValidateTsService } from './user-validate.ts.service';

describe('UserValidateTsService', () => {
  let service: UserValidateTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserValidateTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
