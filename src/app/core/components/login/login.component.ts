import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ScreenSizeObserver } from '../../service/screen.service';
import { Router } from '@angular/router';
import { SharedStoreService } from 'src/app/core/service/shared-store.service';
import { logInActions } from 'src/app/core/store/action';
import { CookieService } from '../../service/cookie.service';
import { MatDialog } from '@angular/material/dialog';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: false,
})
export class LoginComponent {
  readonly screenObserver = inject(ScreenSizeObserver);
  readonly dialog = inject(MatDialog);
  private readonly sharedStore = inject(SharedStoreService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly title = inject(Title);

  hidePassword = true;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    remember: [false, Validators.required],
  });

  constructor() {
    this.title.setTitle('School Compass 365 | Login');
    this.navigateLoggedInUsers();
  }

  navigateLoggedInUsers() {
    const token = this.cookieService.get('authorization');
    if (token) {
      const data = JSON.parse(atob(token.split('.')?.[1]) || '{}');
      this.router.navigate([data?.user?.role, 'dashboard']);
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  login() {
    const { username, password, remember } = this.loginForm.value;
    if (username && password)
      this.sharedStore.dispatch(logInActions.logIn({ logDto: { username, password, remember: remember ?? false } }));
  }
  forgotPassword() {
    this.dialog.open(ForgetPasswordComponent, {
      width: '400px',
      panelClass: 'overflow-hidden',
      data: {
        username: this.loginForm.value.username,
      },
    });
  }
}
