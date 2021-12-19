import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mainbutton',
  templateUrl: './mainbutton.component.html',
  styleUrls: ['./mainbutton.component.scss'],
})
export class MainbuttonComponent implements OnInit {
  @Input() content!: string;
  @Output() notifyClicked: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  notifyParent() {
    if (this.content == 'Create Account') this.notifyClicked.emit('clicked');
  }
}
