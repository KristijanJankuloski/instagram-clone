import { UserModel } from '../../../core/models/user.model';
import * as app from '../../../core/state/app.state';
import * as actions from './user.actions';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

export interface State extends app.State {
    user: UserState;
}

export interface UserState {
    currentUser: UserModel;
}

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getCurrentUser = createSelector(getUserFeatureState, state => state.currentUser);

const defaultState: UserState = {
    currentUser: getUserFromLocalStorage()
}

export const userReducer = createReducer(
    defaultState,
    on(actions.loginUserSuccess, (state, action) => {
        setUserToLocalStorage(action.user);
        return {
            ...state,
            currentUser: action.user
        }
    }),
    on(actions.clearUser, (state) => {
        clearUserFromLocalStorage();
        return {
            ...state,
            currentUser: null
        }
    })
);

function getUserFromLocalStorage() : UserModel | null {
    const userString = localStorage.getItem("user");
    if(!userString) return null;
    return JSON.parse(userString) as UserModel;
}

function setUserToLocalStorage(user: UserModel) : void {
    const userString = JSON.stringify(user);
    localStorage.setItem("user", userString);
}

function clearUserFromLocalStorage() : void {
    localStorage.removeItem("user");
}