import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Note } from './models/Note';
import { Folder } from 'src/app/models/Folder';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  public pinnedNotes: Subject<Array<Note>> = new Subject();
  public allFolders: Subject<Array<Folder>> = new Subject();
  public folderNotes: Subject<Array<Note>> = new Subject();
  public notesWithNoFolder: Subject<Array<Note>> = new Subject();
  public displayedNote: Subject<Note> = new Subject();
  baseUrl: string = '/notesapi';

  constructor(private http: HttpClient) {}

  private getToken() {
    return String(window.localStorage.getItem('pdc_js_tk'));
  }

  private generateNotes(
    unformatedNotes: Array<any>,
    order: boolean = false
  ): Array<Note> {
    let arrayOfNotes: Array<Note> = [];
    unformatedNotes.forEach((e: any, i: any) => {
      arrayOfNotes[order ? e.organize_order : i] = new Note(
        e.id,
        e.title,
        e.unformattedContent,
        e.pinned,
        [],
        e.date,
        e.organize_order,
        e.note_color,
        e.folderId
      );
    });
    return arrayOfNotes;
  }

  public changeNoteFolder(note: Note, folderId: number) {
    const base = this.http.post(this.baseUrl + '/change_note_folder', {
      note: note,
      folderId: folderId,
    });

    const request = base.pipe(
      map((data: any) => {
        if (data == 'cs') {
          console.log('Changed Folder Successfully');
        } else {
          console.log('there was an error:' + data);
        }
      })
    );

    return request;
  }

  public saveNote(note: Note) {
    const base = this.http.post(this.baseUrl + '/save_note', note);

    const request = base.pipe(
      map((data: any) => {
        if (data == 'cs') {
          console.log('Saved Changes Successfully');
        } else {
          console.log('there was an error:' + data);
        }
      })
    );

    return request;
  }

  public pinNote(note: Note, id: number) {
    const token = this.getToken();
    const base = this.http.post(this.baseUrl + '/pin_note', {
      note: note,
      token: token,
    });

    const request = base.pipe(
      map((data: any) => {
        if (data.note) {
          this.getPinnedNotes(id).subscribe();
          this.displayedNote.next(data.note);
        } else {
          console.log(data);
        }
      })
    );

    return request;
  }

  public moveNoteToFolder(note: Note, folder: Folder) {
    const token = this.getToken();
    const base = this.http.post(this.baseUrl + '/change_folder', {
      note: note,
      folder: folder,
      token: token,
    });

    const request = base.pipe(
      map((data: any) => {
        if (data == 'success') {
          console.log('That was nice');
        } else {
          console.log('Hell nagh');
        }
      })
    );

    return request;
  }

  public createNote(note: Note, id: number) {
    const token = this.getToken();
    const base = this.http.post(this.baseUrl + '/create_note', {
      note: note,
      id: id,
      token: token,
    });

    const request = base.pipe(
      map((data: any) => {
        if (data.note) {
          console.log('Created Successfully');
        } else {
          console.log('there was an error:' + data);
        }
      })
    );

    return request;
  }

  public getNotesFromFolder(clientId: number, folderId: any): Observable<any> {
    const token = this.getToken();
    const base = this.http.get(
      this.baseUrl +
        '/get_notes_from_folder/' +
        clientId +
        '/' +
        token +
        '/' +
        (folderId == null ? 'null' : folderId)
    );
    const request = base.pipe(
      map((notes: any) => {
        if (notes) {
          if (folderId == null) {
            this.notesWithNoFolder.next(this.generateNotes(notes, true));
          } else {
            return this.generateNotes(notes, true);
          }
        }
        return false;
      })
    );

    return request;
  }

  public getFolders(clientId: number): Observable<any> {
    const token = this.getToken();
    const base = this.http.get(
      this.baseUrl + '/get_folders/' + clientId + '/' + token
    );
    const request = base.pipe(
      map((folders: any) => {
        if (folders) {
          let arrayOfFolders: Array<Folder> = [];
          folders.forEach((element: any, i: any) => {
            arrayOfFolders[element.organize_order] = new Folder(
              element.id,
              element.title,
              element.organize_order,
              element.date
            );
          });
          this.allFolders.next(arrayOfFolders);
        }
      })
    );

    return request;
  }

  public getPinnedNotes(clientId: number): Observable<any> {
    const token = this.getToken();
    const base = this.http.get(
      this.baseUrl + '/get_pinned/' + clientId + '/' + token
    );

    const request = base.pipe(
      map((notes: any) => {
        if (notes) {
          this.pinnedNotes.next(this.generateNotes(notes));
        }
      })
    );

    return request;
  }

  public reOrderNotes(notes: Array<Note>): Observable<any> {
    const token = this.getToken();
    const base = this.http.post(this.baseUrl + '/change_order', {
      notes: notes,
      token: token,
    });

    const request = base.pipe(
      map((data: any) => {
        if (data != 'success') {
          console.log('there was an error:' + data);
        }
      })
    );

    return request;
  }
}
