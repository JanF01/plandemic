import { Note } from './Note';

export class Folder {
  id: number;
  title: string;
  organize_order: number;
  date: string;
  open: boolean;
  notes: Array<Note>;
  constructor(
    providedId: number,
    providedTitle: string,
    provided_order: number,
    providedDate: string
  ) {
    this.id = providedId;
    this.title = providedTitle;
    this.date = providedDate;
    this.open = false;
    this.organize_order = provided_order;
    this.notes = [];
  }

  switchState(): void {
    this.open = !this.open;
  }

  loadNotes(notes: Array<Note>): void {
    this.notes = notes;
  }

  addNote(note: Note): void {}

  removeNote(note: Note): void {}

  relocateNote(note: Note): void {}
}
