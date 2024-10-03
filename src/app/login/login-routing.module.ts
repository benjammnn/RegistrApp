import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { canactivateGuard } from './canactivate.guard';

import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    canActivate: [canactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
