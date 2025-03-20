import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PocketBaseService } from '../../../services/pocketbase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  imports: [ReactiveFormsModule],
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private pb: PocketBaseService, private router: Router) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

   onSubmit() {
    if (this.forgotPasswordForm.valid) {
        this.router.navigate(['/password-reset'], { 
        queryParams: { email: this.forgotPasswordForm.value.email  } 
      });
    }
  }
}
