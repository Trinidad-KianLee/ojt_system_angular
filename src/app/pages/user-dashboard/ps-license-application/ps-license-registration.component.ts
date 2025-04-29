import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { PocketBaseService } from '../../../services/pocketbase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ps-license-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ps-license-registration.component.html',
  styleUrls: ['./ps-license-registration.component.css']
})
export class PsLicenseRegistrationComponent implements OnInit {
  applicationForm: FormGroup;
  submitted = false;
  submitting = false;
  successMessage = '';
  errorMessage = '';
  productTypes = ['HTP', 'Electronic', 'Product Type C'];
  showSuccessModal = false;

  constructor(
    private fb: FormBuilder,
    private pbService: PocketBaseService,
    private router: Router
  ) {
    this.applicationForm = this.fb.group({
      applicationType: ['New', Validators.required],
      nameOfCompany: ['Tech Solutions Inc.', Validators.required],
      manufacturerType: ['Local', Validators.required],
      auditingBody: ['Global Certifiers Co.'],
      importer: ['Import Masters Ltd.'],
      officeAddress: ['1 Corporate Drive, Metropolis', Validators.required],
      telephoneNumber: ['555-0100', Validators.required],
      faxNumber: ['555-0101'],
      email: ['info@techsolutions.com', [Validators.required, Validators.email]],
      factoryAdress: ['1 Industrial Way, Factory Town', Validators.required],
      factoryTelNumber: ['555-0200', Validators.required],
      factoryFaxNumber: ['555-0201'],
      factoryEmail: ['factory@techsolutions.com', [Validators.required, Validators.email]],
      tin: ['987-654-321-000', Validators.required],
      dateOfIssue: [new Date().toISOString().split('T')[0], Validators.required], // Keep current date or set a specific one
      companyPresident: ['Alice Wonderland', Validators.required],
      qualityManagementRepresentative: ['Bob The Builder', Validators.required],
      qmrTelephoneNumber: ['555-0300', Validators.required],
      qmrFaxNumber: ['555-0301'],
      qmrEmail: ['qmr@techsolutions.com', [Validators.required, Validators.email]],
      specificProductStandard: ['PNS 123:2023', Validators.required],
      product: ['Advanced Gadget', Validators.required],
      brand: ['TechBrand', Validators.required],
      model: ['GDT-5000', Validators.required],
      type: ['Electronic', Validators.required],
      ratedCapacity: ['500 units/day', Validators.required],
      actualCapacity: ['480 units/day', Validators.required],
      actualCapacityPerShiftMonth: ['10560 units', Validators.required], // 480 units/day * 22 days/month
      percentageOfPRoduction: ['96%'],
      numOfEmployees: ['250', Validators.required],
      numOfEmployeesPerSite: ['250', Validators.required],
      numOfEmployeesPerShift: ['80', Validators.required],
      numOfEmployeeAssessment: ['15', Validators.required],
      assets: ['25000000', Validators.required], // Example value in local currency
      year: ['2024', Validators.required],
      production: ['126720', Validators.required], // 10560 units/month * 12 months
      value: ['12672000', Validators.required], // Example value in local currency (e.g., 100 per unit)
    });
  }

  ngOnInit(): void {
    // Initialize with current date for date fields
    const currentDate = new Date().toISOString().split('T')[0];
    this.applicationForm.patchValue({
      dateOfIssue: currentDate
    });
  }

  async onSubmit() {
    this.submitted = true;
    
    if (this.applicationForm.invalid) {
      this.errorMessage = 'Please fix the errors in the form before submitting.';
      return;
    }

    this.submitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    try {
      const formData = this.applicationForm.value;
      
      // Add owner field if user is logged in
      if (this.pbService.isLoggedIn()) {
        const userData = this.pbService.getUserData();
        if (userData) {
          formData.owner = userData.id;
        }
      }
      
      // Set application status to pending
      formData.applicationStatus = 'pending';
      
      await this.pbService.createPsLicense(formData);
      
      this.successMessage = 'PS License application submitted successfully!';
      this.showSuccessModal = true;
      this.applicationForm.reset();
      this.submitted = false;
      
      // Redirect after 2 seconds
      setTimeout(() => {
        this.showSuccessModal = false;
        this.router.navigate(['/user-dashboard']);
      }, 2000);

    } catch (error) {
      console.error('Error submitting PS License application:', error);
      this.errorMessage = 'Failed to submit application. Please try again.';
    } finally {
      this.submitting = false;
    }
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
    this.router.navigate(['/user-dashboard']);
  }
}