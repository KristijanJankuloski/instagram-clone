import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { PhotoModel } from '../models/photo.model';
import { Store } from '@ngrx/store';
import { State, getCurrentAllPhotos } from '../../features/photos/state/photo.reducer';
import { PhotoActions } from '../../features/photos/state';
import { skip } from 'rxjs';

export const photoListResolver: ResolveFn<PhotoModel[]> = (route, state) => {
  const router = inject(Router);
  const album = route.queryParamMap.get('album');
  const store = inject(Store<State>);

  const albumId = +album;

  if(album === null){
    store.dispatch(PhotoActions.loadAllPhotos());
  }
  else if(isNaN(albumId) || albumId <= 0) {
    router.navigate(['/not-found']);
  }
  else {
    store.dispatch(PhotoActions.loadByAlbumId({albumId}));
  }
  
  return store.select(getCurrentAllPhotos).pipe(
    skip(1)
  ); 
};
