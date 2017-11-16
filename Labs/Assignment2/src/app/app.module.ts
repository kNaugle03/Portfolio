import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

// import custom components
import { AppComponent } from './app.component';
import { ShowsListComponent } from './components/shows-list/shows-list.component';
import { ShowDetailComponent } from './components/show-detail/show-detail.component';
import { EpisodesListComponent } from './components/episodes-list/episodes-list.component';
import { EpisodeDetailComponent } from './components/episode-detail/episode-detail.component';
import { ShowsDisplayComponent } from './components/shows-display/shows-display.component';

// import custom services
import { TVMazeService } from './services/tvmaze.service';
import {PeopleDisplayComponent} from "./components/people-display/people-display.component";
import {AppRoutingModule} from "./app-routing.module";
import {PeopleListComponent} from "./components/people-list/people-list.component";
import {PeopleDetailComponent} from "./components/people-detail/people-detail.component";
import {CastCreditsComponent} from "./components/cast-crew-credits/cast-credits.component";
import {CastDetailComponent} from "./components/cast-crew-detail/cast-detail.component";


@NgModule({
  declarations: [
    AppComponent,
    ShowsListComponent,
    ShowDetailComponent,
    EpisodesListComponent,
    EpisodeDetailComponent,
    ShowsDisplayComponent,
    PeopleDisplayComponent,
    PeopleListComponent,
    PeopleDetailComponent,
    CastCreditsComponent,
    CastDetailComponent
  ],
  imports: [
    AccordionModule.forRoot(), // imported from 3rd party package called 'ngx-bootstrap'
    BrowserModule,
    FlexLayoutModule,
    HttpModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.rectangleBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.2)',
      backdropBorderRadius: '10px',
      fullScreenBackdrop: true,
      primaryColour: '#000000',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
    AppRoutingModule
  ],
  providers: [ TVMazeService ], // this can be injected into any component if needed
  bootstrap: [ AppComponent ]
})
export class AppModule { }
