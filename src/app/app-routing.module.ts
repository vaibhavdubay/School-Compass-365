import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { ChatLayoutComponent } from './core/modules/chat/component/chat-layout/chat-layout.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: '',
    canMatch: [authGuard],
    children: [
      {
        path: 'admin',
        loadChildren: () => import('@sc-admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'student',
        loadChildren: () => import('@sc-student/students.module').then((m) => m.StudentsModule),
      },
      {
        path: 'teacher',
        loadChildren: () => import('@sc-teacher/teachers.module').then((m) => m.TeachersModule),
      },
      {
        path: 'chat',
        component: ChatLayoutComponent
      }
    ],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
