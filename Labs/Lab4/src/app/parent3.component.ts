import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {ChildComponent3} from "./child3.component";

@Component({
  selector: 'app-parent',
  template: `
    <div class="parent">
      <h1>Parent</h1>
      Message: {{ message }}
      <app-child3 (messageEvent)="receiveMessage($event)"></app-child3>
    </div>
  `,
  styleUrls: ['./parent.component.css']
})
export class ParentComponent3 implements AfterViewInit{

  @ViewChild(ChildComponent3) child;

  constructor() { }

  message:string = "Hello World";

  ngAfterViewInit(){
    setTimeout(() => this.message = this.child.message)
  }

  receiveMessage($event){
    this.message = $event
  }

}
