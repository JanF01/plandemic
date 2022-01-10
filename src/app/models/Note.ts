export class Note {
  id: number;
  title: string;
  unformattedContent: string;
  pinned: boolean;
  tags: Array<string>;
  date: string;
  organize_order: number;
  noteColor: string;
  folderId: number;

  constructor(
    providedId: number,
    providedTitle: string,
    providedContent: string,
    pinned: boolean,
    providedTags: Array<string>,
    providedDate: string,
    providedOrder: number,
    providedColor: string,
    folder: number
  ) {
    this.id = providedId;
    this.title = providedTitle;
    this.unformattedContent = providedContent;
    this.pinned = pinned;
    this.tags = providedTags;
    this.date = providedDate;
    this.organize_order = providedOrder;
    this.noteColor = providedColor;
    this.folderId = folder;
  }
}
