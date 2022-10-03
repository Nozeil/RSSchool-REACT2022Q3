import { render, screen } from '@testing-library/react';
import React from 'react';
import Card from './Card';

describe('Card', () => {
  const mockData = {
    id: '1',
    price: '10$',
    model: 'Volkswagen',
    year: '1990',
    img: '/images/car-1.jpg',
  };
  it('card should be rendered with mock data', async () => {
    render(<Card cardData={mockData} />);

    const img = await screen.findByTestId('img');

    expect(screen.findByText(mockData.model));
    expect(screen.findByText(mockData.price));
    expect(screen.findByText(mockData.year));

    if (img instanceof HTMLImageElement) {
      expect(img.src).toMatch(mockData.img);
    }
  });
});
