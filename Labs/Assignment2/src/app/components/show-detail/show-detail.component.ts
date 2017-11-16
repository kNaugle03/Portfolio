import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AccordionPanelComponent } from 'ngx-bootstrap'; // 3rd party package used for bootstrappy stuff (accordion)

import { Show } from '../../models/show';

import { TVMazeService } from '../../services/tvmaze.service';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit {
  @ViewChild('cast') cast: AccordionPanelComponent;
  @ViewChild('crew') crew: AccordionPanelComponent;
  @ViewChild('panel') panel: ElementRef;

  // local variable to hold the currently selected show object
  show: Show;

  // the tvMazeService gets injected into the component via the constructor
  constructor( private tvMazeService: TVMazeService ) { }

  ngOnInit() {

    // subscribe to the observable in the service to react to the changing of a show.
    // when the service notifies that the show has changed, run the showChanged method to update the component
    this.tvMazeService.currentShow.subscribe(show => this.showChanged(show));
  }

  showChanged(show: Show) {
    // update the local show variable to hold the newly selected one
    this.show = show;

    // reset any open accordion components to be re-closed
    if (this.cast) {
      this.cast.isOpen = false;
    }
    if (this.crew) {
      this.crew.isOpen = false;
    }

    // reset scroll back to top of the section
    if (this.panel) {
      this.panel.nativeElement.scrollTop = 0;
    }
  }
}
