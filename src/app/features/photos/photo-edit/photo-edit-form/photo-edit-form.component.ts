import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PhotoModel } from 'src/app/core/models/photo.model';

@Component({
  selector: 'app-photo-edit-form',
  standalone: true,
  imports: [CommonModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './photo-edit-form.component.html',
  styleUrls: ['./photo-edit-form.component.scss']
})
export class PhotoEditFormComponent implements OnInit {
  @Input() photoDetails: PhotoModel;
  @Output() onFromSubmit = new EventEmitter<PhotoModel>();
  inputForm: FormGroup;
  
  ngOnInit(): void {
    this.inputForm = new FormGroup({
      title: new FormControl(this.photoDetails.title, [Validators.required])
    });
  }

  submitEditForm() {
    if(this.inputForm.invalid) return;
    const result: PhotoModel = { ...this.photoDetails, ...this.inputForm.value }
    this.onFromSubmit.emit(result);
  }
}
