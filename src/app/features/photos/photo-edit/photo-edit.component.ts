import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosService } from 'src/app/core/services/photos.service';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-photo-edit',
  standalone: true,
  imports: [CommonModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.scss']
})
export class PhotoEditComponent implements OnInit {
  private photoService = inject(PhotosService);
  route = inject(ActivatedRoute);
  photoDetails = this.photoService.photoDetails$.value;
  inputForm: FormGroup;

  ngOnInit(): void {

    this.initForm();
  }

  initForm() {
    this.inputForm = new FormGroup({
      title: new FormControl(this.photoDetails.title, [Validators.required, Validators.minLength(5)])
    });
  }

  submitEditForm() {
    if(!this.inputForm.valid) return;

    this.photoService.editPhoto({...this.photoDetails, ...this.inputForm.value});
  }
}
