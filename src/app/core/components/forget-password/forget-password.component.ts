import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { apiRoutes } from '../../constants/api.constants';
import { environment } from '@sc-environment';

type ForgetPasswordState = '' | 'sending-otp' | 'otp-sent' | 'validating-otp' | 'reset-successful' | 'reset-failed';

@Component({
  selector: 'sc-forget-password',
  standalone: false,
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent {
  readonly dialogRef = inject(MatDialogRef<ForgetPasswordComponent>);
  readonly httpClient = inject(HttpClient);
  readonly data = inject<{ username?: string }>(MAT_DIALOG_DATA);
  username = new FormControl(this.data.username, Validators.required);
  otp = new FormControl(null, Validators.required);
  password = new FormControl('', Validators.required);
  state = signal<ForgetPasswordState>('');
  error = signal<string>('');

  sendOtp() {
    if (this.username.valid && this.username.value) {
      this.state.set('sending-otp');
      this.error.set('');
      this.username.disable();
      this.httpClient
        .get(environment.apiUrl + apiRoutes.auth.sendOtp, {
          params: {
            userName: this.username.value,
          },
        })
        .subscribe({
          next: () => {
            this.state.set('otp-sent');
          },
          error: (err) => {
            this.state.set('');
            this.username.enable();
            this.username.reset();
            this.error.set(`Failed to send OTP: ${err.error.message}`);
            console.error('Failed to send OTP', err.error.message);
          },
        });
    } else {
      this.username.markAsTouched();
    }
  }
  resetPassword() {
    if (this.password.valid && this.otp.valid) {
      this.state.set('validating-otp');
      this.error.set('');
      this.password.disable();
      this.otp.disable();
      this.httpClient
        .post(environment.apiUrl + apiRoutes.auth.resetPassword, {
          userName: this.username.value,
          password: this.password.value,
          otp: this.otp.value,
        })
        .subscribe({
          next: () => {
            this.state.set('reset-successful');
          },
          error: (err) => {
            this.state.set('reset-failed');
            this.error.set(`Failed to reset password: ${err.error.message}`);
            console.error('Failed to reset password', err);
          },
          complete: () => {
            this.username.enable();
            this.password.enable();
            this.password.reset();
            this.otp.enable();
            this.otp.reset();
          },
        });
    } else {
      this.password.markAsTouched();
      this.otp.markAsTouched();
    }
  }
}
