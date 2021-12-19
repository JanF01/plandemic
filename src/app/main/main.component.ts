import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @Input() mode: number;
  @Output() modeChanged: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.mode = 1;
  }

  ngOnInit(): void {}

  signUp(value: Event) {
    this.mode = 2;
    this.modeChanged.emit(2);
  }
}
