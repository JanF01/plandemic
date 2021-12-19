import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit {
  @Output() switchSignUp: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  emitSignUp(value: Event) {
    console.log('omg');
    this.switchSignUp.emit('value');
  }
}
