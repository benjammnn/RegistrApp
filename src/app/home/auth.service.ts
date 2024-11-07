import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedKey = 'isAuthenticated';

  isLoggedIn(): boolean {
    return localStorage.getItem(this.isAuthenticatedKey) === 'true';
  }

  logOutLs() {
    localStorage.removeItem(this.isAuthenticatedKey);
  }

  constructor() { }
}
