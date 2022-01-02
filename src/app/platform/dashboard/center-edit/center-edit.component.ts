import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertService } from 'src/app/alert.service';
import { ClientService } from 'src/app/client.service';
import { Note } from 'src/app/models/Note';
import { NotesService } from 'src/app/notes.service';

@Component({
  selector: 'app-center-edit',
  templateUrl: './center-edit.component.html',
  styleUrls: ['./center-edit.component.scss'],
})
export class CenterEditComponent implements OnInit {
  title: string = '';

  @Output() closeWindow: EventEmitter<any> = new EventEmitter();
  private clientId: number = -1;

  constructor(
    private notes: NotesService,
    private client: ClientService,
    private alerts: AlertService
  ) {}

  ngOnInit(): void {
    this.client.currentClient.subscribe({
      next: (change) => {
        this.clientId = change.id;
      },
    });
  }

  closeModal() {
    this.closeWindow.emit('close');
  }

  createNote() {
    this.notes
      .createNote(
        new Note(0, this.title, '', false, [], '', '', 112),
        this.clientId
      )
      .subscribe((res) => {
        this.closeWindow.emit('close');
        this.notes.getNotesFromFolder(this.clientId, null).subscribe(() => {
          this.alerts.newAlert('New note has been added', 'success');
        });
      });
  }
}
