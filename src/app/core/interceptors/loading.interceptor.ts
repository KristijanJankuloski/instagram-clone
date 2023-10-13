import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingSpinnerService } from '../services/loading-spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private loadingSpinner = inject(LoadingSpinnerService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingSpinner.showSpinner();
    return next.handle(request).pipe(tap(
      {
        error: err => {
          this.loadingSpinner.hideSpinner();
        },
        complete: () => {
          this.loadingSpinner.hideSpinner();
        }
      }
    ));
  }
}
