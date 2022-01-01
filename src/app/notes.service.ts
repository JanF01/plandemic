import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Note } from './models/Note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  public pinnedNotes: Subject<Array<any>> = new Subject();
  baseUrl: string = '/notesapi';

  constructor(private http: HttpClient) {}

  private getToken() {
    return String(window.localStorage.getItem('pdc_js_tk'));
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

  public createNote(note: Note) {
    const base = this.http.post(this.baseUrl + '/create_note', note);

    const request = base.pipe(
      map((data: any) => {
        if (data == 'cs') {
          console.log('Created Successfully');
        } else {
          console.log('there was an error:' + data);
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
      map((data: any) => {
        if (data) {
          this.pinnedNotes.next(data);
          console.log(data);
        }
      })
    );

    return request;
  }
}
