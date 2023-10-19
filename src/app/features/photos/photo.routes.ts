import { Routes } from "@angular/router";
import { authGuard } from "../../core/guards/auth.guard";
import { photoDetailsResolver } from "../../core/resolvers/photo-details.resolver";
import { photoListResolver } from "src/app/core/resolvers/photo-list.resolver";

export const photoRoutes: Routes = [
    { path: '', loadComponent: () => 
            import('./photo-list/photo-list.component')
            .then(c => c.PhotoListComponent),
        resolve: { photos: photoListResolver }
    },
    { path: 'create', loadComponent: () =>
            import('./photo-create/photo-create.component')
            .then(c => c.PhotoCreateComponent),
        canActivate: [authGuard]
    },
    { path: 'edit', loadComponent: () => 
            import('./photo-edit/photo-edit.component')
            .then(c => c.PhotoEditComponent),
        canActivate: [authGuard]
    },
    { path: ':id', loadComponent: () => 
            import('./photo-details/photo-details.component')
            .then(c => c.PhotoDetailsComponent),
        resolve: { photoDetails: photoDetailsResolver }
    }
]