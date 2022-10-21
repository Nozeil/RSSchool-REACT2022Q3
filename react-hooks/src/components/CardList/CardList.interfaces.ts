import { PhotosInfoPhotoI, TagI } from 'api/api.interfaces';

export interface CardListPropsI {
  data: PhotosInfoPhotoI[];
}

export interface CardListStateI {
  modalDescription: string;
  modalTags: TagI[];
  isModalOpen: boolean;
  modalSrc: string;
  modalTitle: string;
  modalSubtitle: string;
}
