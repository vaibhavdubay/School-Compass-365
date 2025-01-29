import { Component, inject } from '@angular/core';
import { AdminService } from '@sc-modules/admin/services/admin.service';

@Component({
  selector: 'sc-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false,
})
export class DashboardComponent {
  adminService = inject(AdminService);
  dashboard$ = this.adminService.dashboard$;
}
