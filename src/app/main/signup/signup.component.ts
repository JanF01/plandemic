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
  passed: boolean;

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
    this.passed = false;
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
      return false;
    }
  }

  verifyPassword(): boolean {
    if (this.passValue.length < 7) {
      this.alerts.pass = true;
      this.alerts.passValue = 'Minimum 7 characters';
      return false;
    } else {
      this.alerts.pass = false;
    }
    if (this.passValue == this.passRepeatValue) {
      this.alerts.passRepeat = false;
      return true;
    } else {
      this.alerts.passRepeat = true;
      this.alerts.passRepeatValue = "Passwords don't match";
      return false;
    }
  }

  loginValidator(): boolean {
    if (this.loginValue.length <= 2) {
      this.alerts.login = true;
      this.alerts.loginValue = 'Minimum 2 characters';
      return false;
    } else {
      this.alerts.login = false;
      return true;
    }
  }

  loginSiValidator(): boolean {
    if (this.signInLogin.length <= 2) {
      this.alerts.siLogin = true;
      this.alerts.siLoginValue = 'Minimum 2 characters';
      return false;
    } else {
      this.alerts.siLogin = false;
    }
    return true;
  }

  login(): boolean {
    if (!this.loginSiValidator()) {
      return false;
    }
    this.verify.login(this.signInLogin, this.signInPass).subscribe((resp) => {
      console.log(resp);
      if (resp.error) {
        this.alerts.siPass = true;
        this.alerts.siPassValue = resp.error;
      } else if (resp == 'ude') {
        this.alerts.siLogin = true;
        this.alerts.siLoginValue = "User doesn't exist";
      } else if (resp == 'wp') {
        this.alerts.siPass = true;
        this.alerts.siPassValue = 'Wrong password';
      } else {
        location.reload();
      }
    });

    return false;
  }

  register(): boolean {
    this.passed = this.loginValidator() && this.emailValidator();

    if (!this.verifyPassword()) {
      this.passed = false;
    }

    if (!this.emailValidator()) {
      this.alerts.email = true;
      this.alerts.emailValue = 'Invalid e-mail';
    } else {
      this.alerts.email = false;
    }

    console.log(this.passed);

    if (this.passed)
      this.verify
        .register(this.loginValue, this.passValue, this.emailValue)
        .subscribe((resp) => {
          if (resp.error) {
            this.alerts.pass = true;
            this.alerts.passValue = resp.error;
          } else if (resp == 'lt') {
            this.alerts.login = true;
            this.alerts.loginValue = 'Login already used';
          } else {
            this.router.navigateByUrl('/');
            location.reload();
          }
        });

    return false;
  }
}
