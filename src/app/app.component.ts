import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuardService } from './guard.service';
import { Client } from './models/Client';
import { TokenPayload } from './models/TokenPayload';
import { VerificationService } from './verification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'plandemic';
  currentClient: Client = {} as any;
  currentPayload: TokenPayload = {} as any;

  constructor(
    private verify: VerificationService,
    private guard: GuardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.navigate(['/']);
    if (this.guard.isLoggedIn()) {
      let details = this.verify.getTokenPayload();
      this.verify.updateToken(details.login).subscribe((resp) => {
        if (resp.error) {
          console.log('Error');
        } else {
          this.currentPayload = this.verify.getTokenPayload();
          this.currentClient = this.verify.client;
        }
      });
    }
  }
}
