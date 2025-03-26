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
import { PocketBaseService } from '../../../services/pocketbase.service';

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

  currentStep = 1;
  totalSteps = 3;

  // For error messages
  emailErrorMsg: string | null = null;
  passwordMismatchMsg: string | null = null;

  constructor(
    private fb: FormBuilder,
    private pocketbase: PocketBaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        // Auth fields for PocketBase "users"
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        passwordConfirm: ['', Validators.required],
        emailVisibility: [true],

        // Step 1
        firstName: ['', Validators.required],
        middleName: [''],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        socialClassification: [''],
        dob: ['', Validators.required],

        // Step 2
        companyName: ['', Validators.required],
        companyAddress: ['', Validators.required],
        companyEmail: [''], // optional
        contactNumber: ['', Validators.required],
        proofFile: [null],

        // Step 3
        agreeToTerms: [false, Validators.requiredTrue],
      },
      {
        validators: [this.passwordMatchValidator('password', 'passwordConfirm')]
      }
    );
  }

  /**
   * Custom validator to ensure password == passwordConfirm
   * Attaches "passwordMismatch" to the Confirm Password control if they differ.
   */
  private passwordMatchValidator(passwordKey: string, confirmKey: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      const passwordControl = group.get(passwordKey);
      const confirmControl = group.get(confirmKey);

      if (!passwordControl || !confirmControl) return null;

      // If Confirm Password has other errors, don't overwrite them
      if (confirmControl.errors && !confirmControl.errors['passwordMismatch']) {
        return null;
      }

      // Compare the two
      if (passwordControl.value !== confirmControl.value) {
        confirmControl.setErrors({ passwordMismatch: true });
      } else {
        confirmControl.setErrors(null);
      }
      return null;
    };
  }

  nextStep(): void {
    if (!this.isStepValid(this.currentStep)) return;
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isStepValid(step: number): boolean {
    const stepFields = this.getStepFields(step);
    stepFields.forEach(field => this.form.get(field)?.markAsTouched());
    return stepFields.every(field => !this.form.get(field)?.invalid);
  }

  getStepFields(step: number): string[] {
    switch (step) {
      case 1:
        return [
          'email', 'password', 'passwordConfirm', 'emailVisibility',
          'firstName', 'middleName', 'lastName', 'gender', 'socialClassification', 'dob'
        ];
      case 2:
        return ['companyName','companyAddress','companyEmail','contactNumber','proofFile'];
      case 3:
        return ['agreeToTerms'];
      default:
        return [];
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ proofFile: file });
    }
  }

  onRegister(): void {
    // Validate final step
    if (!this.isStepValid(this.currentStep)) return;
    if (this.form.invalid) return;

    // Clear old error messages
    this.emailErrorMsg = null;
    this.passwordMismatchMsg = null;

    // If Confirm Password has 'passwordMismatch'
    const confirmCtrl = this.form.get('passwordConfirm');
    if (confirmCtrl?.errors?.['passwordMismatch']) {
      this.passwordMismatchMsg = 'Passwords do not match';
      return;
    }

    // Submit to PocketBase
    this.pocketbase.registerUser(this.form.value)
      .then(() => {
        console.log('Registration success!');
        this.showSuccessModal = true;
      })
      .catch(err => {
        console.error('Registration error:', err);

        // If the email is already used
        if (err?.data?.data?.email?.message?.includes('already used')) {
          this.emailErrorMsg = 'This email has been registered already';
        }
      });
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
    this.router.navigate(['/login']);
  }
}
