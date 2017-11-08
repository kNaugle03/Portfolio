import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <div class="parent">
      <h1>Parent</h1>
      Message: {{ message }}
      <app-child2 (messageEvent)="receiveMessage($event)"></app-child2>
    </div>
  `,
  styleUrls: ['./parent.component.css']
})
export class ParentComponent2{
  // parentMessage = "message from parent";
  constructor() { }

  message = "Hello World";

  ngOnInit(){

  }

  receiveMessage($event){
    this.message = $event
  }

}
