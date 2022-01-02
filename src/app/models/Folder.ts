import { Note } from './Note';

export class Folder {
  id: number;
  title: string;
  date: string;
  open: boolean;
  notes: Array<Note>;
  constructor(providedId: number, providedTitle: string, providedDate: string) {
    this.id = providedId;
    this.title = providedTitle;
    this.date = providedDate;
    this.open = false;
    this.notes = [];
  }

  switchState(): void {
    this.open = !this.open;
  }

  loadNotes(notes: Array<Note>): void {
    this.notes = notes;
  }
}
