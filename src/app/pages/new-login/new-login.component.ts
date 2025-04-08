import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-login',
  imports: [RouterModule],
  templateUrl: './new-login.component.html',
  styleUrl: './new-login.component.css'
})
export class NewLoginComponent {

  email: string = '';
  password: string = '';

  onSubmit() {
    if (this.email && this.password) {
      // Handle login logic here (e.g., send the login data to the backend)
      console.log('Email:', this.email);
      console.log('Password:', this.password);
    }
  }
}
