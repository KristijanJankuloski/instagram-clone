import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as actions from '../actions/loader.actions';

export interface LoaderState {
    showLoader: boolean
}

const getLoaderFeatureState = createFeatureSelector<LoaderState>('loader');

export const getShowLoaderState = createSelector(
    getLoaderFeatureState,
    state => state.showLoader
);

const defaultState: LoaderState = { showLoader: false };

export const loaderReducer = createReducer<LoaderState>(
    defaultState,
    on(actions.showLoader, state => {
        return {
            ...state,
            showLoader: true
        };
    }),
    on(actions.hideLoader, state => {
        return {
            ...state,
            showLoader: false
        }
    })
);