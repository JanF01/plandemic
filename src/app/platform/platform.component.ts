import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuardService } from '../guard.service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss'],
})
export class PlatformComponent implements OnInit {
  constructor(private guard: GuardService, private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['']);
    this.guard.isLoggedIn();
  }
}
