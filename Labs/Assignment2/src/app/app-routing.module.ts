import {Component, NgModule} from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {ShowsDisplayComponent} from "./components/shows-display/shows-display.component";
import {PeopleDisplayComponent} from "./components/people-display/people-display.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  {path: '', redirectTo: '/shows', pathMatch: 'full'},
  {path: "shows", component: ShowsDisplayComponent},
  {path: 'people', component: PeopleDisplayComponent},
];

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
