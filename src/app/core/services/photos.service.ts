import { Injectable, inject } from '@angular/core';
import { PhotoApiService } from './api/photo-api.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { PhotoModel } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  private photoApiService = inject(PhotoApiService);

  photos$ = new BehaviorSubject<PhotoModel[]>(null);
  photoDetails$ = new BehaviorSubject<PhotoModel>(null);

  getPhotos() {
    this.photos$.next(null);
    this.photoApiService.getPhotos().subscribe({
      next: value => {
        this.photos$.next(value);
      },
      error: err => {
        console.error(err);
      }
    });
  }

  getPhotoById(photoId: number){
    this.photoDetails$.next(null);
    this.photoApiService.getPhotoById(photoId).subscribe({
      next: value => {
        this.photoDetails$.next(value);
      },
      error: err => {
        console.error(err);
      }
    });
  }
}
