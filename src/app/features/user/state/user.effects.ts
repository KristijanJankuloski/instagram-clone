import { Injectable } from '@angular/core';
import * as actions from './user.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthApiService } from 'src/app/core/services/api/auth-api.service';
import { exhaustMap } from 'rxjs/operators';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserEffects {
    constructor(private actions$: Actions, private authService: AuthApiService){}

    loginUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.loginUser),
            exhaustMap(value => this.authService.login(value.login).pipe(
                map(user => actions.loginUserSuccess({user}))
            ))
        );
    });
}