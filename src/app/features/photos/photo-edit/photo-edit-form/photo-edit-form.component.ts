import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PhotoModel } from 'src/app/core/models/photo.model';
import { AlbumModel } from 'src/app/core/models/album.model';
import { FileHandle } from 'src/app/core/directives/file-drag.directive';
import { MatSelectModule } from '@angular/material/select';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-photo-edit-form',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule
  ],
  templateUrl: './photo-edit-form.component.html',
  styleUrls: ['./photo-edit-form.component.scss']
})
export class PhotoEditFormComponent implements OnInit {
  private sanitizer = inject(DomSanitizer);
  @Input() photoDetails: PhotoModel;
  @Input() albums: AlbumModel[];
  @Output() onFromSubmit = new EventEmitter<PhotoModel>();
  inputForm: FormGroup;
  uploadImage: FileHandle;
  
  ngOnInit(): void {
    this.inputForm = new FormGroup({
      title: new FormControl(this.photoDetails.title, [Validators.required]),
      albumId: new FormControl(this.photoDetails.albumId, [Validators.required])
    });
  }
  
  fileInputChange(event: any) {
  const file = event.target.files[0];

    if(file) {
      let fileUrl = window.URL.createObjectURL(file);
      this.uploadImage = {
        file,
        url: this.sanitizer.bypassSecurityTrustUrl(fileUrl)
      }
      this.photoDetails.url = fileUrl;
    }
  }

  submitEditForm() {
    if(this.inputForm.invalid) return;
    const result: PhotoModel = { ...this.photoDetails, ...this.inputForm.value }
    this.onFromSubmit.emit(result);
  }
}
