import axios, { AxiosInstance } from 'axios';
import { InterestingnessI, PhotosInfoI, SearchedPhotosI } from './api.interfaces';

class API {
  baseURL: string;
  key: string;
  format: string;
  axiosInstance: AxiosInstance;

  constructor() {
    this.baseURL = 'https://api.flickr.com/services/rest/';
    this.key = 'ef34b6075bcc23dcc4b06a385f209925';
    this.format = 'json';
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      params: {
        api_key: this.key,
        format: this.format,
        nojsoncallback: 1,
      },
    });
  }

  async getInterestingness() {
    const method = 'flickr.interestingness.getList';
    const res = await this.axiosInstance<InterestingnessI>('', {
      params: {
        method,
      },
    });
    return res.data;
  }

  async getInfo(photoId: string) {
    const method = 'flickr.photos.getInfo';
    const res = await this.axiosInstance<PhotosInfoI>('', {
      params: {
        method,
        photo_id: photoId,
      },
    });
    return res.data;
  }

  async getPhotos(tags: string) {
    const method = 'flickr.photos.search';
    const res = await this.axiosInstance<SearchedPhotosI>('', {
      params: {
        method,
        tags,
      },
    });

    return res.data;
  }
}

export default new API();
