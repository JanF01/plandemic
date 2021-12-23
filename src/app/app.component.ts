import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'plandemic';
  mode: number;

  constructor() {
    this.mode = 2;
  }

  changeMode(value: any) {
    this.mode = value;
  }

  switchMode(value: any) {
    if (value == 'main') {
      this.mode = 1;
    } else if (value == 'signIn') {
      this.mode = 3;
    }
  }
}
