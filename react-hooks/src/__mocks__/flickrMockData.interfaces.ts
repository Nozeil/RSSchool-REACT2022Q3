export interface MockDataI {
  interestingness: {
    photos: {
      photo: [{ id: string; secret: string; server: string; title: string }];
    };
  };
  photosInfo: {
    photo: {
      description: { _content: string };
      id: string;
      owner: {
        username: string;
      };
      secret: string;
      server: string;
      tags: { tag: [{ id: string; _content: string }] };
      title: { _content: string };
    };
  };
  searchedPhotos: {
    photos: {
      photo: [{ id: string; secret: string; server: string; title: string }];
    };
  };
}
