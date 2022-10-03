import { render } from '@testing-library/react';
import Home from 'pages/Home/Home';
import React from 'react';

const fetchMock = jest.spyOn(global, 'fetch').mockImplementation(
  jest.fn(() =>
    Promise.resolve({
      json: () => {
        return Promise.resolve([]);
      },
    })
  ) as jest.Mock
);

describe('Home', () => {
  it('should be called once with base url', async () => {
    render(<Home />);

    expect(fetchMock).toBeCalledWith('/mockData.json');
    expect(fetchMock).toBeCalledTimes(1);
  });
});
