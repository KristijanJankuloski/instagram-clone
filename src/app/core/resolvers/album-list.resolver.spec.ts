import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { albumListResolver } from './album-list.resolver';

describe('albumListResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => albumListResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
