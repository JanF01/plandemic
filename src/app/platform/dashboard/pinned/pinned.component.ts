import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/client.service';
import { Note } from 'src/app/models/Note';
import { NotesService } from 'src/app/notes.service';

@Component({
  selector: 'app-pinned',
  templateUrl: './pinned.component.html',
  styleUrls: ['./pinned.component.scss'],
})
export class PinnedComponent implements OnInit {
  pinnedNotes: Array<Note> = [];

  switchedOn: number = -1;
  pinnedNote: Note = {} as any;
  notesSub: Subscription = new Subscription();
  clientSub: Subscription = new Subscription();

  constructor(private notes: NotesService, private client: ClientService) {}

  ngOnInit(): void {
    this.notes.displayedNote.subscribe({
      next: (note) => {
        if (this.pinnedNote != note) {
          this.switchedOn = -1;
          this.pinnedNote = {} as any;
        }
      },
    });
    this.notesSub = this.notes.pinnedNotes.subscribe((notes) => {
      this.pinnedNotes = notes;
    });
    this.clientSub = this.client.currentClient.subscribe({
      next: (change) => {
        if (change && change.id != undefined) {
          this.notes.getPinnedNotes(change.id).subscribe();
        }
      },
    });
  }

  openNote(pin: Note, i: number) {
    this.switchedOn = i;
    this.pinnedNote = pin;
    this.notes.displayedNote.next(pin);
  }
}
