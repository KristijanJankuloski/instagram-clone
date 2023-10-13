import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PhotosService } from 'src/app/core/services/photos.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { LoadingSpinnerService } from 'src/app/core/services/loading-spinner.service';

@Component({
  selector: 'app-photo-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatMenuModule, MatIconModule, RouterLink],
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss']
})
export class PhotoDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private photoService = inject(PhotosService);
  isLoading$ = inject(LoadingSpinnerService).isLoading$;
  photoDetails$ = this.photoService.photoDetails$;

  ngOnInit(): void {
    let photoId = this.route.snapshot.params.id;
    this.photoService.getPhotoById(photoId);
  }

}
