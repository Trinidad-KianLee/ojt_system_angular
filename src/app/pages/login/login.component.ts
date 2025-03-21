import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PocketBaseService } from '../../services/pocketbase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  formData = {
    email: '',
    password: ''
  };

  loginError = false;
  loginSuccess = false;

  constructor(
    private pbService: PocketBaseService,
    private router: Router
  ) {}

  async onLogin() {
    // Reset booleans on each new attempt
    this.loginError = false;
    this.loginSuccess = false;

    try {
      // Attempt login with your PocketBase service
      await this.pbService.loginUser(this.formData.email, this.formData.password);

      // If successful:
      this.loginSuccess = true; // show green toast

      // Optionally redirect after a delay
      setTimeout(() => {
        this.router.navigate(['/landingpage-orig']);
      }, 1500);
    } catch (error) {
      console.error('Login error:', error);

      // If fail:
      this.loginError = true; // show red toast
    }
  }
}
