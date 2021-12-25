import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { VerificationService } from './verification.service';

@Injectable({
  providedIn: 'root',
})
export class GuardService {
  constructor(private verify: VerificationService, private router: Router) {}

  isLoggedIn(): boolean {
    let token = String(window.localStorage.getItem('pdc_js_tk'));

    if (token && token != undefined && token != null) {
      if (token.length > 0) {
        if (this.verify.isLoggedIn()) {
          this.router.navigateByUrl('platform/dashboards');
          return true;
        } else return false;
      }
    }

    this.router.navigateByUrl('/');

    return false;
  }
}
