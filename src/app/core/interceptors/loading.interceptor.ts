import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as actions from '../state/actions/loader.actions';
import { State } from '../state/app.state';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private store = inject(Store<State>);
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.store.dispatch(actions.showLoader());
    return next.handle(request).pipe(tap(
      {
        error: err => {
          this.store.dispatch(actions.hideLoader());
        },
        complete: () => {
          this.store.dispatch(actions.hideLoader());
        }
      }
    ));
  }
}
