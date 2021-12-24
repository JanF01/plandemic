import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VerificationService } from 'src/app/verification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @Input() mode: number;
  shown: boolean = true;

  emailValue: string;
  loginValue: string;
  passValue: string;
  passRepeatValue: string;
  signInLogin: string;
  signInPass: string;
  correctEmail: boolean;

  alerts: any = {
    siLogin: false,
    siLoginValue: '',
    siPass: false,
    siPassValue: '',
    login: false,
    loginValue: '',
    pass: false,
    passValue: '',
    passRepeat: false,
    passRepeatValue: '',
    email: false,
    emailValue: '',
  };

  constructor(private verify: VerificationService, private router: Router) {
    this.mode = 2;
    this.emailValue = '';
    this.loginValue = '';
    this.passValue = '';
    this.passRepeatValue = '';
    this.signInLogin = '';
    this.signInPass = '';
    this.correctEmail = false;
  }

  ngOnInit(): void {}

  emailValidator(): boolean {
    let test = this.emailValue
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (test) {
      this.correctEmail = true;
      return true;
    } else {
      this.correctEmail = false;
      this.alerts.email = true;
      this.alerts.emailValue = 'Invalid Email';
      return false;
    }
  }

  loginValidator(): boolean {
    if (this.signInLogin.length <= 2) {
      this.alerts.siLogin = true;
      this.alerts.siLoginValue = 'Minimum 2 characters';
      return false;
    }
    return true;
  }

  login(): boolean {
    if (!this.loginValidator()) {
      return false;
    }
    this.verify.login(this.signInLogin, this.signInPass).subscribe((resp) => {
      if (resp.error) {
        this.alerts.siPass = true;
        this.alerts.siPassValue = resp.error;
      } else if (resp == 'ude') {
        this.alerts.siLogin = true;
        this.alerts.siLoginValue = "User doesn't exist";
      } else {
        this.router.navigateByUrl('/');
        location.reload();
      }
    });

    return false;
  }
}
