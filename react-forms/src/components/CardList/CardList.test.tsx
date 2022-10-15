/* import { render, screen } from '@testing-library/react';
import React from 'react';
import CardList from './CardList';

const mockData = [
  {
    id: '1',
    price: '100$',
    model: 'Volkswagen',
    year: '1985',
    img: '/images/car-1.jpg',
  },
  {
    id: '2',
    price: '200$',
    model: 'Ferrari',
    year: '1990',
    img: '/images/car-2.jpg',
  },
  {
    id: '3',
    price: '300$',
    model: 'Fiat',
    year: '1992',
    img: '/images/car-3.jpg',
  },
  {
    id: '4',
    price: '400$',
    model: 'Chevrolet',
    year: '1982',
    img: '/images/car-4.jpg',
  },
];

describe('CardList', () => {
  it('num of cards should be equal data length', () => {
    render(<CardList data={mockData} />);

    expect(screen.getAllByTestId('card')).toHaveLength(mockData.length);
  });

  it('displayed data should be equal mock data', () => {
    render(<CardList data={mockData} />);

    mockData.forEach((data) => {
      expect(screen.getByText(data.model));
      expect(screen.getByText(`Released in ${data.year}`));
      expect(screen.getByText(data.price));
    });
  });
});
 */
