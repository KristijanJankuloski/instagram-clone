import { createAction, props } from "@ngrx/store";
import { LoginModel } from "../../../core/models/auth.model";
import { UserModel } from "../../../core/models/user.model";

const USER_LOGIN = "[User] Login user";
const USER_LOGIN_SUCCESS = "[User Api] Login user success";
const USER_LOGIN_ERROR = "[User Api] Login user error";
const USER_CLEAR = "[User] Clear user";
const USER_LOGOUT = "[User] Logout";

export const loginUser = createAction(USER_LOGIN, props<{login: LoginModel}>());
export const loginUserSuccess = createAction(USER_LOGIN_SUCCESS, props<{user: UserModel}>());
export const clearUser = createAction(USER_CLEAR);
export const logoutUser = createAction(USER_LOGOUT);