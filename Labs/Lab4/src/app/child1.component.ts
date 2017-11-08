import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
      <div class="child">
        <h3>Child</h3>
        Say {{ message }}
      </div>
  `,
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
  @Input() message: string;
  constructor() { }
}
