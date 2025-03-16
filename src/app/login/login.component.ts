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
    try {
      await this.pbService.loginUser(this.formData.email, this.formData.password);
      alert('Login successful!');
      this.router.navigate(['/landingpage-orig']);
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Check console for details.');
    }
  }
}
