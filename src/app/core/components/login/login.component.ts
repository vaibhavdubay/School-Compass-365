import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ScreenSizeObserver } from '../../service/screen.service';
import { Role } from '@sc-enums/role';
import { Router } from '@angular/router';
import { SharedStoreService } from 'src/app/core/service/shared-store.service';
import { logInActions } from 'src/app/core/store/action';

@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isAdmin = false;
  isTeacher = false;
  hidePassword = true;
  loginForm: FormGroup;

  constructor(
    public readonly screenObserver: ScreenSizeObserver,
    private sharedStore: SharedStoreService,
    private fb: FormBuilder,
    router: Router,
  ) {
    if (router.url.startsWith('/admin')) {
      this.isAdmin = true;
    }
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  login() {
    this.sharedStore.dispatch(
      logInActions.logIn({ role: this.role, logDto: this.loginForm.value }),
    );
  }

  get role() {
    if (this.isAdmin) return Role.ADMIN;
    else if (this.isTeacher) return Role.TEACHER;
    else return Role.STUDENT;
  }
}
