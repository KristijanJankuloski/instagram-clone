import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumCardComponent } from '../album-card/album-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-albums-list',
  standalone: true,
  imports: [CommonModule, AlbumCardComponent],
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.scss']
})
export class AlbumsListComponent {
  private route = inject(ActivatedRoute);
  albums$ = this.route.data;
}
