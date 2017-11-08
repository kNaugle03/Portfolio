import { Component, OnInit } from '@angular/core';
import {DataService} from "./data.service";

@Component({
  selector: 'app-sibling',
  template: `
    <div class="parent">
      <h1>Parent</h1>
      Message: {{ message }}
      <app-child4></app-child4>
    </div>
  `,
  styleUrls: ['./parent.component.css']
})
export class SiblingComponent implements OnInit{

  message: string;

  constructor(private data: DataService) { }

  ngOnInit(){
    this.data.currentMessage.subscribe(message => this.message = message)
  }

}
