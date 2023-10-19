import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { photoListResolver } from './photo-list.resolver';

describe('photoListResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => photoListResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
