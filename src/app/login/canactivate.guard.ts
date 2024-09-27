import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class canActivate implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

export const canactivateGuard: CanActivateFn = (route, state) => {
  return true;
};
