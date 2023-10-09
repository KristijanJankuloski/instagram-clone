import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PhotoModel } from '../../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoApiService {
  private http = inject(HttpClient);

  getPhotos() {
    return this.http
      .get(`${environment.apiBaseUrl}/photos`)
      .pipe(map(value => value as PhotoModel[]));
  }

  getPhotoById(photoId: number){
    return this.http
      .get(`${environment.apiBaseUrl}/photos/${photoId}`)
      .pipe(map(value => value as PhotoModel));
  }
}
