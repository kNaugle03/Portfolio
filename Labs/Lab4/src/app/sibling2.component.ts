import {Component, OnInit} from '@angular/core';
import {DataService} from "./data.service";

@Component({
  selector: 'app-sibling2',
  template: `
      <div class="child">
        <h3>Sibling</h3>
        Say {{ message }}
        <button (click)="newMessage()">New Message</button>
      </div>
      <aside><app-sibling></app-sibling></aside>
  `,
  styleUrls: ['./sibling.component.css']
})

export class Sibling2Component implements OnInit{

  message: string;

  constructor(private data: DataService) { }

  ngOnInit(){
    this.data.currentMessage.subscribe(message => this.message = message)
  }

  newMessage(){
    this.data.changeMessage("Hello from Sibling");
  }

}
