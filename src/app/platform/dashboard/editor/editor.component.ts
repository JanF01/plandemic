import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  colors: Array<string> = ['', '_blue', '_red'];
  noteColor: string = '_red';
  checkboxColor: string = 'warn';

  constructor() {}

  ngOnInit(): void {}

  changeColor() {
    let index = this.colors.indexOf(this.noteColor);
    if (index == this.colors.length - 1) index = 0;
    else index++;

    this.noteColor = this.colors[index];
  }

  getNoteColor(): string {
    return 'assets/sticky_note' + this.noteColor + '.png';
  }
}
