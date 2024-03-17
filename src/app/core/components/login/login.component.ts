import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../service/http.service';
import { ScreenSizeObserver } from '../../service/screen.service';

@Component({
  selector: 'sc-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  hide = true;
  isChecked = false;
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
    const loginUrl = !this.isChecked ? '/student-profile' : '/teacher-profile';
    this.apiService
      .post(loginUrl, this.loginForm.value, {})
      .subscribe((res) => {});
  }
}
