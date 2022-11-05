import { TagI } from 'api/api.interfaces';

export interface CardListStateI {
  modalDescription: string;
  modalTags: TagI[];
  modalSrc: string;
  modalTitle: string;
  modalSubtitle: string;
}
