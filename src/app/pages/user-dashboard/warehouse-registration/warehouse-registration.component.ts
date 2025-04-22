import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PocketBaseService } from '../../../services/pocketbase.service';

@Component({
  selector: 'app-warehouse-registration',
  templateUrl: './warehouse-registration.component.html',
  styleUrls: ['./warehouse-registration.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class WarehouseRegistrationComponent implements OnInit {
  form: FormGroup;
  showSuccessModal = false;
  submitting = false;
  uploadedFiles: File[] = [];
  
  constructor(
    private fb: FormBuilder,
    private pocketBaseService: PocketBaseService
  ) {
    // Initialize the form with validation
    this.form = this.fb.group({
      // Business Information
      business_name: ['Dummy Business', Validators.required],
      floor_unit_no: ['1A', Validators.required],
      building_no_name: ['Dummy Building', Validators.required],
      street: ['Dummy Street', Validators.required],
      barangay: ['Dummy Barangay', Validators.required],
      city_municipality: ['Dummy City', Validators.required],
      province: ['Dummy Province', Validators.required],
      region: ['Dummy Region', Validators.required],
      zip_code: ['12345', Validators.required],
      
      // Business Owner Information
      business_owner: ['John Doe', Validators.required],
      owner_sex: ['Male', Validators.required],
      owner_social_classification: ['General'],
      owner_telephone: ['1234567890', Validators.required],
      owner_email: ['johndoe@example.com', [Validators.required, Validators.email]],
      owner_mobile: ['0987654321', Validators.required],
      owner_website: ['www.dummybusiness.com'],
      
      // Warehouse Owner Information
      warehouse_owner: ['Jane Doe', Validators.required],
      warehouse_owner_sex: ['Female', Validators.required],
      warehouse_owner_social_classification: ['General'],
      warehouse_owner_telephone: ['1122334455', Validators.required],
      warehouse_owner_email: ['janedoe@example.com', [Validators.required, Validators.email]],
      warehouse_owner_mobile: ['5544332211', Validators.required],
      warehouse_owner_website: ['www.dummywarehouse.com'],
      
      // Products Information
      vapor_product_system: [true],
      vapor_product_device: [false],
      vapor_product_refills: [true],
      htp_system: [false],
      htp_device: [true],
      htp_consumables: [false],
      nicotine_pouch: [true],
      brands_list: ['Brand A, Brand B', Validators.required],
      supplier_names: ['Supplier X, Supplier Y', Validators.required],
      
      // Financial Information
      asset_size: ['1000000', Validators.required],
    });
  }
  
  ngOnInit(): void {
    // Any initialization logic here
  }
  
  // Check if a field is invalid (for showing error messages)
  isFieldInvalid(fieldName: string): boolean {
    const control = this.form.get(fieldName);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  // File upload handling
  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.uploadedFiles.push(files[i]);
      }
    }
  }

  // Remove a file from the uploads
  removeFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
  }

  // Form submission
  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      // Mark all controls as touched to trigger validation messages
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        control?.markAsTouched();
      });
      return;
    }
    
    this.submitting = true;
    
    try {
      const formData = new FormData();
      
      // Add form fields to FormData with proper value handling
      Object.keys(this.form.value).forEach(key => {
        const value = this.form.value[key];
        // Only add defined values and convert boolean to string
        if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });
      
      // Add files to FormData as proofFile
      if (this.uploadedFiles.length > 0) {
        for (let i = 0; i < this.uploadedFiles.length; i++) {
          formData.append('proofFile', this.uploadedFiles[i]);
        }
      }
      
      // Add concatenated products field
      const products = [];
      if (this.form.value.vapor_product_system) products.push('Vapor Product System');
      if (this.form.value.vapor_product_device) products.push('Vapor Product Device');
      if (this.form.value.vapor_product_refills) products.push('Vapor Product Refills/E-liquids');
      if (this.form.value.htp_system) products.push('Heated Tobacco Product (HTP) System');
      if (this.form.value.htp_device) products.push('HTP Device');
      if (this.form.value.htp_consumables) products.push('HTP Consumables');
      if (this.form.value.nicotine_pouch) products.push('Nicotine Pouch');
      
      // Only add products if there are any selected
      if (products.length > 0) {
        formData.append('products', products.join(', '));
      }
      
      // Create warehouse address string from individual components
      const addressParts = [
        this.form.value.floor_unit_no, 
        this.form.value.building_no_name,
        this.form.value.street,
        this.form.value.barangay,
        this.form.value.city_municipality,
        this.form.value.province,
        this.form.value.region,
        this.form.value.zip_code
      ].filter(Boolean); // Remove any undefined values
      
      // Add combined fields to better match the requirements
      formData.append('nameOfBusiness', this.form.value.business_name);
      formData.append('warehouseAddress', addressParts.join(', '));
      formData.append('nameOfBusinessOwner', this.form.value.business_owner);
      formData.append('businessOwnerSex', this.form.value.owner_sex);
      formData.append('businessOwnerSocialClassification', this.form.value.owner_social_classification || 'None');
      formData.append('businessOwnerTelephoneNumber', this.form.value.owner_telephone);
      formData.append('businessOwnerEmailAddress', this.form.value.owner_email);
      formData.append('businessOwnerMobileNumber', this.form.value.owner_mobile);
      formData.append('businessOwnerWebsiteSocialMediaPage', this.form.value.owner_website || 'N/A');
      formData.append('nameOfWarehouseOwner', this.form.value.warehouse_owner);
      formData.append('warehouseOwnerSex', this.form.value.warehouse_owner_sex);
      formData.append('warehouseOwnerSocialClassification', this.form.value.warehouse_owner_social_classification || 'None');
      formData.append('warehouseOwnerTelephoneNumber', this.form.value.warehouse_owner_telephone);
      formData.append('warehouseOwnerEmailAddress', this.form.value.warehouse_owner_email);
      formData.append('warehouseOwnerMobileNumber', this.form.value.warehouse_owner_mobile);
      formData.append('warehouseOwnerWebsiteSocialMediaPage', this.form.value.warehouse_owner_website || 'N/A');
      formData.append('productsStoredInWarehouse', products.join(', ') || 'None specified');
      formData.append('listOfBrands', this.form.value.brands_list);
      formData.append('nameOfSuppliers', this.form.value.supplier_names);
      
      // Add application status
      formData.append('applicationStatus', 'pending');
      
      // Get current user ID
      const userData = this.pocketBaseService.getUserData();
      if (userData) {
        formData.append('owner', userData.id);
      }
      
      console.log('Submitting warehouse registration with data:', Object.fromEntries(formData.entries()));
      
      // Submit to PocketBase
      await this.pocketBaseService.createRecord('warehouse_regis', formData);
      
      this.submitting = false;
      this.showSuccessModal = true;
    } catch (error) {
      console.error('Error submitting warehouse registration:', error);
      this.submitting = false;
      // Handle error (could show error message to user here)
    }
  }
  
  // Close the success modal
  closeSuccessModal(): void {
    this.showSuccessModal = false;
    this.form.reset();
    this.uploadedFiles = [];
  }
}