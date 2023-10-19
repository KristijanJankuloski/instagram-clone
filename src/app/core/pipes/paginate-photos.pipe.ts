import { Pipe, PipeTransform } from '@angular/core';
import { PhotoModel } from '../models/photo.model';

@Pipe({
  name: 'paginatePhotos',
  standalone: true
})
export class PaginatePhotosPipe implements PipeTransform {

  transform(value: PhotoModel[], pageIndex: number, pageSize: number): PhotoModel[] {
    let endIndex = (pageIndex*pageSize + pageSize) > value.length? -1 : (pageIndex*pageSize + pageSize);
    return value.slice((pageIndex*pageSize), endIndex);
  }

}
