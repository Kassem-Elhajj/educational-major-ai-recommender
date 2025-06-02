import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {}

  // Mock login (replace with actual API call)
  login(username: string, password: string): void {
    // Simulate API success
    this.isLoggedInSubject.next(true);
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  // Optional: Check initial auth state (e.g., JWT exists)
  checkAuthState(): void {
    const token = localStorage.getItem('auth_token');
    this.isLoggedInSubject.next(!!token);
  }
}
