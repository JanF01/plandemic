import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pinned',
  templateUrl: './pinned.component.html',
  styleUrls: ['./pinned.component.scss'],
})
export class PinnedComponent implements OnInit {
  pinnedNotes: Array<string> = [
    'The movies that I want to watch',
    'Calculus Integrals Exam',
    'Italian daily life words',
    'Electronics revision',
    'C programming pointers',
    'C - operations on files',
    'Books worth to read',
  ];

  constructor() {}

  ngOnInit(): void {}
}
