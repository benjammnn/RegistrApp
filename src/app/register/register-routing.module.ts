import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { candeactivateGuard } from './candeactivate.guard';

import { RegisterPage } from './register.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage,
    canActivate: [candeactivateGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPageRoutingModule {}
