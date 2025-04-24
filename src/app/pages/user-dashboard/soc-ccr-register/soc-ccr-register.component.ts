import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PocketBaseService } from '../../../services/pocketbase.service';

@Component({
  selector: 'app-soc-ccr-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './soc-ccr-register.component.html',
  styleUrl: './soc-ccr-register.component.css'
})
export class SocCcrRegisterComponent implements OnInit {
  form!: FormGroup;
  showSuccessModal = false;
  uploadedFiles: File[] = [];
  isSubmitting = false;
  
  constructor(
    private fb: FormBuilder, 
    private pbService: PocketBaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      // Application Details
      nameOfApplicantFirm: ['Dummy Firm', Validators.required],
      contactPerson: ['John Doe', Validators.required],
      position: ['Manager', Validators.required],
      officeAddress: ['123 Dummy Street', Validators.required],
      telephoneNumber: ['1234567890', Validators.required],
      emaillAdress: ['dummy@example.com', [Validators.required, Validators.email]],
      product: ['Dummy Product', Validators.required],
      serialNum: ['12345'],
      batchNum: ['67890'],
      countryOfOrigin: ['Dummyland', Validators.required],
      ahtn: ['1234.56.78'],
      warehouseAddress: ['456 Warehouse Lane', Validators.required],
      quantity: ['100', Validators.required],
      brandName: ['DummyBrand', Validators.required],
      type: ['Type A'],
      capacity: ['1000'],
      grade: ['A'],
      model: ['Model X'],
      currency: ['PHP'],
      valueOfImport: ['100000'],
      invoiceNumber: ['INV12345'],
      nameOfExporter: ['Dummy Exporter', Validators.required],
      addressOfExporter: ['789 Exporter Avenue', Validators.required],
      nameOfManufacturer: ['Dummy Manufacturer', Validators.required],
      addressOfManufacturer: ['101 Manufacturer Road', Validators.required],
      isoCertificationNumber: ['ISO12345'],
      nameOfCertificationBody: ['Certification Body Inc.'],
      validityDate: ['2023-12-31'],
      importEntryNumber: ['IMP12345'],
      portOfDischarge: ['Dummy Port'],
      voyage: ['Voyage 123'],
      vessel: ['Vessel X'],
      airwayBill: ['AWB12345'],
      proofFile: [null]
    });
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length) {
      // Just keeping the most recent file
      this.uploadedFiles = [files[0]];
      this.form.patchValue({ proofFile: this.uploadedFiles[0] });
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    try {
      this.isSubmitting = true;
      const formData = new FormData();
      
      // Add all form fields to the FormData
      Object.keys(this.form.value).forEach(key => {
        if (key !== 'proofFile' && this.form.value[key] !== null && this.form.value[key] !== undefined) {
          formData.append(key, this.form.value[key]);
        }
      });

      // Add the file if it exists
      if (this.uploadedFiles.length > 0) {
        formData.append('proofFile', this.uploadedFiles[0]);
      }

      // Set the default status
      formData.append('applicationStatus', 'pending');
      
      // Get current user and set as owner
      const currentUser = this.pbService.getUserData();
      if (currentUser && currentUser.id) {
        formData.append('owner', currentUser.id);
      }

      // Submit to PocketBase
      await this.pbService.createSocCcrRegistration(formData);
      
      // Show success modal
      this.showSuccessModal = true;
    } catch (error) {
      console.error('Error storing record in PocketBase:', error);
      alert('Failed to store data. Check console for details.');
    } finally {
      this.isSubmitting = false;
    }
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
    this.form.reset();
    this.uploadedFiles = [];
    // Navigate back to the dashboard or relevant page
    this.router.navigate(['/user-dashboard']);
  }
}
