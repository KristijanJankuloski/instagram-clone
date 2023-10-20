import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { PhotoComponent } from '../photo/photo.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { Store } from '@ngrx/store';
import { State } from '../state/photo.reducer';
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
export class PhotoListComponent {
  private route = inject(ActivatedRoute);

  photos$ = this.route.data;
  pageIndex = 0;
  pageSize = 10;
  
  pageEvent(event: PageEvent){
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }
}
