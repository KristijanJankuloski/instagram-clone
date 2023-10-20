import { createAction, props } from "@ngrx/store";
import { AlbumModel } from "src/app/core/models/album.model";

const GET_ALL_ALBUMS = "[Album] Load All";
const GET_ALL_ALBUMS_SUCCESS = "[Album API] Load All success";
const GET_ALL_ALBUMS_ERROR = "[Album API] Load All error";

export const loadAllAlbums = createAction(GET_ALL_ALBUMS);
export const loadAllAlbumsSuccess = createAction(GET_ALL_ALBUMS_SUCCESS, props<{albums: AlbumModel[]}>());
export const loadAllAlbumsError = createAction(GET_ALL_ALBUMS_ERROR, props<{error: string}>());