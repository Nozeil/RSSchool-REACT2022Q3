import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import appReducer from './../redux/appSlice';

export const renderWithRouter = (component: React.ReactElement, route: string) => {
  window.history.pushState({}, 'Test page', route);

  return {
    ...render(component, { wrapper: BrowserRouter }),
  };
};

export const renderWithProviderAndRouter = (
  providerChildren: React.ReactElement,
  { route = '/' } = {}
) => {
  const store = configureStore({
    reducer: appReducer,
  });

  const getComponent = () => <Provider store={store}>{providerChildren}</Provider>;

  return renderWithRouter(getComponent(), route);
};
