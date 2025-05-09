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
  reportForm: FormGroup = new FormGroup({});
  selectedCategory: string = '';
  selectedFormType: string = '';
  tempFormType: string = '';
  selectedFiles: File[] = [];
  maxFiles = 5;
  maxFileSize = 50 * 1024 * 1024;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.initForm();
  }
  
  selectFormType(type: string): void {
    this.tempFormType = type;
  }
  
  confirmFormType(): void {
    this.selectedFormType = this.tempFormType;
    this.initForm();
  }
  
  changeFormType(): void {
    this.selectedFormType = '';
    this.tempFormType = '';
    this.selectedFiles = [];
  }
  
  initForm(): void {
    const formConfig = {
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      middleInitial: [''],
      suffix: [''],
      sex: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      
      shopDetails: this.fb.group({
        shopName: [''],
        branch: [''],
        address: [''],
        barangay: [''],
        city: [''],
        landmark: ['']
      }),
      
      declaration: [false, Validators.requiredTrue]
    };
    
    if (this.selectedFormType === 'repair') {
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
          violationMessage: ['Hi DTI OSMV,']
        })
      });
    } 
    else if (this.selectedFormType === 'other') {
      Object.assign(formConfig, {
        otherDetails: this.fb.group({
          subject: ['', Validators.required],
          category: ['', Validators.required],
          description: ['', Validators.required],
          preferredContact: ['', Validators.required]
        })
      });
    }
    
    this.reportForm = this.fb.group(formConfig);
    
    if (this.selectedFormType === 'repair') {
      this.reportForm.get('reportType')?.valueChanges.subscribe((value) => {
        this.updateShopDetailsValidators(value);
      });
    }
    
    if (this.selectedFormType === 'ra11900') {
      this.reportForm.get('ra11900Details.violationType')?.valueChanges
        .subscribe((value) => {
          const otherViolationControl = this.reportForm
            .get('ra11900Details.otherViolation');
          
          if (value === 'other_violation') {
            otherViolationControl?.setValidators(Validators.required);
          } else {
            otherViolationControl?.clearValidators();
          }
          
          otherViolationControl?.updateValueAndValidity();
        });
      
      this.reportForm.get('ra11900Details.evidenceAttached')?.valueChanges
        .subscribe((value) => {
          const evidenceDescControl = this.reportForm
            .get('ra11900Details.evidenceDescription');
          
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
      if (this.selectedFiles.length + input.files.length > this.maxFiles) {
        alert(`You can upload a maximum of ${this.maxFiles} files.`);
        return;
      }
      
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
      
      alert('Form submitted successfully!');
      this.selectedFormType = '';
      this.tempFormType = '';
      this.reportForm.reset();
      this.selectedFiles = [];
    } else {
      this.markFormGroupTouched(this.reportForm);
      alert('Please fill in all required fields correctly.');
    }
  }
  
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
