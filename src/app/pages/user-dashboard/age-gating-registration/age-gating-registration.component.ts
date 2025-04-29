import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PocketBaseService } from '../../../services/pocketbase.service';

@Component({
  selector: 'app-age-gating-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './age-gating-registration.component.html',
  styleUrl: './age-gating-registration.component.css'
})
export class AgeGatingRegistrationComponent implements OnInit {
  form: FormGroup;
  uploadedFile: File | null = null;
  isSubmitting = false;
  showSuccessModal = false;

  constructor(
    private fb: FormBuilder,
    private pocketbaseService: PocketBaseService
  ) {
    // Initialize the form with validation
    this.form = this.fb.group({
      applicationType: ['New application', Validators.required],
      nameOfCompany: ['Dummy Company Inc.', Validators.required],
      companyType: ['Local', Validators.required],
      companyAdd: ['123 Main St, Anytown, USA', Validators.required],
      companyLocalAddress: ['Suite 456, Anytown, USA'],
      website: ['https://dummycompany.com', Validators.pattern('https?://.+')],
      telNumber: ['555-1234', Validators.required],
      faxNumber: ['555-5678'],
      email: ['contact@dummycompany.com', [Validators.required, Validators.email]],
      tin: ['123-456-789', Validators.required],
      dateOfIssue: ['', Validators.required], // Will be set in ngOnInit
      nameOfCompanyPresident: ['John Doe', Validators.required],
      nameOfAuthorized: ['Jane Smith', Validators.required],
      representativeContact: ['555-9876', Validators.required],
      representativeFaxNum: ['555-4321'],
      representativeEmail: ['jane.smith@dummycompany.com', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // Set default date to today
    const today = new Date();
    const formattedDate = today.toISOString().substring(0, 10);
    this.form.patchValue({
      dateOfIssue: formattedDate
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedFile = input.files[0];
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    if (!this.uploadedFile) {
      alert('Please upload supporting documents');
      return;
    }

    this.isSubmitting = true;

    try {
      // Create FormData to handle file upload
      const formData = new FormData();
      
      // Add all form values to FormData
      Object.keys(this.form.value).forEach(key => {
        formData.append(key, this.form.value[key]);
      });
      
      // Add the file
      formData.append('proofFile', this.uploadedFile);

      // Add owner if user is logged in
      if (this.pocketbaseService.isLoggedIn()) {
        const userData = this.pocketbaseService.getUserData();
        if (userData) {
          formData.append('owner', userData.id);
        }
      }

      // Set application status to pending by default
      formData.append('applicationStatus', 'pending');
      
      // Submit to PocketBase
      await this.createAgeGatingRecord(formData);
      
      // Show success modal
      this.showSuccessModal = true;
      this.form.reset();
      this.uploadedFile = null;
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    } finally {
      this.isSubmitting = false;
    }
  }

  async createAgeGatingRecord(data: FormData): Promise<void> {
    try {
      await this.pocketbaseService.createRecord('age_gating', data);
      console.log('Age gating registration submitted successfully');
    } catch (error) {
      console.error('Error creating age gating record:', error);
      throw error;
    }
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }
}
