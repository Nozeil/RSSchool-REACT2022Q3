export interface InterestingnessI {
  extra: {
    explore_date: string;
    next_prelude_interval: 46917;
  };
  photos: {
    page: number;
    pages: number;
    photo: PhotoI[];
    total: number;
  };
}

interface PhotoI {
  farm: number;
  id: string;
  isfamily: number;
  isfriend: number;
  ispublic: number;
  owner: string;
  secret: string;
  server: string;
  title: string;
}

export interface PhotosInfoI {
  photo: PhotosInfoPhotoI;
  stat: string;
}

export interface PhotosInfoPhotoI {
  comments: {
    _content: string;
  };
  dates: {
    lastupdate: string;
    posted: string;
    taken: string;
    takengranularity: number;
    takenunknown: string;
  };
  dateuploaded: string;
  description: { _content: string };
  editability: {
    canaddmeta: number;
    cancomment: number;
  };
  farm: number;
  geoperms: {
    iscontact: number;
    isfamily: number;
    isfriend: number;
    ispublic: number;
  };
  id: string;
  isfavorite: number;
  license: string;
  location: {
    accuracy: string;
    context: string;
    country: { _content: string };
    county: { _content: string };
    latitude: string;
    locality: { _content: string };
    longitude: string;
    neighbourhood: { _content: string };
    region: { _content: string };
  };
  media: string;
  notes: { note: string[] };
  owner: {
    gift: { gift_eligible: boolean; eligible_durations: string[]; new_flow: boolean };
    iconfarm: number;
    iconserver: string;
    location: null;
    nsid: string;
    path_alias: string;
    realname: string;
    username: string;
  };
  people: { haspeople: number };
  publiceditability: { cancomment: number; canaddmeta: number };
  rotation: number;
  safety_level: string;
  secret: string;
  server: string;
  tags: { tag: TagI[] };
  title: { _content: string };
  urls: { url: UrlI[] };
  usage: { candownload: number; canblog: number; canprint: number; canshare: number };
  views: string;
  visibility: { ispublic: number; isfriend: number; isfamily: number };
}

interface TagI {
  author: string;
  authorname: string;
  id: string;
  machine_tag: number;
  raw: string;
  _content: string;
}

interface UrlI {
  type: string;
  _content: string;
}

export interface SearchedPhotosI {
  stat: string;
  photos: {
    page: number;
    pages: number;
    perpage: number;
    photo: PhotoI[];
    total: number;
  };
}
