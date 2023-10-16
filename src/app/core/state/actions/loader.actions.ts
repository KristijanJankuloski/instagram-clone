import { createAction } from "@ngrx/store";

export const SHOW_LOADER = '[Loader] Show Loader';
export const HIDE_LOADER = '[Loader] Hide Loader';

export const showLoader = createAction(SHOW_LOADER);
export const hideLoader = createAction(HIDE_LOADER);