import * as actions from './photo.actions';
import * as app from '../../../core/state/app.state';
import { PhotoModel } from 'src/app/core/models/photo.model';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

export interface State extends app.State {
    photos: PhotoState;
}

export interface PhotoState {
    allPhotos: PhotoModel[];
    photoDetails: PhotoModel;
    lastError?: string;
}

const getPhotoFeatureState = createFeatureSelector<PhotoState>('photos');

export const getCurrentAllPhotos = createSelector(getPhotoFeatureState, state => state.allPhotos);
export const getCurrentPhotoDetails = createSelector(getPhotoFeatureState, state => state.photoDetails);

const defaultState: PhotoState = {
    allPhotos: [],
    photoDetails: null,
    lastError: null,
}

export const photosReducer = createReducer<PhotoState>(
    defaultState,
    on(actions.loadAllPhotosSuccess, (state, action) => {
        return {
            ...state,
            allPhotos: action.allPhotos,
            lastError: null
        }
    }),
    on(actions.loadByIdSuccess, (state, action) => {
        return {
            ...state,
            photoDetails: action.photo,
            lastError: null
        }
    }),
    on(actions.loadAllPhotosError, (state, action) => {
        return {
            ...state,
            lastError: action.error
        }
    }),
    on(actions.editPhotoSuccess, (state, action) => {
        return {
            ...state,
            allPhotos: state.allPhotos.map(p => p.id === action.photo.id? action.photo: p),
            photoDetails: action.photo,
            lastError: null
        }
    })
);