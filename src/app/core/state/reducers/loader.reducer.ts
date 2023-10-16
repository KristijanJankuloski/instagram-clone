import { createAction, createReducer, on } from "@ngrx/store";
import * as actions from '../actions/loader.actions';

export const loaderReducer = createReducer(
    { showLoader: false },
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