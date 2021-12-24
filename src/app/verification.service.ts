import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Client } from './models/Client';
import { map, Observable } from 'rxjs';
import { TokenPayload } from './models/TokenPayload';

@Injectable({
  providedIn: 'root',
})
export class VerificationService {
  private token: string;
  baseUrl: string = '/verapi';
  public client: Client = {} as any;

  constructor(private http: HttpClient, private router: Router) {
    this.token = '';
  }

  private saveToken(token: string): void {
    window.localStorage.setItem('pdc_js_tk', token);
  }

  private getToken(): string {
    this.token = String(window.localStorage.getItem('pdc_js_tk'));
    return this.token;
  }

  public register(log: string, pass: string, email: string): Observable<any> {
    const base = this.http.post(this.baseUrl + '/plandemic_reg', {
      login: log,
      password: pass,
      email: email,
    });

    const request = base.pipe(
      map((data: any) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public login(log: string, pass: string): Observable<any> {
    const base = this.http.post(this.baseUrl + '/plandemic_log', {
      login: log,
      password: pass,
    });

    const request = base.pipe(
      map((data: any) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public getTokenPayload(): TokenPayload {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);

      let client = JSON.parse(payload);

      this.client = new Client(client.id, client.login);

      return client;
    } else {
      let errorPayload: TokenPayload = {
        id: 444,
        email: 'error',
        login: 'error',
        exp: 44444,
        iat: 44444,
      };
      return errorPayload;
    }
  }

  public isLoggedIn(): boolean {
    const client = this.getTokenPayload();
    return client ? client.exp > Date.now() / 1000 : false;
  }

  public logout(): void {
    this.token = '';
    localStorage.removeItem('pdc_js_tk');
    this.router.navigateByUrl('/');
  }
}
