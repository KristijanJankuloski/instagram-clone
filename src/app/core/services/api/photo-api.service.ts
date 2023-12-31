import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PhotoCreateModel, PhotoModel } from '../../models/photo.model';

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

  getPhotosByAlbumId(albumId: number){
    return this.http
      .get(`${environment.apiBaseUrl}/albums/${albumId}/photos`)
      .pipe(map(value => value as PhotoModel[]));
  }

  updatePhoto(photo: PhotoModel) {
    return this.http.patch(`${environment.apiBaseUrl}/photos/${photo.id}`, photo);
  }

  postPhoto(photo: PhotoCreateModel) {
    // UNCOMMENT FOR DUMMY RESPONSE
    // return this.http.post(`${environment.apiBaseUrl}/photos`, { id:5001, albumId: 51, title: "Test tile", url: "https://via.placeholder.com/600/92c952", thumbnailUrl: "https://via.placeholder.com/150/771796"});

    const request = new FormData();
    request.append("title", photo.title);
    request.append("albumId", photo.albumId.toString())
    request.append("image", photo.image);
    return this.http.post(`${environment.apiBaseUrl}/photos`, request);
  }
  deletePhoto(id: number) {
    return this.http.delete(`${environment.apiBaseUrl}/photos/${id}`);
  }
}
