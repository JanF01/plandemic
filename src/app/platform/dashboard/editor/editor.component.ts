import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/client.service';
import { Note } from 'src/app/models/Note';
import { NotesService } from 'src/app/notes.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  colors: Array<string> = ['', '_blue', '_red'];
  noteColor: string = '_red';
  checkboxColor: string = 'warn';
  displayedNote: Note = {
    title: 'NOPERS NOPERS',
    unformattedContent: `NOPERS NOPERS NOPERS NOPERS NOPERS NOPERS NOPERS NOPERS 
      NOPERS NOPERS NOPERS NOPERS 
      NOPERS NOPERS NOPERS NOPERS NOPERS NOPERS NOPERS NOPERS NOPERS
       NOPERS NOPERS NOPERS NOPERS NOPERS NOPERS NOPERS NOPERS NOPERS NOPERS NOPERS NOPERS 
       NOPERS NOPERS NOPERS NOPERS NOPERS NOPERS NOPERS`,
    date: 'NOPERS',
  } as any;

  clientId: number = -1;
  noteSub: Subscription = new Subscription();
  clientSub: Subscription = new Subscription();

  constructor(private notes: NotesService, private client: ClientService) {}

  ngOnInit(): void {
    this.clientSub = this.client.currentClient.subscribe({
      next: (change) => {
        if (change && change.id != undefined) {
          this.clientId = change.id;
        }
      },
    });
    this.noteSub = this.notes.displayedNote.subscribe((note) => {
      this.displayedNote = note;
    });
  }

  changeColor() {
    let index = this.colors.indexOf(this.noteColor);
    if (index == this.colors.length - 1) index = 0;
    else index++;

    this.noteColor = this.colors[index];
  }

  getNoteColor(): string {
    return 'assets/sticky_note' + this.noteColor + '.png';
  }

  pinNote() {
    this.notes.pinNote(this.displayedNote, this.clientId).subscribe();
  }
}
