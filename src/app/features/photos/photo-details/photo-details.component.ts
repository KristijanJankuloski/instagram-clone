import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { State, getCurrentPhotoDetails } from '../state/photo.reducer';
import { getShowLoaderState } from 'src/app/core/state/reducers/loader.reducer';
import * as PhotoActions from '../state/photo.actions';

@Component({
  selector: 'app-photo-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatMenuModule, MatIconModule, RouterLink],
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss']
})
export class PhotoDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store<State>);

  isLoading$ = this.store.select(getShowLoaderState);
  photoDetails$ = this.store.select(getCurrentPhotoDetails);

  ngOnInit(): void {
    let photoId = +this.route.snapshot.params.id;
    if(photoId === 0 || isNaN(photoId)){
      return;
    }
    this.store.dispatch(PhotoActions.loadById({id: photoId}));
  }

}
