import {Component, OnInit} from '@angular/core';
import {DataService} from "./data.service";

@Component({
  selector: 'app-child4',
  template: `
      <div class="child">
        <h3>Child</h3>
        Say {{ message }}
      </div>
  `,
  styleUrls: ['./child.component.css']
})
export class ChildComponent4 implements OnInit{
  message: string;

  constructor(private data: DataService) { }

  ngOnInit(){
    this.data.currentMessage.subscribe(message => this.message = message)
  }

}
