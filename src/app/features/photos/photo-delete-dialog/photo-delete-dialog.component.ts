import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PhotoModel } from 'src/app/core/models/photo.model';

@Component({
  selector: 'app-photo-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDialogModule, MatButtonModule],
  templateUrl: './photo-delete-dialog.component.html',
  styleUrls: ['./photo-delete-dialog.component.scss']
})
export class PhotoDeleteDialogComponent {
  constructor(private dialogRef: MatDialogRef<PhotoDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: PhotoModel){}

  close(){
    this.dialogRef.close(false);
  }

  deleteConfirm() {
    this.dialogRef.close(true)
  }
}
