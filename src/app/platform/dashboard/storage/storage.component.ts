import { Component, OnInit } from '@angular/core';

export interface Folder {
  name: string;
  notes: Array<string>;
  open: boolean;
}

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss'],
})
export class StorageComponent implements OnInit {
  foldersOpen: Array<boolean> = [false, false];

  folders: Array<Folder> = [
    {
      name: 'Notes 25.12.2021',
      notes: ['To sorry world', 'Note 2', 'Incommode he'],
      open: false,
    },
    {
      name: 'Notes 22.12.2021',
      notes: [
        'Note 1',
        'Entrance strongly packages',
        'Note 3',
        'Note 2',
        'Note 3',
      ],
      open: false,
    },
    {
      name: 'Folder #2',
      notes: ['Note 1', 'Note 2', 'Note 3', 'Note 2', 'Note 3'],
      open: false,
    },
    { name: 'Folder #3', notes: ['Note 1', 'Note 2', 'Note 3'], open: false },
    {
      name: 'Folder #4',
      notes: ['Note 1', 'Note 2', 'Note 3', 'Note 2', 'Note 3'],
      open: false,
    },
    {
      name: 'Garbage notes',
      notes: ['Note 1', 'Note 2', 'Note 3'],
      open: false,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  switchFolder(n: number) {
    this.folders[n].open = !this.folders[n].open;
  }
}
