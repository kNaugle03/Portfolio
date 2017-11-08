import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="nav">
      <h1>{{title}}</h1>
      <nav>
        <a routerLink="/parent1">Example 1</a>
        <a routerLink="/parent2">Example 2</a>
        <a routerLink="/parent3">Example 3</a>
        <a routerLink="/sibling">Example 4</a>
      </nav>
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Lab 4';
}
