import axios, { AxiosInstance } from 'axios';
import { InterestingnessI, PhotosInfoI } from './api.interfaces';

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
    const res = await this.axiosInstance.get<InterestingnessI>('', {
      params: {
        method,
      },
    });
    return res.data;
  }

  async getInfo(photoId: string) {
    const method = 'flickr.photos.getInfo';
    const res = await this.axiosInstance.get<PhotosInfoI>('', {
      params: {
        method,
        photo_id: photoId,
      },
    });
    return res.data;
  }
}

export default new API();
