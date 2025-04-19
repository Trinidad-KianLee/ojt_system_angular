import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PocketBaseService } from '../../../services/pocketbase.service';

@Component({
  selector: 'app-retailer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './retailer-regis.component.html',
  styleUrls: ['./retailer.component.css']
})
export class RetailerRegisComponent implements OnInit {
  form: FormGroup;
  showSuccessModal = false;
  isSubmitted = false;

  constructor(
    private router: Router,
    private pbService: PocketBaseService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      business_name: ['Dummy Business', Validators.required],
      store_name: ['Dummy Store', Validators.required],
      floor_unit_no: ['1A', Validators.required],
      building_no_name: ['Dummy Building', Validators.required],
      street: ['Dummy Street', Validators.required],
      barangay: ['Dummy Barangay', Validators.required],
      city_municipality: ['Dummy City', Validators.required],
      province: ['Dummy Province', Validators.required],
      region: ['Dummy Region', Validators.required],
      zip_code: ['12345', Validators.required],
      business_owner: ['John Doe', Validators.required],
      warehouse_owner_sex: ['Male', Validators.required],
      social_classification: ['Class A', Validators.required],
      telephone_mobile: ['09123456789', Validators.required],
      email_address: ['dummy@example.com', [Validators.required, Validators.email]],
      website_social_media: ['https://dummywebsite.com', Validators.required],
      store_type: ['Retail', Validators.required],
      digital_platforms: ['Platform A', Validators.required],
      store_url: ['https://dummystore.com', [Validators.required, Validators.pattern('https?://.*')]],
      vapor_product_system: [true],
      vapor_product_device: [false],
      refills_e_liquids: [true],
      htp_system: [false],
      htp_device: [true],
      htp_consumables: [false],
      nicotine_pouch: [true],
      brands_list: ['Brand A, Brand B'],
      supplier_names: ['Supplier X, Supplier Y'],
      asset_size: ['Medium'],
      warehouse_address: ['123 Dummy Warehouse Address']
    });
  }

  ngOnInit(): void {}

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return this.isSubmitted && field !== null && field.invalid;
  }

  async submitForm() {
    this.isSubmitted = true;
    
    if (this.form.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
      return;
    }

    try {
      await this.pbService.createRetailerRegisRecord(this.form.value);
      this.showSuccessModal = true;
    } catch (error) {
      console.error('Error storing data in PocketBase:', error);
      alert('Failed to store data. Check console for details.');
    }
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
    this.form.reset();
    this.isSubmitted = false;
  }
}
