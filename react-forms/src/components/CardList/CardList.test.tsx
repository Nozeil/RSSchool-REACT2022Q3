import { render, screen } from '@testing-library/react';
import { PhotosInfoPhotoI } from 'api/api.interfaces';
import React from 'react';
import { mockData } from '__mocks__/flickrMockData';
import CardList from './CardList';

const data = [mockData.photosInfo.photo] as PhotosInfoPhotoI[];

describe('CardList', () => {
  it('num of cards should be equal data length', () => {
    render(<CardList data={data} />);
    expect(screen.getAllByTestId('card')).toHaveLength(data.length);
  });

  it('displayed data should be equal mock data', () => {
    const { getByTestId } = render(<CardList data={data} />);
    const { owner, title } = mockData.photosInfo.photo;
    const card = getByTestId('card');
    data.forEach(() => {
      expect(card).toContainHTML(owner.username);
      expect(card).toContainHTML(title._content);
    });
  });
});
