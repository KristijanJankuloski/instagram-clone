import { createAction, props } from "@ngrx/store";
import { AlbumModel } from "src/app/core/models/album.model";

const GET_ALL_ALBUMS = "[Album] Load All";
const GET_ALL_ALBUMS_SUCCESS = "[Album API] Load All success";
const GET_ALL_ALBUMS_ERROR = "[Album API] Load All error";
const GET_ALBUM_BY_ID = "[Album] Load By Id";
const GET_ALBUM_BY_ID_SUCCESS = "[Album API] Load All success";

export const loadAllAlbums = createAction(GET_ALL_ALBUMS);
export const loadAllAlbumsSuccess = createAction(GET_ALL_ALBUMS_SUCCESS, props<{albums: AlbumModel[]}>());
export const loadAllAlbumsError = createAction(GET_ALL_ALBUMS_ERROR, props<{error: string}>());
export const loadById = createAction(GET_ALBUM_BY_ID, props<{id: number}>());
export const loadByIdSuccess = createAction(GET_ALBUM_BY_ID_SUCCESS, props<{album: AlbumModel}>());