import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlbumModel } from '../../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumApiService {
  private http = inject(HttpClient);

  getAlbums() {
    return this.http.get(`${environment.apiBaseUrl}/albums`).pipe(
      map(value => value as AlbumModel[])
    );
  }

  getById(id: number) {
    return this.http.get(`${environment.apiBaseUrl}/albums/${id}`).pipe(
      map(value => value as AlbumModel)
    );
  }
}
