import { Component, inject } from '@angular/core';
import { StudentProfile } from '@sc-models/core';
import { Router } from '@angular/router';
import { AdminService } from '@sc-modules/admin/services/admin.service';
import { StudentsTableConfig } from '../student.constant';

@Component({
  selector: 'sc-list',
  standalone: false,
  
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  readonly tableConfig = StudentsTableConfig;
  private readonly adminService = inject(AdminService);
  readonly students$ = this.adminService.students$;
  private readonly router = inject(Router);
  

  buttonClick(event: { key: string; row: StudentProfile }) {
      const actions: { [k:string]: Function } = {
        edit: () => {
          this.router.navigate(['admin', 'students', event.row.id], { state: { student: event.row } });
        },
        delete: () => {
          this.adminService.deleteStudentProfile(event.row.id);
        },
      }
      actions[event.key]();
    }
}
