import { ResolveFn, Router } from '@angular/router';
import { AlbumModel } from '../models/album.model';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/features/albums/state/album.reducer';
import { AlbumActions, AlbumSelectors } from 'src/app/features/albums/state';
import { skip } from 'rxjs';

export const albumListResolver: ResolveFn<AlbumModel[]> = (route, state) => {
  const store = inject(Store<State>);

  store.dispatch(AlbumActions.loadAllAlbums());

  return store.select(AlbumSelectors.getAllCurrentAlbums).pipe(
    skip(1)
  )
};
