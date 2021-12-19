import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Input() mode: number;
  @Output() navigation: EventEmitter<any> = new EventEmitter();
  constructor() {
    this.mode = 1;
  }

  ngOnInit(): void {}

  switchToMain() {
    this.navigation.emit('main');
  }
  switchSignIn() {
    this.navigation.emit('signIn');
  }
}
