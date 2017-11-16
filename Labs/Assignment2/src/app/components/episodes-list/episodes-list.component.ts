import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';

import { Show } from '../../models/show';
import { Episode } from '../../models/episode';

import { TVMazeService } from '../../services/tvmaze.service';

@Component({
  selector: 'app-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: [ './episodes-list.component.css' ]
})
export class EpisodesListComponent implements OnInit {

  selectedEpisode: Episode;
  currentShow: Show;
  episodesList: Episode[];

  @ViewChild('episodesContainer') listDisplay: ElementRef;


  constructor(
    private tvMazeService: TVMazeService) { }


  ngOnInit(): void {
    // get notified when the current show changes
    this.tvMazeService.currentShow.subscribe(show => this.updateEpisodeList(show));
  }

  updateEpisodeList(show: Show) {
    // empty the existing episodes-list list
    this.episodesList = [];

    // reset the selected episode back to nothing...which removes the blue highlighting of a selected episode
    this.selectedEpisode = null;

    // set the show to the newly selected one
    this.currentShow = show;

    // if the show has episodes-list loaded, then fill the episode list
    if (this.currentShow && this.currentShow._embedded && this.currentShow._embedded.episodes) {
      this.episodesList = show._embedded.episodes;
    }

    // scroll the list of episodes-list back to the top of the list for newly selected show
    if (this.listDisplay) {
      this.listDisplay.nativeElement.scrollTop = 0;
    }

  }

  onSelect(episode: Episode): void {
    if (!this.selectedEpisode || episode.id !== this.selectedEpisode.id) {
      this.selectedEpisode = episode;
      this.tvMazeService.changeCurrentEpisode(episode); // notify service that episode has been changed
                                                        // so that any component that has subscribed will be notified
    }
  }
}
