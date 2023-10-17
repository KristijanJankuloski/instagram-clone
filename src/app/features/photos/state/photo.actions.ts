import { createAction, props } from "@ngrx/store";
import { PhotoModel } from "src/app/core/models/photo.model";

const GET_ALL_PHOTOS = "[Photo] Load All";
const GET_ALL_PHOTOS_SUCCESS = "[Photo API] Load All success";
const GET_ALL_PHOTOS_ERROR = "[Photo API] Load All error";
const GET_BY_ALBUM_ID = "[Photo] Load All by Album id";
const GET_BY_ALBUM_ID_SUCCESS = "[Photo] Load All by Album id success";
const GET_BY_ALBUM_ID_ERROR = "[Photo] Load All by Album id error";
const GET_BY_ID = "[Photo] Get by Id";

export const loadAllPhotos = createAction(GET_ALL_PHOTOS);
export const loadAllPhotosSuccess = createAction(GET_ALL_PHOTOS_SUCCESS, props<{allPhotos: PhotoModel[]}>());
export const loadAllPhotosError = createAction(GET_ALL_PHOTOS_ERROR, props<{error: any}>());
export const loadByAlbumId = createAction(GET_BY_ALBUM_ID, props<{albumId: number}>());
export const getById = createAction(GET_BY_ID);