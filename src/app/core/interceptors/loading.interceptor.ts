import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingSpinnerService } from '../services/loading-spinner.service';
import { Store } from '@ngrx/store';
import * as actions from '../state/actions/loader.actions';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private loadingSpinner = inject(LoadingSpinnerService);
  private store = inject(Store<{showLoader: boolean}>);
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.store.dispatch(actions.showLoader());
    this.loadingSpinner.showSpinner();
    return next.handle(request).pipe(tap(
      {
        error: err => {
          this.store.dispatch(actions.hideLoader());
          this.loadingSpinner.hideSpinner();
        },
        complete: () => {
          this.store.dispatch(actions.hideLoader());
          this.loadingSpinner.hideSpinner();
        }
      }
    ));
  }
}
