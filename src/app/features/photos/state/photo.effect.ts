import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, exhaustMap, tap } from "rxjs/operators";
import { PhotoApiService } from "src/app/core/services/api/photo-api.service";
import *  as actions from "./photo.actions";
import { MatSnackBar } from "@angular/material/snack-bar";
import { snackBarError, snackBarInfo } from "src/app/config/snack-bar.config";
import { of } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class PhotoEffects {
    constructor(
        private actions$: Actions, 
        private photoService: PhotoApiService, 
        private snackBar: MatSnackBar, 
        private router: Router
        ){}

    loadPhotos$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.loadAllPhotos),
            mergeMap(() => this.photoService.getPhotos().pipe(
                map(photos => actions.loadAllPhotosSuccess({ allPhotos: photos }))
            ))
        );
    });

    loadPhotosByAlbumId$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.loadByAlbumId),
            mergeMap(value => this.photoService.getPhotosByAlbumId(value.albumId).pipe(
                map(photos => actions.loadAllPhotosSuccess({allPhotos: photos}))
            ))
        )
    });

    loadPhotoById$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.loadById),
            mergeMap(value => this.photoService.getPhotoById(value.id).pipe(
                map(photo => actions.loadByIdSuccess({photo})),
                catchError(err => {
                    this.snackBar.open("Error while getting photo", "Close", snackBarError);
                    this.router.navigate(['/not-found']);
                    return of(err);
                })
            ))
        )
    });

    createPhoto$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.createPhoto),
            exhaustMap(value => this.photoService.postPhoto(value.photo).pipe(
                tap(_ => {
                    this.snackBar.open("Photo uploaded", "Close", snackBarInfo);
                    this.router.navigate(['/photos']);
                }),
                catchError(err => {
                    this.snackBar.open("Cannot upload photo", "Close", snackBarError);
                    return of(err);
                })
            ))
        )
    })

    editPhoto$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.editPhoto),
            mergeMap(value => this.photoService.updatePhoto(value.photo).pipe(
                map(_ => {
                    this.snackBar.open("Photo updated", "Close", snackBarInfo);
                    this.router.navigate(['/photos', value.photo.id], { queryParams: {cache: true} });
                    return actions.editPhotoSuccess({photo: value.photo});
                }),
                catchError(err => {
                    this.snackBar.open("Error while updating photo", "Close", snackBarError);
                    return of(err);
                })
            ))
        )
    });

    deletePhoto$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.deletePhotoById),
            exhaustMap(value => this.photoService.deletePhoto(value.photoId).pipe(
                map(_ => {
                    this.snackBar.open("Photo deleted", "Close", snackBarInfo);
                    this.router.navigate(['/photos']);
                    return actions.loadByIdSuccess({photo:null});
                }),
                catchError(err => {
                    this.snackBar.open("Error while deleting photo", "Close", snackBarError);
                    return of(err);
                })
            ))
        );
    })
}