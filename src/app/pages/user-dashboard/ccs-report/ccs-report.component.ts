import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-ccs-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ccs-report.component.html',
  styleUrl: './ccs-report.component.css'
})
export class CcsReportComponent implements OnInit {
  reportForm: FormGroup = new FormGroup({});
  selectedFormType: string = '';
  tempFormType: string = '';
  selectedFiles: File[] = [];
  maxFiles = 5;
  maxFileSize = 50 * 1024 * 1024;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
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
      reportType: ['', Validators.required],
      concernType: ['', Validators.required],
      concernDetails: ['', Validators.required],
      
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
        repairDetails: this.fb.group({
          productName: ['', Validators.required],
          purchaseDate: ['', Validators.required],
          serialNumber: [''],
          issueDescription: ['', Validators.required],
          preferredSolution: ['', Validators.required]
        })
      });
    }

    this.reportForm = this.fb.group(formConfig);

    this.reportForm.get('reportType')?.valueChanges.subscribe((value) => {
      this.updateShopDetailsValidators(value);
    });
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      
      if (this.selectedFiles.length + files.length > this.maxFiles) {
        alert(`Maximum ${this.maxFiles} files allowed`);
        return;
      }
      
      for (const file of files) {
        if (file.size > this.maxFileSize) {
          alert(`File ${file.name} exceeds 50MB limit`);
          return;
        }
      }
      
      this.selectedFiles.push(...files);
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

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}