import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { PhotoListComponent } from './features/photos/photo-list/photo-list.component';
import { PhotoDetailsComponent } from './features/photos/photo-details/photo-details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'photos', component: PhotoListComponent },
    { path: 'photos/:id', component: PhotoDetailsComponent }
];
