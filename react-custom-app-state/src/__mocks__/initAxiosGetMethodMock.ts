import axiosInstance from 'api/axios-instance';
import { AxiosRequestConfig } from 'axios';
import { MockDataI } from '__mocks__/flickrMockData.interfaces';
import { ApiMethods } from '../api/api.enums';
import { mockData } from './flickrMockData';

function initAxiosGetMethodMock({
  interestingness,
  photosInfo,
  searchedPhotos,
}: MockDataI = mockData) {
  let mockGet: jest.SpyInstance;

  beforeEach(() => {
    mockGet = jest
      .spyOn(axiosInstance, 'get')
      .mockImplementation((url: string, config?: AxiosRequestConfig<unknown> | undefined) => {
        switch (config?.params.method) {
          case ApiMethods.flickrInterestingnessGetList:
            return Promise.resolve({ data: interestingness });
          case ApiMethods.flickrPhotosGetInfo:
            return Promise.resolve({ data: photosInfo });
          case ApiMethods.flickrPhotosSearch:
            return Promise.resolve({ data: searchedPhotos });
          default:
            return Promise.reject();
        }
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  return () => mockGet;
}

export default initAxiosGetMethodMock;
