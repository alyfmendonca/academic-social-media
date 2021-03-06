import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class LoginService {
  showHeader = new EventEmitter<boolean>();
  user: User;
  lastUrl: string;

  API_URL = environment.apiUrl;

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  isLoggedIn() {
    return true;
  }

  login(email: string, password: string): Observable<User> {
    this.showHeader.emit(true);
    return this.http.post<User>(`${this.API_URL}login`, { email: email, password: password });
  }

  logout() {
    this.showHeader.emit(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    localStorage.removeItem('project');
    this.router.navigateByUrl('/login');
  }

  authCheck(token: string): Observable<any> {
    return this.http.get(`${this.API_URL}users/retrieveData?token=${token}`);
  }

}
