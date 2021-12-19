import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mainbutton',
  templateUrl: './mainbutton.component.html',
  styleUrls: ['./mainbutton.component.scss'],
})
export class MainbuttonComponent implements OnInit {
  @Input() content!: string;

  constructor() {}

  ngOnInit(): void {}
}
