import { TestBed } from '@angular/core/testing';

import { TGridFilterService } from './tgrid-filter.service';

describe('TgridFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TGridFilterService = TestBed.get(TGridFilterService);
    expect(service).toBeTruthy();
  });
});
