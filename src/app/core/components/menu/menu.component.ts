import { Component, inject, input } from '@angular/core';
import { NavItem } from '@sc-models/core';
import { ScreenSizeObserver } from '../../service/screen.service';

@Component({
  selector: 'sc-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  standalone: false,
})
export class MenuComponent {
  readonly screenObserver = inject(ScreenSizeObserver);

  readonly navItems = input.required<NavItem[]>();
}
