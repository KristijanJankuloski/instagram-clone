import { TestBed, inject } from '@angular/core/testing';

import { PhotoApiService } from './photo-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PhotoApiService', () => {
  let service: PhotoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PhotoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
