import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-center-edit',
  templateUrl: './center-edit.component.html',
  styleUrls: ['./center-edit.component.scss'],
})
export class CenterEditComponent implements OnInit {
  title: string = '';
  @Output() closeWindow: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  closeModal() {
    this.closeWindow.emit('close');
  }
}
