import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedKey = 'isAuthenticated';

  login(username: string, password: string): boolean {
    if (username === 'admin@duoc.cl' && password === '1234') {
      localStorage.setItem(this.isAuthenticatedKey, 'true');
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.isAuthenticatedKey) === 'true';
  }

  logout() {
    localStorage.removeItem(this.isAuthenticatedKey);
  }

  constructor() { }
}
