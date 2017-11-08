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
import {SiblingComponent} from "./sibling.component";
import {Sibling2Component} from "./sibling2.component";
import {DataService} from "./data.service";
import {ChildComponent4} from "./child4.component";

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
    ChildComponent4,
    ParentComponent3,
    SiblingComponent,
    Sibling2Component,
    DashboardComponent,
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})

export class AppModule { }
