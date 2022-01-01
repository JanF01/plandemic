import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/client.service';
import { NotesService } from 'src/app/notes.service';

@Component({
  selector: 'app-pinned',
  templateUrl: './pinned.component.html',
  styleUrls: ['./pinned.component.scss'],
})
export class PinnedComponent implements OnInit {
  pinnedNotes: Array<any> = [
    'The movies that I want...',
    'Calculus Integrals Exam',
    'Italian daily life words',
    'Electronics revision',
    'C programming pointers',
    'C - operations on files',
    'Books worth to read',
  ];

  switchedOn: number = -1;
  notesSub: Subscription = new Subscription();
  clientSub: Subscription = new Subscription();

  constructor(private notes: NotesService, private client: ClientService) {}

  ngOnInit(): void {
    this.notesSub = this.notes.pinnedNotes.subscribe((notes) => {
      this.pinnedNotes = notes;
    });
    this.clientSub = this.client.currentClient.subscribe({
      next: (change) => {
        if (change && change.id != undefined) {
          this.notes.getPinnedNotes(change.id).subscribe((data) => {});
        }
      },
    });
  }

  changeColor(index: number) {
    this.switchedOn = index;
  }
}
