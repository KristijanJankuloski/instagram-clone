import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs/operators";
import { PhotoApiService } from "src/app/core/services/api/photo-api.service";
import *  as actions from "./photo.actions";

@Injectable({
    providedIn: 'root'
})
export class PhotoEffects {
    constructor(private actions$: Actions, private photoService: PhotoApiService){}

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
}