import { TestBed } from '@angular/core/testing';

import { TgridSortService } from './tgrid-sort.service';

describe('TgridSortService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TgridSortService = TestBed.get(TgridSortService);
    expect(service).toBeTruthy();
  });
});
