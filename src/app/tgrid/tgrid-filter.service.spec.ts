import { TestBed } from '@angular/core/testing';

import { TgridFilterService } from './tgrid-filter.service';

describe('TgridFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TgridFilterService = TestBed.get(TgridFilterService);
    expect(service).toBeTruthy();
  });
});
