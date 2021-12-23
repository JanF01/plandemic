import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @Input() mode: number;
  shown: boolean = true;
  emailValue: string = 'OK';
  correctEmail: boolean = false;

  constructor() {
    this.mode = 2;
  }

  ngOnInit(): void {}

  emailValidator() {
    let test = this.emailValue
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    console.log(test);

    this.correctEmail = test ? true : false;
  }
}
