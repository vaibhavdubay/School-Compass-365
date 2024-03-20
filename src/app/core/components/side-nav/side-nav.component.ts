import { Component, Input, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavItem } from '@sc-models/core';

@Component({
  selector: 'sc-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  private breakpointObserver = inject(BreakpointObserver);
  @Input() naveItem: NavItem[] = [
    {
      icon: 'person',
      label: 'Admin',
      routerLink: ['/admin'],
    },
    {
      icon: 'person',
      label: 'Admin',
      routerLink: ['/admin1'],
    },
    {
      icon: 'person',
      label: 'Admin',
      routerLink: ['/admin2'],
    },
    {
      icon: 'person',
      label: 'Admin',
      routerLink: ['/admin3'],
    },
    {
      icon: 'person',
      label: 'Admin',
      routerLink: ['/admin4'],
    },
    {
      icon: 'person',
      label: 'Admin',
      routerLink: ['/admin5'],
    },
    {
      icon: 'person',
      label: 'Admin',
      routerLink: ['/admin6'],
    },
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );
}
