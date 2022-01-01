import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from './client.service';
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
  currentPayload: TokenPayload = {} as any;

  constructor(
    private verify: VerificationService,
    private guard: GuardService,
    private router: Router,
    private client: ClientService
  ) {}

  ngOnInit(): void {
    this.router.navigate(['/']);
    if (this.guard.isLoggedIn()) {
      let details = this.verify.getTokenPayload();
      this.verify.updateToken(details.pd_l).subscribe((resp) => {
        if (resp.error) {
          console.log('Error');
        } else {
          this.currentPayload = this.verify.getTokenPayload();
          this.client.currentClient.next(this.verify.client);
        }
      });
    }
  }
}
