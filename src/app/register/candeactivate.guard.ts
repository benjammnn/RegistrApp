import { Injectable } from '@angular/core';
import { CanDeactivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { RouteDeactivate } from './register.page';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component && component.canDeactivate ? component.canDeactivate() : true;
  }
}

export function candeactivateGuard (
  component: RouteDeactivate
): boolean {
  if (component && component.formTest) {
    console.log('formTest:', component.formTest);
    if (component.formTest()) {
      return true;
    } else {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
  }
  return true;
}