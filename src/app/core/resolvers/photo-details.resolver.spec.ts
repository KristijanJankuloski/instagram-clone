import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { photoDetailsResolver } from './photo-details.resolver';

describe('photoDetailsResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => photoDetailsResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
