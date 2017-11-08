import {Component, NgModule} from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {ParentComponent} from "./parent1.component";
import {ParentComponent2} from "./parent2.component";
import {DashboardComponent} from "./dashboard.component";
import {ParentComponent3} from "./parent3.component";

const routes: Routes = [
  {path: "", redirectTo: "/dashboard", pathMatch: "full"},
  {path: "dashboard", component: DashboardComponent},
  {path: "parent1", component: ParentComponent},
  {path: "parent2", component: ParentComponent2},
  {path: "parent3", component: ParentComponent3},


];

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
