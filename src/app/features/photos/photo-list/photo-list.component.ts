import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosService } from 'src/app/core/services/photos.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PhotoComponent } from '../photo/photo.component';
import { PhotoModel } from 'src/app/core/models/photo.model';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-photo-list',
  standalone: true,
  imports: [CommonModule, PhotoComponent, ScrollingModule, MatButtonModule, MatPaginatorModule, RouterLink],
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity: 0
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ])
    ])
  ]
})
export class PhotoListComponent implements OnInit, OnDestroy {
  private photoService = inject(PhotosService);
  private route = inject(ActivatedRoute);
  photos$ = this.photoService.photos$;
  subscription = new Subscription();
  paramSub = new Subscription();
  pageIndex = 0;
  pageSize = 10;
  allPhotos: PhotoModel[] = [];
  listToDisplay:PhotoModel[] = [];

  ngOnInit(): void {
    this.paramSub = this.route.queryParamMap.subscribe({
      next: params => {
        let albumId = +params.get('album');
        this.fetchData(albumId);
      }
    });
  }
  
  fetchData(albumId = 0){
    if(albumId > 0 && !isNaN(albumId)) {
      this.photoService.getPhotosByAlbumId(albumId);
    }
    else {
      this.photoService.getPhotos();
    }
    this.subscription = this.photoService.photos$.subscribe({
      next: value => {
        if(!value) return;
  
        this.allPhotos = [...value];
        this.listToDisplay = this.allPhotos.slice((this.pageIndex*this.pageSize), (this.pageIndex*this.pageSize) + this.pageSize);
      }
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.paramSub.unsubscribe();
  }
  
  pageEvent(event: PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    let endIndex = (this.pageIndex*this.pageSize + this.pageSize) >= this.allPhotos.length? this.allPhotos.length - 1 : (this.pageIndex*this.pageSize + this.pageSize);
    this.listToDisplay = this.allPhotos.slice((this.pageIndex*this.pageSize), endIndex);
  }
}
