import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'api/api';
import { PhotosInfoPhotoI, photosParamsI } from 'api/api.interfaces';
import { RootState } from 'redux/types';

const getPhotos = createAsyncThunk<
  { data: PhotosInfoPhotoI[]; pages: number } | undefined,
  photosParamsI,
  { state: RootState }
>('app/getPhotos', async (photosParams) => {
  try {
    const data = await API.getPhotos(photosParams);
    const info = data.photos.photo.map(async (photo) => (await API.getInfo(photo.id)).photo);
    return { data: await Promise.all(info), pages: data.photos.pages };
  } catch (e) {
    console.error(e);
  }
});

export default getPhotos;
