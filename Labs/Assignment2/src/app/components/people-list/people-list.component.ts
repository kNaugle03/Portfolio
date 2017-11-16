import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

// models
import { Show } from '../../models/show';
import {Person} from "../../models/person";
import {PersonSearchResult} from "../../models/personsearchresult";

// services
import { TVMazeService } from '../../services/tvmaze.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: [ './people-list.component.css' ]
})
export class PeopleListComponent implements OnInit, OnDestroy {

  loading = false;

  selectedPerson: Person;
  personList: Person[];

  searchResults: Observable<PersonSearchResult[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private tvMazeService: TVMazeService) { }

  // Push a searchShows term into the observable stream. The term comes from the searchShows textbox
  searchPeople(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {

    // sets up the searchResults observable which will be updated whenever a user types in searchShows terms
    this.searchResults = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next searchShows term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http searchShows observable
        ? this.tvMazeService.searchPeople(term)
        // or the observable of empty personList-list if there was no searchShows term
        : Observable.of<PersonSearchResult[]>([]))
      .catch(error => {
        // add real error handling...in real development scenario
        console.log(`Error in component ... ${error}`);
        return Observable.of<PersonSearchResult[]>([]);
      });

    // Subscribe to the searchShows results so that we can changes to the searchShows results
    this.searchResults.subscribe( results => this.displayResults(results));

    this.tvMazeService.currentPerson.subscribe(person => this.updatePersonInList(person));
  }

  ngOnDestroy() {
    this.tvMazeService.changeCurrentShow(null);
  }

  displayResults(searchResults: PersonSearchResult[]) {
    // extract every show from the searchShows results into the personList array
    this.personList = searchResults.map(searchResult => searchResult.person);

    this.tvMazeService.changeCurrentShow(null); // notify the service that show has been changed
    // so that any component that has subscribed will be notified
  }

  // executes when user selects a show from the list
  onSelect(person: Person): void {
    if (!this.selectedPerson || (person.id !== this.selectedPerson.id)) {
      this.loading = true; // start the spinner

      // // check to see if this show has already been loaded with additional embedded data
      // if (!person._embedded) {
      //   this.tvMazeService.loadAdditionalShowData(person)
      //     .then(updatedshow => this.tvMazeService.changeCurrentShow(updatedshow))
      //     .then(updatedshow => this.loading = false); // stop the spinner
      // } else {
        // we don't need to go to the API....the embedded data is already loaded
        this.tvMazeService.changeCurrentPerson(person); // notify the service that show has been changed
                                                    // so that any component that has subscribed will be notified
        this.loading = false; // stop the spinner

    }
  }

  // updates the selected show in the personList-list array with an updated show with all additional data loaded
  updatePersonInList(person: Person) {
    if (this.personList && person) {
      for (let i = 0; i < this.personList.length; i++) {
        if (this.personList[i].id === person.id) {
          this.personList[i] = person; // swap out the original show in the array with
                                    // the one that now has the additional embedded data
          break;
        }
      }
    }
    this.selectedPerson = person;
  }
}
