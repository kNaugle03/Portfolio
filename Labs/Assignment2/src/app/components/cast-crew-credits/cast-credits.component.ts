import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';

import { Show } from '../../models/show';
import { Episode } from '../../models/episode';

import { TVMazeService } from '../../services/tvmaze.service';
import {Person} from "../../models/person";

@Component({
  selector: 'app-cast-credits',
  templateUrl: './cast-credits.component.html',
  styleUrls: [ './cast-credits.component.css' ]
})
export class CastCreditsComponent implements OnInit {

  currentPerson: Person;
  selectedShow: Show;
  showsList: Show[];

  @ViewChild('episodesContainer') listDisplay: ElementRef;


  constructor(private tvMazeService: TVMazeService) { }


  ngOnInit(): void {
    // get notified when the current show changes
    this.tvMazeService.currentPerson.subscribe(person => this.updateCastList(person));
  }

  updateCastList(person: Person) {
    // empty the existing episodes-list list
    this.showsList = [];

    // reset the selected episode back to nothing...which removes the blue highlighting of a selected episode
    this.selectedShow = null;

    // set the show to the newly selected one
    this.currentPerson = person;

    // if the show has episodes-list loaded, then fill the episode list
    if (this.currentPerson && this.currentPerson._embedded && this.currentPerson._embedded.shows) {
      this.showsList = person._embedded.shows;
    }

    // scroll the list of episodes-list back to the top of the list for newly selected show
    if (this.listDisplay) {
      this.listDisplay.nativeElement.scrollTop = 0;
    }

  }

  onSelect(show: Show): void {
    if (!this.selectedShow || show.id !== this.selectedShow.id) {
      this.selectedShow = show;
      this.tvMazeService.changeCurrentShow(show); // notify service that episode has been changed
                                                        // so that any component that has subscribed will be notified
    }
  }
}
