import { TestBed } from '@angular/core/testing';

import { SnapshottoarrayService } from './snapshottoarray.service';

describe('SnapshottoarrayService', () => {
  let service: SnapshottoarrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnapshottoarrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
