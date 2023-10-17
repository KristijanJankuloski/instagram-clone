import * as actions from './photo.actions';
import * as app from '../../../core/state/app.state';
import { PhotoModel } from 'src/app/core/models/photo.model';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

export interface State extends app.State {
    photos: PhotoState
}

export interface PhotoState {
    allPhotos: PhotoModel[],
    photoDetails: PhotoModel
}

const getPhotoFeatureState = createFeatureSelector<PhotoState>('photos');

export const getCurrentAllPhotos = createSelector(getPhotoFeatureState, state => state.allPhotos);
export const getCurrentPhotoDetails = createSelector(getPhotoFeatureState, state => state.photoDetails);

const defaultState: PhotoState = {
    allPhotos: [],
    photoDetails: null
}

export const photosReducer = createReducer<PhotoState>(
    defaultState,
    on(actions.loadAllPhotosSuccess, (state, action) => {
        return {
            ...state,
            allPhotos: action.allPhotos
        }
    })
);