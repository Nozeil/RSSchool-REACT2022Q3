import { ApiMethods } from './api.enums';
import { InterestingnessI, PhotosInfoI, photosParamsI, SearchedPhotosI } from './api.interfaces';
import axiosInstance from './axios-instance';

const API = {
  async getInterestingness() {
    const method = ApiMethods.flickrInterestingnessGetList;
    const perPage = 500;
    const res = await axiosInstance.get<InterestingnessI>('', {
      params: {
        method,
        per_page: perPage,
      },
    });
    return res.data;
  },

  async getInfo(photoId: string) {
    const method = ApiMethods.flickrPhotosGetInfo;
    const res = await axiosInstance.get<PhotosInfoI>('', {
      params: {
        method,
        photo_id: photoId,
      },
    });
    return res.data;
  },

  async getPhotos({ tags, sort, page, perPage }: photosParamsI) {
    const method = ApiMethods.flickrPhotosSearch;
    const res = await axiosInstance.get<SearchedPhotosI>('', {
      params: {
        method,
        tags,
        sort,
        page,
        per_page: perPage,
      },
    });

    return res.data;
  },

  async getData(photosParams?: photosParamsI) {
    const data = photosParams
      ? await this.getPhotos(photosParams)
      : await this.getInterestingness();
    const photosInfo = data.photos.photo.map(async (photo) => (await this.getInfo(photo.id)).photo);
    return { data: await Promise.all(photosInfo), pages: data.photos.pages };
  },
};

export default API;
