import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { State, getCurrentUser } from 'src/app/features/user/state/user.reducer';

export const anonymousGuard: CanActivateFn = (route, state) => {
  const user = inject(Store<State>).select(getCurrentUser);
  return user.pipe(
    take(1), 
    map(user => {
      if(!user) return true;
      return false;
    }));
};
