import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../state/photo.reducer';
import { PhotoActions, PhotoSelectors } from '../state';
import { PhotoModel } from 'src/app/core/models/photo.model';
import { PhotoEditFormComponent } from './photo-edit-form/photo-edit-form.component';

@Component({
  selector: 'app-photo-edit',
  standalone: true,
  imports: [CommonModule, PhotoEditFormComponent],
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.scss']
})
export class PhotoEditComponent implements OnInit {
  private store = inject(Store<State>);
  route = inject(ActivatedRoute);
  photoDetails$ = this.store.select(PhotoSelectors.getCurrentPhotoDetails);

  ngOnInit(): void {
  }

  submitEditForm(photoDetails : PhotoModel) {
    this.store.dispatch(PhotoActions.editPhoto({photo: photoDetails}));
  }
}
