import { createAction, props } from "@ngrx/store";
import { PhotoModel } from "src/app/core/models/photo.model";

const GET_ALL_PHOTOS = "[Photo] Load All";
const GET_ALL_PHOTOS_SUCCESS = "[Photo API] Load All success";
const GET_ALL_PHOTOS_ERROR = "[Photo API] Load All error";
const GET_BY_ALBUM_ID = "[Photo] Load All by Album id";
const GET_BY_ID = "[Photo] Get by Id";
const GET_BY_ID_SUCCESS = "[Photo] Get bt Id success";
const GET_BY_ID_ERROR = "[Photo] Get bt Id error";
const EDIT_PHOTO = "[Photo] Edit";
const EDIT_PHOTO_SUCCESS = "[Photo Api] Edit success";
const DELETE_PHOTO = "[Photo] Delete";

export const loadAllPhotos = createAction(GET_ALL_PHOTOS);
export const loadAllPhotosSuccess = createAction(GET_ALL_PHOTOS_SUCCESS, props<{allPhotos: PhotoModel[]}>());
export const loadAllPhotosError = createAction(GET_ALL_PHOTOS_ERROR, props<{error: string}>());
export const loadByAlbumId = createAction(GET_BY_ALBUM_ID, props<{albumId: number}>());
export const loadById = createAction(GET_BY_ID, props<{id: number}>());
export const loadByIdSuccess = createAction(GET_BY_ID_SUCCESS, props<{photo: PhotoModel}>());
export const loadByIdError = createAction(GET_BY_ID_ERROR, props<{error: string}>());
export const editPhoto = createAction(EDIT_PHOTO, props<{photo: PhotoModel}>());
export const editPhotoSuccess = createAction(EDIT_PHOTO_SUCCESS, props<{photo: PhotoModel}>());
export const deletePhotoById = createAction(DELETE_PHOTO, props<{photoId: number}>())