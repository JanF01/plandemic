import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { map, Observable, Subject } from 'rxjs';
import { Note } from './models/Note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private pinnedNotes: Subject<Array<any>> = new Subject();
  baseUrl: string = 'notes_api';

  constructor(private http: HttpClient) {}

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
    const base = this.http.get(this.baseUrl + '/get_pinned?client=' + clientId);

    const request = base.pipe(
      map((data: any) => {
        if (data.pinnedNotes) {
          this.pinnedNotes = data.pinnedNotes;
          console.log(this.pinnedNotes);
        }
      })
    );

    return request;
  }
}
