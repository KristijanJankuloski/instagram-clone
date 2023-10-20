export interface PhotoModel {
    id: number;
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export interface PhotoCreateModel {
    albumId: number;
    title: number;
    image: Blob;
}