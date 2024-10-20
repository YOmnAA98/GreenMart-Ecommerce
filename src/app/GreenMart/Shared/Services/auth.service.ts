import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    this.isLoggedInSubject.next(!!localStorage.getItem('loggedInUserEmail'));
  }

  login(email: string, name: string): void {
    localStorage.setItem('loggedInUserEmail', email);
    localStorage.setItem('loggedInUserName', name);
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('loggedInUserEmail');
    localStorage.removeItem('loggedInUserName');
    this.isLoggedInSubject.next(false);
  }
}
