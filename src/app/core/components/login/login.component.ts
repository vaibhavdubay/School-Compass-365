import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../service/http.service';
import { ScreenSizeObserver } from '../../service/screen.service';
import { Role } from '@sc-enums/role';

@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  hide = true;
  isStudent = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    public readonly screenObserver: ScreenSizeObserver,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
  login() {
    const loginUrl = `/auth/${
      this.isStudent ? Role.STUDENT : Role.TEACHER
    }/login`;
    this.apiService.post(loginUrl, this.loginForm.value).subscribe((user) => {
      console.log(user);
    });
  }
}
