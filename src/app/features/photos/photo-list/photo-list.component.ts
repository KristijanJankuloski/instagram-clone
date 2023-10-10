import { Component, OnInit, inject, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosService } from 'src/app/core/services/photos.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PhotoComponent } from '../photo/photo.component';
import { PhotoModel } from 'src/app/core/models/photo.model';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-photo-list',
  standalone: true,
  imports: [CommonModule, PhotoComponent, ScrollingModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit, OnDestroy {
  private photoService = inject(PhotosService);
  photos$ = this.photoService.photos$;
  subscription = new Subscription();
  allPhotos: PhotoModel[] = [];
  listToDisplay:PhotoModel[] = [];
  // allPhotos = [
    //   {
      //     "albumId": 1,
  //     "id": 1,
  //     "title": "accusamus beatae ad facilis cum similique qui sunt",
  //     "url": "https://via.placeholder.com/600/92c952",
  //     "thumbnailUrl": "https://via.placeholder.com/150/92c952"
  //   },
  //   {
  //     "albumId": 1,
  //     "id": 2,
  //     "title": "reprehenderit est deserunt velit ipsam",
  //     "url": "https://via.placeholder.com/600/771796",
  //     "thumbnailUrl": "https://via.placeholder.com/150/771796"
  //   },
  //   {
    //     "albumId": 1,
    //     "id": 3,
    //     "title": "officia porro iure quia iusto qui ipsa ut modi",
    //     "url": "https://via.placeholder.com/600/24f355",
    //     "thumbnailUrl": "https://via.placeholder.com/150/24f355"
    //   },
  //   {
  //     "albumId": 1,
  //     "id": 4,
  //     "title": "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
  //     "url": "https://via.placeholder.com/600/d32776",
  //     "thumbnailUrl": "https://via.placeholder.com/150/d32776"
  //   },
  //   {
  //     "albumId": 1,
  //     "id": 5,
  //     "title": "natus nisi omnis corporis facere molestiae rerum in",
  //     "url": "https://via.placeholder.com/600/f66b97",
  //     "thumbnailUrl": "https://via.placeholder.com/150/f66b97"
  //   },
  //   {
    //     "albumId": 1,
    //     "id": 6,
    //     "title": "accusamus ea aliquid et amet sequi nemo",
    //     "url": "https://via.placeholder.com/600/56a8c2",
    //     "thumbnailUrl": "https://via.placeholder.com/150/56a8c2"
    //   },
    //   {
      //     "albumId": 1,
      //     "id": 7,
      //     "title": "officia delectus consequatur vero aut veniam explicabo molestias",
      //     "url": "https://via.placeholder.com/600/b0f7cc",
      //     "thumbnailUrl": "https://via.placeholder.com/150/b0f7cc"
      //   }]
  ngOnInit(): void {
    this.subscription = this.photos$.subscribe({next: value => {
      this.allPhotos = [...value];
      this.loadMoreItems();
    }, error: err => {
      console.log(err);
    }});
    this.photoService.getPhotos();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  loadMoreItems() {
    const batchSize = 20;
    const startIndex = this.listToDisplay.length;
    const endIndex = startIndex + batchSize;
    this.listToDisplay = this.allPhotos.slice(0, endIndex);
  }
}
