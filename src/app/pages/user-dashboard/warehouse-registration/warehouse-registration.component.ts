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
    // Initialize the form with validations and dummy data
    this.form = this.fb.group({
      business_name: ['ABC Vape Supplies Co.', Validators.required],
      floor_unit_no: ['Unit 501', Validators.required],
      building_no_name: ['Pacific Tower', Validators.required],
      street: ['123 Main Avenue', Validators.required],
      barangay: ['San Lorenzo', Validators.required],
      city_municipality: ['Makati City', Validators.required],
      province: ['Metro Manila', Validators.required],
      region: ['NCR', Validators.required],
      zip_code: ['1200', Validators.required],

      business_owner: ['Juan Dela Cruz', Validators.required],
      owner_sex: ['Male', Validators.required],
      owner_social_classification: ['MSME'],
      owner_telephone: ['02-8123-4567', Validators.required],
      owner_email: ['juan@example.com', [Validators.required, Validators.email]],
      owner_mobile: ['09123456789', Validators.required],
      owner_website: ['www.abcvape.com'],
      owner_address: ['123 Business District, Makati City', Validators.required],

      warehouse_owner: ['Maria Santos', Validators.required],
      warehouse_owner_sex: ['Female', Validators.required],
      warehouse_owner_social_classification: ['MSME'],
      warehouse_owner_telephone: ['02-8987-6543', Validators.required],
      warehouse_owner_email: ['maria@example.com', [Validators.required, Validators.email]],
      warehouse_owner_mobile: ['09876543210', Validators.required],
      warehouse_owner_website: ['www.warehousesolutions.com'],
      warehouse_owner_address: ['456 Industrial Zone, Quezon City', Validators.required],
      
      vapor_product_system: [true],
      vapor_product_device: [true],
      vapor_product_refills: [true],
      htp_system: [false],
      htp_device: [false],
      htp_consumables: [false],
      nicotine_pouch: [true],
      
      brands_list: ['VapeTech, CloudMaster, NicStream', Validators.required],
      supplier_names: ['Global Vape Industries, Eastern Electronics', Validators.required],
      
      // Financial Information
      asset_size: ['10,000,000', Validators.required],
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

  // File upload handling - Modified to handle multiple files
  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      // Limit to 5 files total
      const remainingSlots = 5 - this.uploadedFiles.length;
      const filesToAdd = Math.min(files.length, remainingSlots);
      
      for (let i = 0; i < filesToAdd; i++) {
        this.uploadedFiles.push(files[i]);
      }
      
      if (files.length > remainingSlots) {
        console.warn(`Only added ${remainingSlots} files. Maximum of 5 files allowed.`);
        // You could add a user notification here
      }
    }
  }

  // Remove a file from the uploads
  removeFile(index: number): void {
    this.uploadedFiles.splice(index, 1);
  }

  // Validate if at least one file is uploaded
  validateFiles(): boolean {
    return this.uploadedFiles.length > 0;
  }

  // Form submission - Updated with improved validation and file handling
  async onSubmit(): Promise<void> {
    // Mark all form controls as touched to trigger validation
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
    
    if (this.form.invalid) {
      console.error('Form validation failed');
      return;
    }
    
    if (!this.validateFiles()) {
      console.error('Please upload at least one required document');
      // You could add a user notification here
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
      
      // Add files to FormData correctly - using 'proofFile' array
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
      formData.append('businessOwnerAddress', this.form.value.owner_address);
      
      formData.append('nameOfWarehouseOwner', this.form.value.warehouse_owner);
      formData.append('warehouseOwnerSex', this.form.value.warehouse_owner_sex);
      formData.append('warehouseOwnerSocialClassification', this.form.value.warehouse_owner_social_classification || 'None');
      formData.append('warehouseOwnerTelephoneNumber', this.form.value.warehouse_owner_telephone);
      formData.append('warehouseOwnerEmailAddress', this.form.value.warehouse_owner_email);
      formData.append('warehouseOwnerMobileNumber', this.form.value.warehouse_owner_mobile);
      formData.append('warehouseOwnerWebsiteSocialMediaPage', this.form.value.warehouse_owner_website || 'N/A');
      formData.append('warehouseOwnerAddress', this.form.value.warehouse_owner_address);
      
      formData.append('productsStoredInWarehouse', products.join(', ') || 'None specified');
      formData.append('listOfBrands', this.form.value.brands_list);
      formData.append('nameOfSuppliers', this.form.value.supplier_names);
      formData.append('assetSize', this.form.value.asset_size);
      
      // Add application status
      formData.append('applicationStatus', 'pending');
      
      // Get current user ID
      const userData = this.pocketBaseService.getUserData();
      if (userData) {
        formData.append('owner', userData.id);
      } else {
        throw new Error('User not logged in');
      }
      
      console.log('Submitting warehouse registration with data:', 
        Object.fromEntries(formData.entries()));
      
      // Use the dedicated method in PocketBaseService for warehouse registration
      await this.pocketBaseService.createWarehouseRegistration(formData);
      
      this.submitting = false;
      this.showSuccessModal = true;
    } catch (error) {
      console.error('Error submitting warehouse registration:', error);
      this.submitting = false;
      // Handle error (could show error message to user here)
      alert('Failed to submit form. Please try again later.');
    }
  }
  
  // Close the success modal
  closeSuccessModal(): void {
    this.showSuccessModal = false;
    this.form.reset();
    this.uploadedFiles = [];
  }
}