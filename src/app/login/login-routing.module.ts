import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../register/candeactivate.guard';
import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    canDeactivate: [CanDeactivateGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
