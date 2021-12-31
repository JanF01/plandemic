import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pinned',
  templateUrl: './pinned.component.html',
  styleUrls: ['./pinned.component.scss'],
})
export class PinnedComponent implements OnInit {
  pinnedNotes: Array<string> = [
    'The movies that I want...',
    'Calculus Integrals Exam',
    'Italian daily life words',
    'Electronics revision',
    'C programming pointers',
    'C - operations on files',
    'Books worth to read',
  ];

  switchedOn: number = -1;

  constructor() {}

  ngOnInit(): void {}

  changeColor(index: number) {
    this.switchedOn = index;
  }
}
