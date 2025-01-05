import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, inject, input } from '@angular/core';
import { NavItem, SchoolProfile, User } from '@sc-models/core';
import { Observable, map, shareReplay } from 'rxjs';
import { SharedStoreService } from '../../service/shared-store.service';
import { logInActions } from '../../store/action';
import { ScreenSizeObserver } from '../../service/screen.service';
import { TitleService } from '../../service/title.service';
import { states } from '../../constants/states.constant';

@Component({
  selector: 'sc-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: false,
})
export class LayoutComponent {
  private readonly sharedStore = inject(SharedStoreService);
  private readonly titleService = inject(TitleService);
  readonly screenObserver = inject(ScreenSizeObserver);

  readonly states: { [k: string]: string } = states;
  readonly navItems = input.required<NavItem[]>();

  readonly logoutNavItems: NavItem[] = [
    {
      icon: 'Logout',
      label: 'Sign out',
      eventFunction: () => this.logOut(),
    },
    // {
    //   icon: 'dark_mode',
    //   label: 'Dark Mode',
    //   routerLink: ['#'],
    // },
  ];

  readonly profileNavItems: NavItem[] = [
    {
      icon:  'account_circle',
      label: 'Edit Profile',
      routerLink: ['edit-profile'],
    },
  ];
  
  readonly preferanceNavItems: NavItem[] = [
    {
      icon:  'settings',
      label: 'Preferences',
      routerLink: ['preferance'],
    },
  ];

  private readonly breakpointObserver = inject(BreakpointObserver);
  profile: Observable<{
    loggedInUser: User;
    schoolProfile: SchoolProfile;
  }>;
  title$: Observable<string> = this.titleService.title$;
  constructor() {
    this.profile = this.sharedStore.loggedInUserWithSchool$;
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  logOut() {
    this.sharedStore.dispatch(logInActions.logOut());
  }
}
