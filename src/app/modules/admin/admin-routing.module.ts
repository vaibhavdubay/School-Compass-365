import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminMainComponent } from './admin.component';
import { SchoolProfileComponent } from './components/school-profile/school-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChatLayoutComponent } from 'src/app/core/modules/chat/component/chat-layout/chat-layout.component';

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
        path: 'chat',
        component: ChatLayoutComponent
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
