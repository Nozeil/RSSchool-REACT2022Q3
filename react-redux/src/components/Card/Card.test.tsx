import { screen } from '@testing-library/react';
import { PhotosInfoPhotoI } from 'api/api.interfaces';
import { TestIds } from 'enums';
import React from 'react';
import renderWithRouter from 'renderWithRouter';
import { mockData } from '__mocks__/flickrMockData';
import Card from './Card';

const data = mockData.photosInfo.photo as unknown as PhotosInfoPhotoI;

describe('Card', () => {
  it('card should be rendered with mock data', () => {
    renderWithRouter(<Card cardData={data} />);
    const { owner, title, server, id, secret } = mockData.photosInfo.photo;
    const img = screen.getByTestId(TestIds.cardImg);

    expect(screen.getByText(`by ${owner.username}`)).toBeInTheDocument();
    expect(screen.getByText(title._content)).toBeInTheDocument();
    if (img instanceof HTMLImageElement) {
      expect(img.src).toMatch(`https://live.staticflickr.com/${server}/${id}_${secret}_b.jpg`);
    }
  });
});
