import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedKey = 'isAuthenticated';
  private isTeacher = 'isTeacher';

  isLoggedIn(): boolean {
    return localStorage.getItem(this.isAuthenticatedKey) === 'true';
  }

  isTeacherCheck(): string {
    if (localStorage.getItem(this.isTeacher) === "true") {
      return "true"
    } else if (localStorage.getItem(this.isTeacher) === "false") {
      return "false"
    } else {
      return "null"
    }
  }

  logOutLs() {
    localStorage.removeItem(this.isAuthenticatedKey);
    localStorage.removeItem(this.isTeacher);
  }

  constructor() { }
}
