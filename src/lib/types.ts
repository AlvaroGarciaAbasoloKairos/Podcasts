export interface Podcast {
  trackId: number;
  artworkUrl100: string;
  collectionName: string;
  artistName: string;
  feedUrl: string;
  releaseDate: string;
  trackUrl:string;
}

export type PodcastData = {
  podcastDescription: string;
  episodes: {
    title: string;
    description: string;
    pubDate: string;
    duration: string;
    image: string;
    author: string;
    enclosureUrl:string;
    artworkUrl160: string;
    trackName:string;
    collectionName: string;
    episodeUrl:string;
    
  }[];
};

export interface Episode {
  artistIds: number[];
  artistViewUrl: string;
  artworkUrl60: string;
  artworkUrl160: string;
  artworkUrl600: string;
  closedCaptioning: string;
  collectionId: number;
  collectionName: string;
  collectionViewUrl: string;
  contentAdvisoryRating: string;
  country: string;
  description: string;
  episodeContentType: string;
  episodeFileExtension: string;
  episodeGuid: string;
  episodeUrl: string;
  feedUrl: string;
  genres: { id: string; name: string }[];
  kind: string;
  previewUrl: string;
  releaseDate: string;
  shortDescription: string;
  trackId: number;
  trackName: string;
  trackTimeMillis: number;
  trackViewUrl: string;
  wrapperType: string;
  title: string;
  pubDate: string;
  duration: string;
  image: string;
  author: string;
  enclosureUrl: string;
  trackUrl:string
}