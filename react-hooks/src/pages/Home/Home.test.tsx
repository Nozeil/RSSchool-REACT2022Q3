import { render, waitFor, waitForElementToBeRemoved, screen } from '@testing-library/react';
import Home from 'pages/Home/Home';
import React from 'react';
import axiosInstance from 'api/axios-instance';
import { AxiosRequestConfig } from 'axios';
import { ApiMethods } from 'api/api.enums';
import { mockData } from '__mocks__/flickrMockData';
import userEvent from '@testing-library/user-event';
import { TestIds } from 'enums';

let mockGet: jest.SpyInstance;
const { interestingness, photosInfo, searchedPhotos } = mockData;

beforeEach(() => {
  mockGet = jest
    .spyOn(axiosInstance, 'get')
    .mockImplementation((url: string, config?: AxiosRequestConfig<unknown> | undefined) => {
      switch (config?.params.method) {
        case ApiMethods.flickrInterestingnessGetList:
          return Promise.resolve({ data: interestingness });
        case ApiMethods.flickrPhotosGetInfo:
          return Promise.resolve({ data: photosInfo });
        case ApiMethods.flickrPhotosSearch:
          return Promise.resolve({ data: searchedPhotos });
        default:
          return Promise.reject();
      }
    });
});

afterEach(() => {
  jest.clearAllMocks();
});

const checkCreatedCards = (cards: HTMLElement[]) => {
  expect(cards.length).toBe(1);
  const card = cards[0];
  const { owner, title } = photosInfo.photo;

  expect(card).toContainHTML(owner.username);
  expect(card).toContainHTML(title._content);
};

describe('Home initital view', () => {
  it('should call axios get 2 times', async () => {
    render(<Home />);
    await waitFor(() => expect(mockGet).toBeCalledTimes(2));
  });

  it('should call to flickr.interestingness.getList and then to flickr.photos.getInfo with the correct args', async () => {
    render(<Home />);
    await waitFor(() => {
      expect(mockGet).nthCalledWith(1, '', {
        params: { method: ApiMethods.flickrInterestingnessGetList },
      });
      expect(mockGet).nthCalledWith(2, '', {
        params: {
          method: ApiMethods.flickrPhotosGetInfo,
          photo_id: interestingness.photos.photo[0].id,
        },
      });
    });
  });
  it('should show 1 card with mock data', async () => {
    render(<Home />);
    checkCreatedCards(await screen.findAllByTestId(TestIds.card));
  });
});

const searchPhoto = async () => {
  const { getByRole, getByTestId } = screen;
  const spinner = getByTestId(TestIds.spinner);
  await waitForElementToBeRemoved(spinner);
  const search = getByRole('searchbox');

  userEvent.type(search, 'test');
  userEvent.keyboard('[Enter]');
  userEvent.clear(search);
};

describe('Home view after user search', () => {
  it('should call axios get 4 times', async () => {
    render(<Home />);
    await searchPhoto();
    await waitFor(() => {
      expect(mockGet).toBeCalledTimes(4);
    });
  });
  it('should call to flickr.photos.search and then to flickr.photos.getInfo with the correct args', async () => {
    render(<Home />);
    await searchPhoto();
    await waitFor(() => {
      expect(mockGet).toHaveBeenNthCalledWith(3, '', {
        params: {
          method: ApiMethods.flickrPhotosSearch,
          tags: 'test',
        },
      });
      expect(mockGet).toHaveBeenNthCalledWith(4, '', {
        params: {
          method: ApiMethods.flickrPhotosGetInfo,
          photo_id: searchedPhotos.photos.photo[0].id,
        },
      });
    });
  });
  it('should search and show searched data after pressing enter button', async () => {
    render(<Home />);
    await searchPhoto();
    await waitFor(() => checkCreatedCards(screen.getAllByTestId(TestIds.card)));
  });
});

const showModal = async () => {
  await searchPhoto();
  const card = await screen.findByTestId(TestIds.card);
  userEvent.click(card);
};

const closeModal = async (closeMatcher: string) => {
  await showModal();
  const modal = screen.getByTestId(TestIds.modal);
  userEvent.click(screen.getByTestId(closeMatcher));
  return modal;
};

describe('Modal', () => {
  it('should show modal after click on card', async () => {
    const { getByTestId } = render(<Home />);
    await showModal();
    const modal = getByTestId(TestIds.modal);
    expect(modal).toBeInTheDocument();
    expect(getByTestId(TestIds.overlay)).toBeInTheDocument();
    expect(getByTestId(TestIds.modalImg)).toBeInTheDocument();
    const { description, owner, tags, title } = photosInfo.photo;
    expect(modal).toContainHTML(description._content);
    expect(modal).toContainHTML(owner.username);
    expect(modal).toContainHTML(tags.tag[0]._content);
    expect(modal).toContainHTML(title._content);
  });

  it('should close modal after click on overlay', async () => {
    render(<Home />);
    const modal = await closeModal('close-button');
    expect(modal).not.toBeInTheDocument();
  });
  it('should close modal after click on overlay', async () => {
    render(<Home />);
    const modal = await closeModal('close-button');
    expect(modal).not.toBeInTheDocument();
  });
});
