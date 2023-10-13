import { Component, OnInit, inject, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosService } from 'src/app/core/services/photos.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PhotoComponent } from '../photo/photo.component';
import { PhotoModel } from 'src/app/core/models/photo.model';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photo-list',
  standalone: true,
  imports: [CommonModule, PhotoComponent, ScrollingModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit, OnDestroy {
  private photoService = inject(PhotosService);
  private route = inject(ActivatedRoute);

  photos$ = this.photoService.photos$;
  subscription = new Subscription();
  pageIndex = 0;
  pageSize = 10;
  allPhotos: PhotoModel[] = [];
  listToDisplay:PhotoModel[] = [];

  ngOnInit(): void {
    this.photoService.getPhotos();
    this.subscription = this.photoService.photos$.subscribe({
      next: value => {
        if(!value) return;
        let albumId = Number.parseInt(this.route.snapshot.queryParams['album']);
        if(albumId != 0 && !isNaN(albumId)){
          this.allPhotos = value.filter(v => v.albumId === albumId);
        }
        else {
          this.allPhotos = [...value];
        }
        this.listToDisplay = this.allPhotos.slice((this.pageIndex*this.pageSize), (this.pageIndex*this.pageSize) + this.pageSize);
      }
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  pageEvent(event: PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.listToDisplay = this.allPhotos.slice((this.pageIndex*this.pageSize), (this.pageIndex*this.pageSize) + this.pageSize);
  }
}
