import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoEditFormComponent } from './photo-edit-form.component';

describe('PhotoEditFormComponent', () => {
  let component: PhotoEditFormComponent;
  let fixture: ComponentFixture<PhotoEditFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PhotoEditFormComponent]
    });
    fixture = TestBed.createComponent(PhotoEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
