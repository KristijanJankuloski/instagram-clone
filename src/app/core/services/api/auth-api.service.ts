import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginModel } from '../../models/auth.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
import { UserModel } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private http = inject(HttpClient);

  login(req: LoginModel) {
    // FAKE LOGIN
    return this.http.get(`${environment.apiBaseUrl}/users/1`).pipe(
      map(user => user as UserModel)
    );
  }
}
