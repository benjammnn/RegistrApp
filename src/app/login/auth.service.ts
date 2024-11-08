import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private isAuthenticatedKey = 'isAuthenticated';
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';  // API URL

  constructor(private http: HttpClient) {}

  // Método para validar login (mock de autenticación con JSONPlaceholder)
  login(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        // Buscamos un usuario con el nombre de usuario (email) y contraseñas ficticias
        const user = users.find(u => u.email === username && password === 'password'); // Ficticio
        if (user) {
          return user;  // Retorna el usuario si se encuentra
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
