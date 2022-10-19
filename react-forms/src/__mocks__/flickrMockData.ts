export const mockData = {
  interestingness: {
    photos: {
      photo: [{ id: 'interestingness_id', secret: 'secret', server: 'server', title: 'title' }],
    },
  },
  photosInfo: {
    photo: {
      description: { _content: 'Test description' },
      id: '1',
      owner: {
        username: 'Test user',
      },
      secret: 'secret',
      server: 'server',
      tags: { tag: [{ id: 'tagId', _content: 'tag content' }] },
      title: { _content: 'title' },
    },
  },
  searchedPhotos: {
    photos: {
      photo: [{ id: 'searched_id', secret: 'secret', server: 'server', title: 'title' }],
    },
  },
};
