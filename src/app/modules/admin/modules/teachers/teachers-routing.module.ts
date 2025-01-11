import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
      title: 'Teachers List'
    }
  },
  {
    path: 'add',
    component: AddComponent,
    data: {
      title: 'Add Teacher Profile'
    }
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    data: {
      title: 'Teacher Profile'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
