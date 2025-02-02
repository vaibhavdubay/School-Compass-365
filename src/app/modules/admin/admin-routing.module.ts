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
        path: 'Edit Profile',
        component: EditProfileComponent,
        data: {
          title: 'edit-profile',
        },
      },
      {
        path: "teachers",
        loadChildren: () => import('./modules/teachers/teachers.module').then((m) => m.TeachersModule),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
