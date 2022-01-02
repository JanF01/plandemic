import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Client } from './models/Client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  public currentClient: Subject<Client> = new Subject();

  constructor() {}
}
