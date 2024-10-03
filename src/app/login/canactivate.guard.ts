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
      this.router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}

export const canactivateGuard: CanActivateFn = (route, state) => {
  return true;
};
