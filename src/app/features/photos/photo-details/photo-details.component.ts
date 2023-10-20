import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { State } from '../state/photo.reducer';
import { UserSelectors } from '../../user/state';
import { getShowLoaderState } from 'src/app/core/state/reducers/loader.reducer';
import { PhotoDeleteDialogComponent } from '../photo-delete-dialog/photo-delete-dialog.component';
import { PhotoModel } from 'src/app/core/models/photo.model';
import { PhotoActions } from '../state';

@Component({
  selector: 'app-photo-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatMenuModule, MatIconModule, MatDialogModule, RouterLink],
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss']
})
export class PhotoDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store<State>);
  private userStore = inject(Store<UserSelectors.State>);
  private matDialog = inject(MatDialog);

  isLoading$ = this.store.select(getShowLoaderState);
  user$ = this.userStore.select(UserSelectors.getCurrentUser);
  photoDetails$ = this.route.data;

  ngOnInit(): void {
  }

  openDeleteDialog(photo: PhotoModel) {
    const dialogRef = this.matDialog.open(PhotoDeleteDialogComponent, {data: photo});
    dialogRef.afterClosed().subscribe({
      next: isConfirmed => {
        if(isConfirmed){
          this.store.dispatch(PhotoActions.deletePhotoById({photoId: photo.id}));
        }
      }
    })
  }

}
