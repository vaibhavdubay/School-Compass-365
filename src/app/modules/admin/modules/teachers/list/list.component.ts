import { Component, inject } from '@angular/core';
import { AdminService } from '@sc-modules/admin/services/admin.service';
import { teachersTableConfig } from '../teacher.constant';
import { TeacherProfile } from '@sc-models/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sc-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private readonly adminService = inject(AdminService);
  private readonly router = inject(Router);
  readonly tableConfig = teachersTableConfig;
  readonly teachers$ = this.adminService.teachers$;

  buttonClick(event: { key: string; row: TeacherProfile }) {
    const actions: { [k: string]: Function } = {
      edit: () => {
        this.router.navigate(['admin', 'teachers', event.row.id], { state: { teacher: event.row } });
      },
      delete: () => {
        this.adminService.deleteTeachersProfile(event.row.id);
      },
    };
    actions[event.key]();
  }
}
