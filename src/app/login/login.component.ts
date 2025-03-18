import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PocketBaseService } from '../services/pocketbase.service';
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

  constructor(
    private pbService: PocketBaseService,
    private router: Router
  ) {}

  async onLogin() {
    // Grab the DOM elements just once at the start
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');

    // Hide messages and reset classes each time user tries to login
    if (errorMessage) {
      errorMessage.classList.add('hidden');
    }
    if (successMessage) {
      successMessage.classList.add('hidden');
    }
    if (emailInput && passwordInput) {
      emailInput.classList.remove('shake', 'border-red-500');
      passwordInput.classList.remove('shake', 'border-red-500');
    }

    try {
      await this.pbService.loginUser(this.formData.email, this.formData.password);
      if (successMessage) {
        successMessage.classList.remove('hidden');
      }

      setTimeout(() => {
        this.router.navigate(['/landingpage-orig']);
      }, 1500); 
    } catch (error) {
      console.error('Login error:', error);

      if (errorMessage) {
        errorMessage.classList.remove('hidden');
      }

      if (emailInput && passwordInput) {
        emailInput.classList.add('shake', 'border-red-500');
        passwordInput.classList.add('shake', 'border-red-500');

        setTimeout(() => {
          emailInput.classList.remove('shake');
          passwordInput.classList.remove('shake');
        }, 300);
      }
    }
  }
}
