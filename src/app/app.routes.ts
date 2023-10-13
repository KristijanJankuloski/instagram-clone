import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';

export const routes: Routes = [
        { path: '', component: HomeComponent },
        { path: 'photos', loadComponent: () => 
                import('./features/photos/photo-list/photo-list.component')
                .then(m => m.PhotoListComponent) 
        },
        { path: 'photo/edit', loadComponent: () => 
                import('./features/photos/photo-edit/photo-edit.component')
                .then(c => c.PhotoEditComponent) 
        },
        { path: 'photos/:id', loadComponent: () => 
                import('./features/photos/photo-details/photo-details.component')
                .then(m => m.PhotoDetailsComponent)
        },
        { path: 'albums', loadComponent: () => 
                import('./features/albums/albums-list/albums-list.component')
                .then(c => c.AlbumsListComponent)
        }
];
