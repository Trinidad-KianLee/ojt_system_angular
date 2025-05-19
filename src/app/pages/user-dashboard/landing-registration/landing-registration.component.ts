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

  emailErrorMsg: string | null = null;
  passwordMismatchMsg: string | null = null;

  constructor(
    private fb: FormBuilder,
    private pocketbase: PocketBaseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
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
        companyZipCode: ['', Validators.required],
        companyCity: ['', Validators.required],
        companyStreet: ['', Validators.required],
        companyBarangay: ['', Validators.required],
        companyProvince: ['', Validators.required],
        companyRegion: ['', Validators.required],
        companyEmail: [''],
        contactLNumber: ['', Validators.required],
        contactNumber: ['', Validators.required],
        proofFile: [null],

        agreeToTerms: [false, Validators.requiredTrue],
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
        return [
          'companyName', 'companyAddress', 'contactLNumber', 'companyZipCode', 'companyRegion', 'companyProvince',
          'companyCity', 'companyBarangay', 'companyStreet', 'companyEmail', 'contactNumber', 'proofFile'
        ];
      case 3:
        return ['agreeToTerms'];
      default:
        return [];
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    // Check file size
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    // Check file extension
    const validTypes = ['.pdf', '.doc', '.docx'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!fileExtension || !validTypes.includes('.' + fileExtension)) {
      alert('Only PDF, DOC, and DOCX files are allowed');
      return;
    }

    this.form.patchValue({ proofFile: file });
    this.form.get('proofFile')?.markAsTouched();
  }


  getFileName(): string {
    const file = this.form.get('proofFile')?.value;
    return file ? file.name : '';
  }

  removeFile(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.form.patchValue({ proofFile: null });
  }

  onRegister(): void {
    if (!this.isStepValid(this.currentStep)) return;
    if (this.form.invalid) return;

    this.emailErrorMsg = null;
    this.passwordMismatchMsg = null;

    const confirmCtrl = this.form.get('passwordConfirm');
    if (confirmCtrl?.errors?.['passwordMismatch']) {
      this.passwordMismatchMsg = 'Passwords do not match';
      return;
    }

    this.pocketbase.registerUser(this.form.value)
      .then(() => {
        console.log('Registration success!');
        this.showSuccessModal = true;
      })
      .catch(err => {
        console.error('Registration error:', err);

        if (err?.data?.data?.email?.message?.includes('already used')) {
          this.emailErrorMsg = 'This email has been registered already';
        }
      });
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
    this.router.navigate(['/new-login']);
  }
}
