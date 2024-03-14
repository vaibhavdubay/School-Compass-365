import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminLoginPageComponent } from './pages/admin-login-page/admin-login-page.component';

@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminLoginPageComponent
  ],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
