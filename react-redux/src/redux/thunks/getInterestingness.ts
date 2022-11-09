import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'api/api';
import { PhotosInfoPhotoI } from 'api/api.interfaces';
import { RootState } from 'redux/types';

const getInterestingness = createAsyncThunk<
  PhotosInfoPhotoI[] | undefined,
  void,
  { state: RootState }
>('app/getInterestingness', async () => {
  try {
    const data = await API.getInterestingness();
    const info = data.photos.photo.map(async (photo) => (await API.getInfo(photo.id)).photo);
    return await Promise.all(info);
  } catch (e) {
    console.error(e);
  }
});

export default getInterestingness;
