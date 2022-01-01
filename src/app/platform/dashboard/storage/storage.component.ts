import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/client.service';
import { NotesService } from 'src/app/notes.service';
import { Folder } from 'src/app/models/Folder';
import { Client } from 'src/app/models/Client';
import { Note } from 'src/app/models/Note';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
})
export class StorageComponent implements OnInit {
  @Output() createNote: EventEmitter<any> = new EventEmitter();
  foldersOpen: Array<boolean> = [false, false];

  folders: Array<Folder> = [] as any;

  foldersSub: Subscription = new Subscription();
  clientSub: Subscription = new Subscription();

  currentClient: Client = {} as any;

  constructor(private notes: NotesService, private client: ClientService) {}

  ngOnInit(): void {
    this.foldersSub = this.notes.allFolders.subscribe({
      next: (change) => {
        this.folders = change;
      },
    });
    this.clientSub = this.client.currentClient.subscribe({
      next: (change) => {
        this.currentClient = change;
        if (change && change.id != undefined) {
          this.notes.getFolders(change.id).subscribe((data) => {});
        }
      },
    });
  }

  switchFolder(n: number) {
    this.folders[n].switchState();
    if (this.folders[n].open) {
      this.loadNotesToFolder(this.folders[n]);
    }
  }

  loadNotesToFolder(folder: Folder) {
    this.notes
      .getNotesFromFolder(this.currentClient.id, folder.id)
      .subscribe((result) => {
        folder.loadNotes(result);
      });
  }

  getSrcOfNote(note: Note) {
    switch (note.noteColor) {
      case 'blue':
        return 'assets/sticky_note_blue.png';
      case 'red':
        return 'assets/sticky_note_red.png';
      default:
        return 'assets/sticky_note.png';
    }
  }

  openCreateNote(): void {
    this.createNote.emit('open');
  }
}
