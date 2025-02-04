import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminMainComponent } from './admin.component';
import { SchoolProfileComponent } from './components/school-profile/school-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: '',
    component: AdminMainComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
        },
      },
      {
        path: 'school-profile',
        component: SchoolProfileComponent,
        data: {
          title: 'School Profile',
        },
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
        data: {
          title: 'Edit Profile',
        },
      },
      {
        path: 'teachers',
        loadChildren: () => import('./modules/teachers/teachers.module').then((m) => m.TeachersModule),
      },
      {
        path: 'students',
        loadChildren: () => import('./modules/students/students.module').then((s) => s.StudentsModule),
      },
      {
        path: 'classes',
        loadChildren: () => import('./modules/classes/classes.module').then((c) => c.ClassesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
