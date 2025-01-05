import { Component, inject } from '@angular/core';
import { teachersTableConfig } from '@sc-modules/admin/constants/admin.constant';
import { AdminService } from '@sc-modules/admin/services/admin.service';

@Component({
  selector: 'sc-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  private readonly adminService = inject(AdminService);
  readonly tableConfig = teachersTableConfig;
  readonly teachers$ = this.adminService.teachers$;
  constructor() {
  }
}
