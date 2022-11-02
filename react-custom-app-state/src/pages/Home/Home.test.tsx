import { render, waitFor, screen } from '@testing-library/react';
import Home from 'pages/Home/Home';
import React from 'react';
import { ApiMethods } from 'api/api.enums';
import { mockData } from '__mocks__/flickrMockData';
import userEvent from '@testing-library/user-event';
import { TestIds } from 'enums';
import { AppProvider } from 'AppContext';
import initAxiosGetMethodMock from '__mocks__/initAxiosGetMethodMock';

const { interestingness, photosInfo, searchedPhotos } = mockData;

const retrieveMockGet = initAxiosGetMethodMock();

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
    await waitFor(() => expect(retrieveMockGet()).toBeCalledTimes(2));
  });

  it('should call to flickr.interestingness.getList and then to flickr.photos.getInfo with the correct args', async () => {
    render(<Home />);
    await waitFor(() => {
      expect(retrieveMockGet()).nthCalledWith(1, '', {
        params: { method: ApiMethods.flickrInterestingnessGetList, per_page: 500 },
      });
      expect(retrieveMockGet()).nthCalledWith(2, '', {
        params: {
          method: ApiMethods.flickrPhotosGetInfo,
          photo_id: interestingness.photos.photo[0].id,
        },
      });
    });
  });
  it('should show 1 card with mock data', async () => {
    render(
      <AppProvider>
        <Home />
      </AppProvider>
    );
    checkCreatedCards(await screen.findAllByTestId(TestIds.card));
  });
});

const searchPhoto = async () => {
  const { getByRole } = screen;
  const search = getByRole('searchbox');
  const user = userEvent.setup();
  await user.type(search, 'test');
  await user.keyboard('[Enter]');
  await user.clear(search);
};

describe('Home view after user search', () => {
  it('should call axios get 4 times', async () => {
    render(
      <AppProvider>
        <Home />
      </AppProvider>
    );
    await searchPhoto();
    await waitFor(() => {
      expect(retrieveMockGet()).toBeCalledTimes(4);
    });
  });
  it('should call to flickr.photos.search and then to flickr.photos.getInfo with the correct args', async () => {
    render(<Home />);
    await searchPhoto();
    await waitFor(() => {
      expect(retrieveMockGet()).toHaveBeenNthCalledWith(3, '', {
        params: {
          method: ApiMethods.flickrPhotosSearch,
          page: 1,
          per_page: 10,
          sort: 'interestingness-desc',
          tags: 'test',
        },
      });
      expect(retrieveMockGet()).toHaveBeenNthCalledWith(4, '', {
        params: {
          method: ApiMethods.flickrPhotosGetInfo,
          photo_id: searchedPhotos.photos.photo[0].id,
        },
      });
    });
  });
  it('should search and show searched data after pressing enter button', async () => {
    render(
      <AppProvider>
        <Home />
      </AppProvider>
    );
    await searchPhoto();
    await waitFor(() => checkCreatedCards(screen.getAllByTestId(TestIds.card)));
  });
});

const showModal = async () => {
  await searchPhoto();
  const card = await screen.findByTestId(TestIds.card);
  const user = userEvent.setup();
  await user.click(card);
};

const closeModal = async (closeMatcher: string) => {
  await showModal();
  const modal = screen.getByTestId(TestIds.modal);
  const user = userEvent.setup();
  await user.click(screen.getByTestId(closeMatcher));
  return modal;
};

describe('Modal', () => {
  it('should show modal after click on card', async () => {
    render(
      <AppProvider>
        <Home />
      </AppProvider>
    );
    await showModal();
    const { getByTestId } = screen;
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
    render(
      <AppProvider>
        <Home />
      </AppProvider>
    );
    const modal = await closeModal('overlay');
    expect(modal).not.toBeInTheDocument();
  });
  it('should close modal after click on overlay', async () => {
    render(
      <AppProvider>
        <Home />
      </AppProvider>
    );
    const modal = await closeModal('close-button');
    expect(modal).not.toBeInTheDocument();
  });
});
