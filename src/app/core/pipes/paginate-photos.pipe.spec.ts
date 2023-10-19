import { PaginatePhotosPipe } from './paginate-photos.pipe';

describe('PaginatePhotosPipe', () => {
  it('create an instance', () => {
    const pipe = new PaginatePhotosPipe();
    expect(pipe).toBeTruthy();
  });
});
