import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PocketBaseService } from '../services/pocketbase.service';
import { ActivatedRoute } from '@angular/router';
import PocketBase from 'pocketbase';

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  resetPasswordForm: FormGroup;
  message: string = '';
  error: string = '';
  email: string = '';

  constructor(private fb: FormBuilder, private pocketbase: PocketBaseService, private activatedRoute: ActivatedRoute) {
    this.email = this.activatedRoute.snapshot.queryParams['email'] || '';
    const pb = new PocketBase('http://127.0.0.1:8090');
    pb.collection('users').getFullList().then((data)=>{
      console.log(data);
    })

    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.resetPasswordForm.valid) {
      const { token, password, passwordConfirm } = this.resetPasswordForm.value;

      if (password !== passwordConfirm) {
        this.error = 'Passwords do not match!';
        return;
      }

      try {
        await this.pocketbase.updatePasswordManually(this.email, password, passwordConfirm);
        this.message = 'Password reset successful!';
        this.error = '';
      } catch (err) {
        this.error = 'Failed to reset password. Please try again.';
      }
    }
  }
}
