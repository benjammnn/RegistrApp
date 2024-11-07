import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { canactivateGuard } from './canactivate.guard';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [canactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
