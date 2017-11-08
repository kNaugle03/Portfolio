import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-sibling2',
  template: `
      <div class="child">
        <h3>Child</h3>
        Say {{ message }}
        <button (click)="sendMessage()">Send Message</button>
      </div>
  `,
  styleUrls: ['./child.component.css']
})
export class Sibling2Component {
  // @Input() message: string;

  message: string = "Hola Mundo!";

  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  sendMessage(){
    this.messageEvent.emit(this.message);
  }
}
