import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  // { path: 'v1', loadChildren:  },
  {
    path: 'admin',
    loadChildren: () =>
      import('@sc-modules/admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
