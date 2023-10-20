import { AlbumModel } from 'src/app/core/models/album.model';
import * as app from '../../../core/state/app.state';
import * as actions from './album.actions';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

export interface State extends app.State {

}

export interface AlbumState {
    albums: AlbumModel[],
    lastError?: string
}

const getAlbumFeatureState = createFeatureSelector<AlbumState>('albums');
export const getAllCurrentAlbums = createSelector(getAlbumFeatureState, state => state.albums);

const defaultState: AlbumState = {
    albums: [],
    lastError: null
}

export const albumReducer = createReducer<AlbumState>(
    defaultState,
    on(actions.loadAllAlbumsSuccess, (state, action) => {
        return {
            ...state,
            albums: action.albums,
            lastError: null
        }
    }),
    on(actions.loadAllAlbumsError, (state, action) => {
        return {
            ...state,
            albums: [],
            lastError: action.error
        }
    })
);