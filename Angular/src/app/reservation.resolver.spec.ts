import { TestBed } from '@angular/core/testing';

import { ReservationResolver } from './reservation.resolver';

describe('ReservationResolver', () => {
  let resolver: ReservationResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ReservationResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
