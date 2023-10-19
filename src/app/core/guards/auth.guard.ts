import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { State, getCurrentUser } from 'src/app/features/user/state/user.reducer';

export const authGuard: CanActivateFn = (route, state) => {
  const user = inject(Store<State>).select(getCurrentUser);
  const router = inject(Router);
  return user.pipe(
    take(1), 
    map(user => {
      if(!user){
        router.navigate(['login']);
        return false;
      }
      return true;
    }));
};
