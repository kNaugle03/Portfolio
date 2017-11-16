import {  Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Show } from '../models/show';
import { ShowSearchResult} from '../models/showsearchresult';
import { Episode } from '../models/episode';
import {Person} from "../models/person";
import {PersonSearchResult} from "../models/personsearchresult";

@Injectable()
export class TVMazeService {

  private showSource = new BehaviorSubject<Show>(null);
  currentShow = this.showSource.asObservable();

  private episodeSource = new BehaviorSubject<Episode>(null);
  currentEpisode = this.episodeSource.asObservable();

  private personSource = new BehaviorSubject<Person>(null);
  currentPerson = this.personSource.asObservable();

  constructor(private http: Http) { }

  // this gets called when a specific show is selected from the list of shows.
  // the specific show is retrieved from the public API with the additional episodes, cast, and crew data.
  loadAdditionalShowData(show: Show): Promise<Show> {
    return this.http
      .get(`${environment.apiRootUrl}/shows/${show.id}?embed[]=episodes&embed[]=cast&embed[]=crew`)
      .toPromise()
      .then(response => response.json() as Show) // when received, JSON response is converted to Show object
                                                           // this Show object contains additional episodes,
                                                           // cast and crew data
      .catch(this.handleError);
  }

  // get called when user has typed in the searchShows box and 300 milliseconds have elapsed since last type
  // the API seems to only return up to a maximum of ten searchShows results for a term...limitation of the API
  searchShows(term: string): Observable<ShowSearchResult[]> {
    return this.http
      .get(`${environment.apiRootUrl}/search/shows?q=${term}`) // build the url to get required data
      .map(response => response.json() as ShowSearchResult[]);
  }

  searchPeople(term: string): Observable<PersonSearchResult[]> {
    return this.http
      .get(`${environment.apiRootUrl}/search/people?q=${term}`)
      .map(response => response.json() as PersonSearchResult[]);
  }

  // Called by another component when it wishes to notify the service that the selected show has been updated.
  // Because showSource is an observable, when it is changed, it broadcasts out to all
  // other components in the app that have subscribed to the observable in order to inform them that
  // a changed has occurred.
  changeCurrentShow(show: Show) {
    this.showSource.next(show);
  }

  changeCurrentPerson(person: Person){
    this.personSource.next(person);
  }


  // Called by another component when it wishes to notify the service that the selected episode has been updated.
  // Because episodeSource is an observable, when it is changed, it broadcasts out to all
  // other components in the app that have subscribed to the observable in order to inform them that
  // a changed has occurred.
  changeCurrentEpisode(episode: Episode) {
    this.episodeSource.next(episode);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
