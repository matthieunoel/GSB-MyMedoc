import { TestBed } from '@angular/core/testing';

import { GsbMainService } from './gsb-main.service';

describe('GsbMainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GsbMainService = TestBed.get(GsbMainService);
    expect(service).toBeTruthy();
  });
});
