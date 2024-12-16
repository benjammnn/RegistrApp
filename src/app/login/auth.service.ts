import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private isAuthenticatedKey = 'isAuthenticated';
  private isTeacher = 'isTeacher';
  private userInstance = 'userInstance'
  private userInList: string[] = ["", "", ""]
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const userInString  = localStorage.getItem(this.userInstance);
    if (userInString) {
      const userInParse = JSON.parse(userInString);

      this.userInList = [
        userInParse.username,
        userInParse.email,
        userInParse.password,
      ]
    }
      
    console.log(this.userInList);

    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.username === password);

        if (user || (email === 'admin@duoc.cl' && password === '123')) {
          localStorage.setItem(this.isAuthenticatedKey, 'true');

          let isTeacher;
          if (user) {
            isTeacher = true; // TEMP IS TEACHER;
          } else {
            isTeacher = false;
          }
          localStorage.setItem('isTeacher', JSON.stringify(isTeacher));
          console.log(isTeacher);

          return user || { email: 'admin@duoc.cl', username: 'admin', name: 'Administrador' };
        } else if (email === this.userInList[1] && password === this.userInList[2]) {
          localStorage.setItem(this.isAuthenticatedKey, 'true');

          let isTeacher;
          if (user) {
            isTeacher = true; // TEMP IS TEACHER;
          } else {
            isTeacher = false;
          }
          localStorage.setItem('isTeacher', JSON.stringify(isTeacher));
          console.log(isTeacher);

          return { email: this.userInList[1], username: this.userInList[0], name: "???" };
        } else {
          throw new Error('Invalid login credentials');
        }
      })
    );
  }

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
}
