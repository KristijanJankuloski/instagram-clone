import { TestBed } from '@angular/core/testing';

import { AlbumApiService } from './album-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AlbumApiService', () => {
  let service: AlbumApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AlbumApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
