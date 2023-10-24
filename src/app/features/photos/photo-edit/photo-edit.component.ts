import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { PhotoActions, PhotoSelectors } from '../state';
import { PhotoModel } from 'src/app/core/models/photo.model';
import { PhotoEditFormComponent } from './photo-edit-form/photo-edit-form.component';
import { AlbumActions, AlbumSelectors } from '../../albums/state';

@Component({
  selector: 'app-photo-edit',
  standalone: true,
  imports: [CommonModule, PhotoEditFormComponent],
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.scss']
})
export class PhotoEditComponent implements OnInit {
  private store = inject(Store<PhotoSelectors.State>);
  private albumStore = inject(Store<AlbumSelectors.State>);
  route = inject(ActivatedRoute);
  photoDetails$ = this.store.select(PhotoSelectors.getCurrentPhotoDetails);
  availableAlbums$ = this.albumStore.select(AlbumSelectors.getAllCurrentAlbums);

  ngOnInit(): void {
    this.albumStore.dispatch(AlbumActions.loadAllAlbums());
  }

  submitEditForm(photoDetails : PhotoModel) {
    this.store.dispatch(PhotoActions.editPhoto({photo: photoDetails}));
  }
}
