import { Show } from './show';

// this class is defined based on the structure of the JSON data returned from the API

export class ShowSearchResult {
  score: number; // seems to be the weighting of the api searchShows query...the higher the score, the higher the result
  show: Show;
}
