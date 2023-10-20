import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { anonymousGuard } from './core/guards/anonymous.guard';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { photoRoutes } from './features/photos/photo.routes';
import { albumListResolver } from './core/resolvers/album-list.resolver';

export const routes: Routes = [
        { path: 'home', component: HomeComponent },
        { path: 'login', loadComponent: () => 
                import('./features/user/login/login.component')
                .then(c => c.LoginComponent),
          canActivate: [anonymousGuard]
        },
        { path: 'photos', children: photoRoutes },
        { path: 'albums', loadComponent: () => 
                import('./features/albums/albums-list/albums-list.component')
                .then(c => c.AlbumsListComponent),
                resolve: {albums: albumListResolver}
        },
        { path: 'not-found', component: NotFoundComponent },

        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];
