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
  productTypes = ['HTP', 'Electronic ', 'Product Type C'];

  constructor(
    private fb: FormBuilder,
    private pbService: PocketBaseService,
    private router: Router
  ) {
    this.applicationForm = this.fb.group({
      company_name: ['Dummy Company', Validators.required],
      office_address: ['123 Dummy Street', Validators.required],
      factory_address: ['456 Factory Lane', Validators.required],
      tin: ['123-456-789', Validators.required],
      tin_issue_date: ['2023-01-01', Validators.required],
      company_president: ['John Doe', Validators.required],
      quality_management_rep: ['Jane Smith', Validators.required],
      qmr_contact: ['+1234567890', Validators.required],
      product_type: ['Product Type A', Validators.required],
      product_description: ['Dummy product description', Validators.required],
      brand_names: ['Dummy Brand', Validators.required],
      qms_standard: ['ISO 9001', Validators.required],
      specific_product_standards: ['Standard A', Validators.required],
      holds_quality_certificate: [false],
      seeking_approval: [false],
      quality_certificates: this.fb.array([]),
      seeking_approval_details: this.fb.array([]),
      rated_capacity: ['1000', Validators.required],
      actual_capacity: ['800', Validators.required],
      production_ph_percentage: [50],
      total_employees: ['100', Validators.required],
      employees_per_premise: ['50', Validators.required],
      employees_per_shift: ['25', Validators.required],
      employees_during_assessment: ['20', Validators.required],
      assets_in_million: ['10', Validators.required],
      production_volumes: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 3; i++) {
      this.addProductionVolume(currentYear - i);
    }
  }

  get qualityCertificates() {
    return this.applicationForm.get('quality_certificates') as FormArray;
  }

  get seekingApprovalDetails() {
    return this.applicationForm.get('seeking_approval_details') as FormArray;
  }

  get productionVolumes() {
    return this.applicationForm.get('production_volumes') as FormArray;
  }

  addCertificate() {
    const certificateForm = this.fb.group({
      body: [''],
      approval_type: [''],
      validity: ['']
    });
    this.qualityCertificates.push(certificateForm);
  }

  removeCertificate(index: number) {
    this.qualityCertificates.removeAt(index);
  }

  addApproval() {
    const approvalForm = this.fb.group({
      body: [''],
      approval_type: ['']
    });
    this.seekingApprovalDetails.push(approvalForm);
  }

  removeApproval(index: number) {
    this.seekingApprovalDetails.removeAt(index);
  }

  addProductionVolume(year: number) {
    const volumeForm = this.fb.group({
      year: [year.toString()],
      production: [''],
      value_in_million: ['']
    });
    this.productionVolumes.push(volumeForm);
  }

  onHoldsQualityCertificateChange(event: any) {
    if (event.target.value === 'true') {
      if (this.qualityCertificates.length === 0) {
        this.addCertificate();
      }
    } else {
      while (this.qualityCertificates.length !== 0) {
        this.qualityCertificates.removeAt(0);
      }
    }
  }

  onSeekingApprovalChange(event: any) {
    if (event.target.value === 'true') {
      if (this.seekingApprovalDetails.length === 0) {
        this.addApproval();
      }
    } else {
      while (this.seekingApprovalDetails.length !== 0) {
        this.seekingApprovalDetails.removeAt(0);
      }
    }
  }

  async onSubmit() {
    this.submitted = true;
    
    if (this.applicationForm.invalid) {
      return;
    }

    this.submitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    try {
      const formData = this.applicationForm.value;
      if (formData.quality_certificates) {
        formData.quality_certificates = JSON.stringify(formData.quality_certificates);
      }
      if (formData.seeking_approval_details) {
        formData.seeking_approval_details = JSON.stringify(formData.seeking_approval_details);
      }
      if (formData.production_volumes) {
        formData.production_volumes = JSON.stringify(formData.production_volumes);
      }

      await this.pbService.createPsLicense(formData);
      
      this.successMessage = 'PS License application submitted successfully!';
      this.applicationForm.reset();
      this.submitted = false;
      
      // Redirect after 2 seconds
      setTimeout(() => {
        this.router.navigate(['/user-dashboard']);
      }, 2000);

    } catch (error) {
      console.error('Error submitting PS License application:', error);
      this.errorMessage = 'Failed to submit application. Please try again.';
    } finally {
      this.submitting = false;
    }
  }
}