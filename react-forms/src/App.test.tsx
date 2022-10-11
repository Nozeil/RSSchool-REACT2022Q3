import React from 'react';
import App from 'App';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (component: React.ReactElement, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    ...render(component, { wrapper: BrowserRouter }),
  };
};

describe('App routing', () => {
  it('should be rendered error page', () => {
    renderWithRouter(<App />, { route: '/badpagequery' });
    expect(screen.getByText(/Oops... something went wrong/));
  });

  it('should be rendered error page', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByTestId('error'));
    expect(screen.getByText(/Oops... something went wrong/));
  });

  it('should be rendered about page', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByTestId('about'));
    expect(screen.getByText(/Its about us page/));
  });

  it('should be rendered home page', () => {
    renderWithRouter(<App />, { route: '/about' });
    fireEvent.click(screen.getByTestId('home'));
    expect(screen.getByPlaceholderText('Search...'));
    expect(screen.getByTestId('cards')).toBeInTheDocument();
  });

  it('should be rendered form page', () => {
    renderWithRouter(<App />, { route: '/forms' });
    fireEvent.click(screen.getByTestId('forms'));
    expect(screen.getByTestId('form')).toBeInTheDocument();
  });
});
