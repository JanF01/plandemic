import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
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
  alertValue: string = '';
  alertType: string = '';

  constructor(
    private verify: VerificationService,
    private guard: GuardService,
    private router: Router,
    private client: ClientService,
    private alerts: AlertService
  ) {}

  ngOnInit(): void {
    this.alerts.value.subscribe({
      next: (val) => {
        this.alertValue = val;
        setTimeout(() => {
          this.alertValue = '';
        }, 4000);
      },
    });

    this.alerts.type.subscribe({
      next: (val) => {
        this.alertType = val;
        setTimeout(() => {
          this.alertType = '';
        }, 4000);
      },
    });
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
