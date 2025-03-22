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
    this.loginError = false;
    this.loginSuccess = false;

    try {
      await this.pbService.loginUser(this.formData.email, this.formData.password);


      this.loginSuccess = true; 
      setTimeout(() => {
        if (this.pbService.isAdmin()) {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/updated-landing-page']);
        }
      }, 1500);

    } catch (error) {
      console.error('Login error:', error);

      this.loginError = true;
    }
  }
}
