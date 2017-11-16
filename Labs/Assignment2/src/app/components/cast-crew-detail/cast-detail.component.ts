import { Component, OnInit } from '@angular/core';

import { Episode } from '../../models/episode';

import { TVMazeService } from '../../services/tvmaze.service';

@Component({
  selector: 'app-cast-detail',
  templateUrl: './cast-detail.component.html',
  styleUrls: ['./cast-detail.component.css']
})
export class CastDetailComponent implements OnInit {
  episode: Episode;

  constructor(
    private tvMazeService: TVMazeService) { }

  ngOnInit() {
    this.tvMazeService.currentEpisode.subscribe(episode => this.episode = episode);
    this.tvMazeService.currentShow.subscribe(show => this.clearEpisode());
  }

  clearEpisode() {
    this.episode = null;
  }

}
