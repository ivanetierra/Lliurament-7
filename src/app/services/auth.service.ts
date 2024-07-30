import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private loggedInUser = signal<any>(null);
  private error = signal<string | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  register(user: any) {
    this.http
      .post(`${this.baseUrl}/register`, user)
      .pipe(
        catchError((error) => {
          this.error.set('Email already in use');
          return of(null);
        })
      )
      .subscribe((response: any) => {
        if (response) {
          this.setToken(response.accessToken);
          this.setLoggedInUser(response.user);
          this.router.navigate(['/starships']);
        }
      });
  }

  login(user: any) {
    this.http
      .post(`${this.baseUrl}/login`, user)
      .pipe(
        catchError((error) => {
          this.error.set('Invalid email or password');
          return of(null);
        })
      )
      .subscribe((response: any) => {
        if (response) {
          this.setToken(response.accessToken);
          this.setLoggedInUser(response.user);
          this.router.navigate(['/starships']);
        }
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedInUser.set(null);
    this.router.navigate(['/login']);
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

  private setLoggedInUser(user: any) {
    this.loggedInUser.set(user);
  }

  get isLoggedIn() {
    return this.loggedInUser();
  }

  get authError() {
    return this.error();
  }
}
