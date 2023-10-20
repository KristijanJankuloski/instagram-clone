import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FileDragDirective, FileHandle } from '../../../core/directives/file-drag.directive';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoCreateModel } from 'src/app/core/models/photo.model';
import { MatSelectModule } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { State } from '../../albums/state/album.reducer';
import { AlbumSelectors, AlbumActions } from '../../albums/state';

@Component({
  selector: 'app-photo-create',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule, 
    FileDragDirective,
    MatSelectModule
  ],
  templateUrl: './photo-create.component.html',
  styleUrls: ['./photo-create.component.scss']
})
export class PhotoCreateComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);
  private albumStore = inject(Store<State>);
  albums$ = this.albumStore.select(AlbumSelectors.getAllCurrentAlbums);

  createFrom: FormGroup;
  image: FileHandle;
  
  ngOnInit(): void {
    this.albumStore.dispatch(AlbumActions.loadAllAlbums())
    this.initForm();
  }
  initForm() {
    this.createFrom = new FormGroup({
      title: new FormControl('', [Validators.required]),
      albumId: new FormControl(0, [Validators.required])
    });
  }

  fileInputChange(fileInputEvent: any){
    const file = fileInputEvent.target.files[0];

    if(file) {
      this.image = {
        file,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }
    }
  }

  fileDragged(file: FileHandle){
    this.image = file;
  }

  submitForm() {
    if(this.createFrom.invalid) return;

    if(!this.image) return;

    const request : PhotoCreateModel = {
      title: this.createFrom.value.title,
      albumId: this.createFrom.value.albumId,
      image: this.image.file
    }
  }
}
