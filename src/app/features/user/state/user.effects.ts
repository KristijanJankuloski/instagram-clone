import { Injectable } from '@angular/core';
import * as actions from './user.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthApiService } from '../../../core/services/api/auth-api.service';
import { exhaustMap, switchMap } from 'rxjs/operators';
import { map, catchError, of, EMPTY } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UserEffects {
    constructor(private actions$: Actions, private authService: AuthApiService, private router: Router){}

    loginUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.loginUser),
            exhaustMap(value => this.authService.login(value.login).pipe(
                map(user => {
                    this.router.navigate(['photos']);
                    return actions.loginUserSuccess({user});
                }),
                catchError(err => of(err))
            ))
        );
    });

    logoutUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(actions.logoutUser),
            switchMap(() => {
                this.router.navigate(['login']);
                return of(actions.clearUser());
            })
        );
    });
}