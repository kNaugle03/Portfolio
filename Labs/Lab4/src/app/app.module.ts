import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ChildComponent} from "./child1.component";
import {ParentComponent} from "./parent1.component";
import {ChildComponent2} from "./child2.component";
import {ParentComponent2} from "./parent2.component";
import {AppRoutingModule} from "./app-routing.module";
import {DashboardComponent} from "./dashboard.component";
import {ChildComponent3} from "./child3.component";
import {ParentComponent3} from "./parent3.component";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ChildComponent,
    ParentComponent,
    ChildComponent2,
    ParentComponent2,
    ChildComponent3,
    ParentComponent3,
    DashboardComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
