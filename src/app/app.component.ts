import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegistrationFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ojt_system';
}
