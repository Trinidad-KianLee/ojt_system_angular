import { 
  Component, 
  OnInit 
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PocketBaseService } from '../services/pocketbase.service';

@Component({
  selector: 'app-landing-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './landing-registration.component.html',
  styleUrls: ['./landing-registration.component.css']
})
export class LandingRegistrationComponent implements OnInit {
  form!: FormGroup;
  showSuccessModal = false; 

  constructor(
    private fb: FormBuilder,
    private pocketbase: PocketBaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        firstName: ['', Validators.required],
        middleName: [''],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        dob: ['', [Validators.required, this.dobRangeValidator]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        passwordConfirm: ['', Validators.required],
        gender: ['', Validators.required],
        officeAddress: ['', Validators.required],
        companyName: ['', Validators.required],
        clientDesignation: ['', Validators.required]
      },
      {
        validators: [this.passwordMatchValidator('password', 'passwordConfirm')]
      }
    );
  }

  private passwordMatchValidator(passwordKey: string, confirmKey: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      const passwordControl = group.get(passwordKey);
      const confirmControl = group.get(confirmKey);
      if (!passwordControl || !confirmControl) return null;

      if (confirmControl.errors && !confirmControl.errors['passwordMismatch']) {
        return null;
      }

      if (passwordControl.value !== confirmControl.value) {
        confirmControl.setErrors({ passwordMismatch: true });
      } else {
        confirmControl.setErrors(null);
      }
      return null;
    };
  }

  private dobRangeValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null; 

    const inputDate = new Date(control.value);
    const minDate = new Date('1940-01-01');
    const maxDate = new Date('2007-12-31');

    if (inputDate < minDate || inputDate > maxDate) {
      return { dobOutOfRange: true };
    }
    return null;
  }

  onRegister(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.pocketbase.registerUser(this.form.value)
      .then(() => {
        console.log('Registration success!');
        this.showSuccessModal = true; 
      })
      .catch(err => {
        console.error('Registration error:', err);
      });
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
    this.router.navigate(['/login']);
  }
}
