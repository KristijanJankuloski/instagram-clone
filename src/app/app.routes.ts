import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'photos', loadComponent: () => 
            import('./features/photos/photo-list/photo-list.component')
            .then(m => m.PhotoListComponent) 
    },
    { path: 'photos/:id', loadComponent: () => 
            import('./features/photos/photo-details/photo-details.component')
            .then(m => m.PhotoDetailsComponent)
    }
];
