import { Component } from '@angular/core';
import { SharedStoreService } from 'src/app/core/service/shared-store.service';

@Component({
  selector: 'sc-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  constructor(private sharedStoreService: SharedStoreService) {
    sharedStoreService.loggedInUser$.subscribe((user) => console.log(user));
  }
}
