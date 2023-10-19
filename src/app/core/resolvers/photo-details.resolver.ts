import { ResolveFn, Router } from '@angular/router';
import { PhotoModel } from '../models/photo.model';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getCurrentPhotoDetails } from '../../features/photos/state/photo.reducer';
import { PhotoActions } from '../../features/photos/state';
import { skip, tap } from 'rxjs';

export const photoDetailsResolver: ResolveFn<PhotoModel> = (route, state) => {
  const router = inject(Router);
  const photoId = +route.paramMap.get("id");
  if(photoId <= 0 || isNaN(photoId)){
    router.navigate(['/not-found']);
  }
  
  const store = inject(Store<State>);
  store.dispatch(PhotoActions.loadById({id: photoId}));
  return store.select(getCurrentPhotoDetails).pipe(
    skip(1),
    tap(photo => {
      if(!photo)
        router.navigate(['/not-found']);
    })
  );
};
