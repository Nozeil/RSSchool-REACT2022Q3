import { AxiosInstance } from 'axios';
import { ApiMethods } from './api.enums';
import { InterestingnessI, PhotosInfoI, SearchedPhotosI } from './api.interfaces';
import axiosInstance from './axios-instance';

class API {
  axiosInstance: AxiosInstance;

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  async getInterestingness() {
    const method = ApiMethods.flickrInterestingnessGetList;
    const res = await this.axiosInstance.get<InterestingnessI>('', {
      params: {
        method,
      },
    });
    return res.data;
  }

  async getInfo(photoId: string) {
    const method = ApiMethods.flickrPhotosGetInfo;
    const res = await this.axiosInstance.get<PhotosInfoI>('', {
      params: {
        method,
        photo_id: photoId,
      },
    });
    return res.data;
  }

  async getPhotos(tags: string) {
    const method = ApiMethods.flickrPhotosSearch;
    const res = await this.axiosInstance.get<SearchedPhotosI>('', {
      params: {
        method,
        tags,
      },
    });

    return res.data;
  }

  async getData(tags?: string) {
    const photos = tags
      ? (await this.getPhotos(tags)).photos.photo
      : (await this.getInterestingness()).photos.photo;
    const photosInfo = photos.map(async (photo) => (await this.getInfo(photo.id)).photo);
    return await Promise.all(photosInfo);
  }
}

export default new API(axiosInstance);
