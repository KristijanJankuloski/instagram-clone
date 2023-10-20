import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideStore } from '@ngrx/store';
import { loaderReducer } from './core/state/reducers/loader.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { photosReducer } from './features/photos/state/photo.reducer';
import { provideEffects } from '@ngrx/effects';
import { PhotoEffects } from './features/photos/state/photo.effect';
import { UserEffects } from './features/user/state/user.effects';
import { userReducer } from './features/user/state/user.reducer';
import { HIDE_LOADER, SHOW_LOADER } from './core/state/actions/loader.actions';
import { albumReducer } from './features/albums/state/album.reducer';
import { AlbumEffects } from './features/albums/state/album.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(HttpClientModule, MatSnackBarModule),
    provideStore({ 
      loader: loaderReducer, 
      photos: photosReducer,
      albums: albumReducer, 
      user: userReducer }),
    provideEffects([PhotoEffects, UserEffects, AlbumEffects]),
    provideStoreDevtools({ name: "Ig Demo Devtools", maxAge: 25, logOnly: !isDevMode(), actionsBlocklist: [SHOW_LOADER, HIDE_LOADER] }),
    {
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingInterceptor,
        multi: true
    }
]
};
