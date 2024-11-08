import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private isAuthenticatedKey = 'isAuthenticated';
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.username === password);
        if (user || (email === 'admin@duoc.cl' && password === '123')) {
          localStorage.setItem(this.isAuthenticatedKey, 'true');
          return user || { email: 'admin@duoc.cl', username: 'admin', name: 'Administrador' };
        } else {
          throw new Error('Invalid login credentials');
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.isAuthenticatedKey) === 'true';
  }
}
