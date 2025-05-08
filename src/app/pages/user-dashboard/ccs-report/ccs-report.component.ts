import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-ccs-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ccs-report.component.html',
  styleUrl: './ccs-report.component.css'
})
export class CcsReportComponent implements OnInit {
  // Initialize with empty FormGroup
  reportForm: FormGroup = new FormGroup({});
  selectedCategory: string = '';
  selectedFormType: string = ''; // To track which form type is selected (repair, ra11900, other)
  tempFormType: string = ''; // Temporarily store the form type during selection
  selectedFiles: File[] = [];
  maxFiles = 5;
  maxFileSize = 50 * 1024 * 1024; // 50MB in bytes
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.initForm();
  }
  
  // Method to select a form type (repair/refund/replacement, ra11900, other)
  selectFormType(type: string): void {
    this.tempFormType = type;
  }
  
  // Method to confirm the selected form type and initialize the appropriate form
  confirmFormType(): void {
    this.selectedFormType = this.tempFormType;
    this.initForm();
  }
  
  // Method to go back to form type selection
  changeFormType(): void {
    this.selectedFormType = '';
    this.tempFormType = '';
    this.selectedFiles = [];
  }
  
  initForm(): void {
    // Base form structure with common fields
    const formConfig = {
      // Personal Details (common for all forms)
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      middleInitial: [''],
      suffix: [''],
      sex: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      
      // Shop Details (common for repair and ra11900)
      shopDetails: this.fb.group({
        shopName: [''],
        branch: [''],
        address: [''],
        barangay: [''],
        city: [''],
        landmark: ['']
      }),
      
      // Declaration
      declaration: [false, Validators.requiredTrue]
    };
    
    // Add specific fields based on the form type
    if (this.selectedFormType === 'repair') {
      // Add repair/refund/replacement specific fields
      Object.assign(formConfig, {
        reportType: ['', Validators.required],
        repairDetails: this.fb.group({
          productName: ['', Validators.required],
          purchaseDate: ['', Validators.required],
          serialNumber: [''],
          issueDescription: ['', Validators.required],
          preferredSolution: ['', Validators.required]
        })
      });
    } 
    else if (this.selectedFormType === 'ra11900') {
      // Add RA11900 violation specific fields
      Object.assign(formConfig, {
        ra11900Details: this.fb.group({
          violationType: ['', Validators.required],
          otherViolation: [''],
          violationDate: ['', Validators.required],
          violationTime: [''],
          violationLocation: ['', Validators.required],
          establishmentName: [''],
          violationDescription: ['', Validators.required],
          witnessName: [''],
          witnessContact: [''],
          evidenceAttached: [false],
          evidenceDescription: [''],
          violationMessage: ['Hi DTI OSMV,'] // Adding this field for the message to OSMV
        })
      });
    } 
    else if (this.selectedFormType === 'other') {
      // Add 'Others' specific fields
      Object.assign(formConfig, {
        otherDetails: this.fb.group({
          subject: ['', Validators.required],
          category: ['', Validators.required],
          description: ['', Validators.required],
          preferredContact: ['', Validators.required]
        })
      });
    }
    
    // Create the form with the appropriate configuration
    this.reportForm = this.fb.group(formConfig);
    
    // Add conditional validation for the repair form type
    if (this.selectedFormType === 'repair') {
      // Listen for reportType changes to update shop details validation
      this.reportForm.get('reportType')?.valueChanges.subscribe((value) => {
        this.updateShopDetailsValidators(value);
      });
    }
    
    // Add conditional validation for the ra11900 form type
    if (this.selectedFormType === 'ra11900') {
      // Listen for violationType changes to handle "other" violation type
      this.reportForm.get('ra11900Details.violationType')?.valueChanges.subscribe((value) => {
        const otherViolationControl = this.reportForm.get('ra11900Details.otherViolation');
        
        if (value === 'other_violation') {
          otherViolationControl?.setValidators(Validators.required);
        } else {
          otherViolationControl?.clearValidators();
        }
        
        otherViolationControl?.updateValueAndValidity();
      });
      
      // Listen for evidenceAttached changes
      this.reportForm.get('ra11900Details.evidenceAttached')?.valueChanges.subscribe((value) => {
        const evidenceDescControl = this.reportForm.get('ra11900Details.evidenceDescription');
        
        if (value === true) {
          evidenceDescControl?.setValidators(Validators.required);
        } else {
          evidenceDescControl?.clearValidators();
        }
        
        evidenceDescControl?.updateValueAndValidity();
      });
    }
  }
  
  updateShopDetailsValidators(reportType: string): void {
    const shopDetails = this.reportForm.get('shopDetails') as FormGroup;
    
    if (!shopDetails) return;
    
    if (reportType === 'physical-retailer' || reportType === 'online-retailer') {
      shopDetails.get('shopName')?.setValidators(Validators.required);
      shopDetails.get('address')?.setValidators(Validators.required);
      shopDetails.get('barangay')?.setValidators(Validators.required);
      shopDetails.get('city')?.setValidators(Validators.required);
      shopDetails.get('landmark')?.setValidators(Validators.required);
    } else {
      Object.keys(shopDetails.controls).forEach(key => {
        shopDetails.get(key)?.clearValidators();
        shopDetails.get(key)?.updateValueAndValidity();
      });
    }
    
    shopDetails.updateValueAndValidity();
  }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    
    if (input.files) {
      // Check if adding these files exceeds the maximum allowed
      if (this.selectedFiles.length + input.files.length > this.maxFiles) {
        alert(`You can upload a maximum of ${this.maxFiles} files.`);
        return;
      }
      
      // Check each file for size constraints
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        
        if (file.size > this.maxFileSize) {
          alert(`File "${file.name}" exceeds the maximum size of 50MB.`);
          continue;
        }
        
        this.selectedFiles.push(file);
      }
    }
  }
  
  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }
  
  onSubmit(): void {
    if (this.reportForm.valid) {
      console.log('Form submitted successfully');
      console.log('Form type:', this.selectedFormType);
      console.log('Form data:', this.reportForm.value);
      console.log('Files:', this.selectedFiles);
      
      // For static functionality, just show an alert
      alert('Form submitted successfully!');
      this.selectedFormType = '';
      this.tempFormType = '';
      this.reportForm.reset();
      this.selectedFiles = [];
    } else {
      // Mark all fields as touched to trigger validation messages
      this.markFormGroupTouched(this.reportForm);
      alert('Please fill in all required fields correctly.');
    }
  }
  
  // Helper method to mark all controls in a form group as touched
  markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }
}
