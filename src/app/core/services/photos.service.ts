import { Injectable, inject } from '@angular/core';
import { PhotoApiService } from './api/photo-api.service';
import { BehaviorSubject } from 'rxjs';
import { PhotoModel } from '../models/photo.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarError } from '../../config/snack-bar.config';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  private photoApiService = inject(PhotoApiService);
  private snackBar = inject(MatSnackBar);

  photos$ = new BehaviorSubject<PhotoModel[]>(null);
  photoDetails$ = new BehaviorSubject<PhotoModel>(null);

  getPhotos() {
    this.photos$.next(null);
    this.photoApiService.getPhotos().subscribe({
      next: value => {
        this.photos$.next(value);
      },
      error: err => {
        this.snackBar.open(`Error getting items: ${err.status}`, "Dissmiss", snackBarError);
      }
    });
  }

  getPhotosByAlbumId(albumId: number) {
    this.photos$.next(null);
    this.photoApiService.getPhotosByAlbumId(albumId).subscribe({
      next: value => {
        this.photos$.next(value);
      },
      error: err => {
        this.snackBar.open(`Error getting items: ${err.status}`, "Dissmiss", snackBarError);
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
        this.snackBar.open(`Error getting items: ${err.status}`, "Dissmiss", snackBarError);
      }
    });
  }
}
