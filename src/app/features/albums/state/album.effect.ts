import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import * as actions from './album.actions';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs/operators";
import { AlbumApiService } from "src/app/core/services/api/album-api.service";
import { of } from "rxjs";
import { snackBarError } from "src/app/config/snack-bar.config";

@Injectable({
    providedIn: 'root'
})
export class AlbumEffects {
    constructor(
        private actions$: Actions,
        private albumService: AlbumApiService,
        private snackBar: MatSnackBar, 
        private router: Router
        ){}

    loadAllAlbums$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.loadAllAlbums),
            mergeMap(() => this.albumService.getAlbums().pipe(
                map(albums => actions.loadAllAlbumsSuccess({albums})),
                catchError(err => {
                    this.snackBar.open("Error loading albums", "Close", snackBarError);
                    this.router.navigate(['/home']);
                    return of(actions.loadAllAlbumsError({error: err}));
                })
            ))
        )
    })

    loadById$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.loadById),
            mergeMap((req) => this.albumService.getById(req.id).pipe(
                map(album => actions.loadByIdSuccess({album}))
            ))
        )
    });
}