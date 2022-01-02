import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VerificationService } from 'src/app/verification.service';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
})
export class BottomNavComponent implements OnInit {
  @Input() menuOpen: boolean = false;
  @Output() menuSwitch: EventEmitter<any> = new EventEmitter();
  constructor(private verify: VerificationService) {}

  ngOnInit(): void {}

  openMenu() {
    let menu = document.getElementById('menu') as HTMLElement;
    if (!this.menuOpen) {
      menu.style.display = 'block';
      this.menuOpen = true;
    } else {
      menu.style.display = 'none';
      this.menuOpen = false;
    }

    this.menuSwitch.emit('n');
  }

  logout() {
    this.verify.logout();
    location.reload();
  }
}
