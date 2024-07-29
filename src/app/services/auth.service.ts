import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private loggedInUser = signal<any>(null);

  constructor(private http: HttpClient, private router: Router) {}

  register(user: any) {
    return this.http
      .post(`${this.baseUrl}/register`, user)
      .subscribe((response: any) => {
        this.setToken(response.accessToken);
        this.setLoggedInUser(response.user);
        this.router.navigate(['/']);
      });
  }

  login(user: any) {
    return this.http
      .post(`${this.baseUrl}/login`, user)
      .subscribe((response: any) => {
        this.setToken(response.accessToken);
        this.setLoggedInUser(response.user);
        this.router.navigate(['/']);
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
}
