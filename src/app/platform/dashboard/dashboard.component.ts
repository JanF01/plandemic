import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuardService } from 'src/app/guard.service';
import { VerificationService } from 'src/app/verification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  createNoteModal: boolean = false;
  constructor(
    private router: Router,
    private guard: GuardService,
    private verify: VerificationService
  ) {}

  ngOnInit(): void {
    this.router.navigate(['/']);
    this.guard.isLoggedIn();
  }

  logout() {
    this.verify.logout();
    location.reload();
  }

  openCreateNoteModal(event: any) {
    this.createNoteModal = true;
  }
  closeCreateNoteModal(event: any) {
    this.createNoteModal = false;
  }
}
