import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PhotoComponent } from '../photo/photo.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Store } from '@ngrx/store';
import { State } from '../state/photo.reducer';
import { PhotoActions } from '../state';
import { PaginatePhotosPipe } from "../../../core/pipes/paginate-photos.pipe";

@Component({
    selector: 'app-photo-list',
    standalone: true,
    templateUrl: './photo-list.component.html',
    styleUrls: ['./photo-list.component.scss'],
    animations: [
        trigger('openClose', [
            transition(':enter', [
              style({
                opacity: 0,
                transform: 'translateY(50%)'
              }),
              animate('400ms ease-in', style({
                opacity: 1,
                transform: 'translateY(0)'
              }))
            ])
        ])
    ],
    imports: [
      CommonModule, 
      PhotoComponent, 
      ScrollingModule, 
      MatButtonModule, 
      MatPaginatorModule, 
      RouterLink, 
      PaginatePhotosPipe
    ]
})
export class PhotoListComponent implements OnInit, OnDestroy {
  private store = inject(Store<State>);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  photos$ = this.route.data;
  paramSub = new Subscription();
  pageIndex = 0;
  pageSize = 10;

  ngOnInit(): void {
    this.paramSub = this.route.queryParamMap.subscribe({
      next: params => {
        let albumId = +params.get('album');
        this.fetchDataFromStore(albumId);
      }
    });
  }
  
  fetchDataFromStore(albumId = 0) {
    if(!!albumId && (isNaN(albumId) || albumId <= 0))
      this.router.navigate(['/not-found']);
    else if(albumId > 0)
      this.store.dispatch(PhotoActions.loadByAlbumId({albumId}))
    else
      this.store.dispatch(PhotoActions.loadAllPhotos());
  }
  
  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
  }
  
  pageEvent(event: PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
