import { PhotosInfoPhotoI, TagI } from 'api/api.interfaces';

export interface CardListPropsI {
  data: PhotosInfoPhotoI[];
}

export interface CardListStateI {
  modalDescription: string;
  modalTags: TagI[];
  modalSrc: string;
  modalTitle: string;
  modalSubtitle: string;
}
