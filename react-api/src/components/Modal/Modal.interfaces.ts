import { TagI } from 'api/api.interfaces';

export interface ModalPropsI {
  description: string;
  title: string;
  subtitle: string;
  tags: TagI[];
  src: string;
  toggleModalVisibility: (isModalOpen: boolean) => void;
}
