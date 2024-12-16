import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  login(username: string, password: string): boolean {
  if (username === 'usuario' && password === '1234') {
  this.isAuthenticated = true;
  return true;
  }
  return false;
  }
  isLoggedIn(): boolean {
  return this.isAuthenticated;
  }
  logout() {
  this.isAuthenticated = false;
  }
  }
