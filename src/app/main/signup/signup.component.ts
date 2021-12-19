import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @Input() mode: number;
  shown: boolean = true;

  constructor() {
    this.mode = 2;
  }

  ngOnInit(): void {}
}
