import { Component, Input, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { NavItem } from '@sc-models/core';
import { SharedStoreService } from '../../service/shared-store.service';
import { logInActions } from '../../store/action';

@Component({
  selector: 'sc-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  profile: any;
  private breakpointObserver = inject(BreakpointObserver);
  constructor(private sharedStore: SharedStoreService) {}
  @Input({ required: true }) naveItem: NavItem[] = [];

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  ngOnInit() {
    this.profile = this.sharedStore.loggedInUser$.subscribe((res) => {
      this.profile = res;
      console.log(res);
    });
  }

  logOut() {
    this.sharedStore.dispatch(logInActions.logOut());
  }
}
