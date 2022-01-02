import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public value: Subject<string> = new Subject();
  public type: Subject<string> = new Subject();
  constructor() {}

  newAlert(value: string, type: string) {
    this.value.next(value);
    this.type.next(type);
  }
}
