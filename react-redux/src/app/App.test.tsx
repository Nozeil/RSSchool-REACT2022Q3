import React from 'react';
import App from './App';
import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { TestIds } from 'enums';
import initAxiosGetMethodMock from '__mocks__/initAxiosGetMethodMock';
import { renderWithProviderAndRouter } from 'utils/test-utils';

initAxiosGetMethodMock();

describe('App routing', () => {
  it('should be rendered error page', () => {
    renderWithProviderAndRouter(<App />, { route: '/badpagequery' });
    expect(screen.getByText(/Oops... something went wrong/));
  });

  it('should be rendered error page', async () => {
    const { getByTestId } = renderWithProviderAndRouter(<App />);
    await waitForElementToBeRemoved(getByTestId(TestIds.spinner));
    fireEvent.click(screen.getByTestId(TestIds.errorPage));
    expect(screen.getByText(/Oops... something went wrong/));
  });

  it('should be rendered about page', async () => {
    const { getByTestId } = renderWithProviderAndRouter(<App />);
    await waitForElementToBeRemoved(getByTestId(TestIds.spinner));
    fireEvent.click(screen.getByTestId(TestIds.about));
    expect(screen.getByText(/Its about us page/));
  });

  it('should be rendered home page', async () => {
    const { getByTestId } = renderWithProviderAndRouter(<App />, { route: '/about' });
    fireEvent.click(screen.getByTestId(TestIds.home));
    expect(screen.getByTestId(TestIds.spinner)).toBeInTheDocument();
    await waitForElementToBeRemoved(getByTestId(TestIds.spinner));
    expect(screen.getByPlaceholderText('Search...'));
  });

  it('should be rendered form page', async () => {
    renderWithProviderAndRouter(<App />, { route: '/forms' });
    expect(screen.getByTestId(TestIds.form)).toBeInTheDocument();
  });
});
