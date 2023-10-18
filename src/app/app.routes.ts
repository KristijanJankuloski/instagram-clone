import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';

export const routes: Routes = [
        { path: 'home', component: HomeComponent },
        { path: 'login', loadComponent: () => 
                import('./features/user/login/login.component')
                .then(c => c.LoginComponent) 
        },
        {path: 'photos', children: [
                { path: '', loadComponent: () => 
                        import('./features/photos/photo-list/photo-list.component')
                        .then(c => c.PhotoListComponent) 
                },
                { path: 'create', loadComponent: () =>
                        import('./features/photos/photo-create/photo-create.component')
                        .then(c => c.PhotoCreateComponent) 
                },
                { path: 'edit', loadComponent: () => 
                        import('./features/photos/photo-edit/photo-edit.component')
                        .then(c => c.PhotoEditComponent) 
                },
                { path: ':id', loadComponent: () => 
                        import('./features/photos/photo-details/photo-details.component')
                        .then(c => c.PhotoDetailsComponent)
                }
        ]},
        { path: 'albums', loadComponent: () => 
                import('./features/albums/albums-list/albums-list.component')
                .then(c => c.AlbumsListComponent)
        },

        { path: '', redirectTo: 'home', pathMatch: 'full' }
];
