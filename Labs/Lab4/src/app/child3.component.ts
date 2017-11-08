import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-child3',
  template: `
      <div class="child">
        <h3>Child</h3>
        Say {{ message }}
      </div>
  `,
  styleUrls: ['./child.component.css']
})
export class ChildComponent3 {
  // @Input() message: string;

  message: string = "Hola Mundo From Child!";

  @Output() messageEvent = new EventEmitter<string>();

  constructor() { }

  sendMessage(){
    this.messageEvent.emit(this.message);
  }
}
