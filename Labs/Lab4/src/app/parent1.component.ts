import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <div class="parent">
      <h1>Parent</h1>
      <app-child [message]="parentMessage"></app-child>
    </div>
  `,
  styleUrls: ['./parent.component.css']
})
export class ParentComponent{
  parentMessage = "message from parent";
  constructor() { }

  ngOnInit(){

  }
}
