import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsCardComponent } from './albums-card.component';

describe('AlbumsCardComponent', () => {
  let component: AlbumsCardComponent;
  let fixture: ComponentFixture<AlbumsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AlbumsCardComponent]
    });
    fixture = TestBed.createComponent(AlbumsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
