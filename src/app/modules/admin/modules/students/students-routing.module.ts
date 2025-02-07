import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
      title: 'Students List',
    },
  },
  {
    path: 'add',
    component: AddComponent,
    data: {
      title: 'Add Student Profile',
    },
  },
  {
    path: ':id',
    component: EditComponent,
    data: {
      title: 'Student Profile',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentsRoutingModule {}
