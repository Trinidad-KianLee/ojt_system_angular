import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
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
  // Existing fields + booleans
  formData: any = {
    business_name: '',
    store_name: '',
    floor_unit_no: '',
    building_no_name: '',
    street: '',
    barangay: '',
    city_municipality: '',
    province: '',
    region: '',
    zip_code: '',
    business_owner: '',
    warehouse_owner_sex: '',
    social_classification: '',
    telephone_mobile: '',
    email_address: '',
    website_social_media: '',
    store_type: '',
    digital_platforms: '',
    store_url: '',
    // All booleans for the checkboxes
    vapor_product_system: false,
    vapor_product_device: false,
    refills_e_liquids: false,
    htp_system: false,
    htp_device: false,
    htp_consumables: false,
    nicotine_pouch: false,
    // Other text fields
    brands_list: '',
    supplier_names: '',
    asset_size: '',
    warehouse_address: ''
  };

  // Controls visibility of the "Successful Registration" modal
  showSuccessModal = false;

  constructor(
    private router: Router,
    private pbService: PocketBaseService
  ) {}

  ngOnInit(): void {}

  async submitForm(myForm: NgForm) {
    if (!myForm.valid) {
      myForm.control.markAllAsTouched();
      return;
    }

    try {
      // 1) Build a single string from the checkboxes
      const selectedProducts: string[] = [];

      if (this.formData.vapor_product_system) {
        selectedProducts.push('vapor_product_system');
      }
      if (this.formData.vapor_product_device) {
        selectedProducts.push('vapor_product_device');
      }
      if (this.formData.refills_e_liquids) {
        selectedProducts.push('refills_e_liquids');
      }
      if (this.formData.htp_system) {
        selectedProducts.push('htp_system');
      }
      if (this.formData.htp_device) {
        selectedProducts.push('htp_device');
      }
      if (this.formData.htp_consumables) {
        selectedProducts.push('htp_consumables');
      }
      if (this.formData.nicotine_pouch) {
        selectedProducts.push('nicotine_pouch');
      }

      const productsOfferedString = selectedProducts.join(', ');

      // 2) Copy formData and add products_offered as a single text field
      const finalData = { ...this.formData };
      finalData.products_offered = productsOfferedString;

      // 3) Store data in 'retailer_regis' collection
      //    Make sure your PocketBase collection has a text field 'products_offered'
      await this.pbService.createRetailerRegisRecord(finalData);

      // 4) Show success modal
      this.showSuccessModal = true;

    } catch (error) {
      console.error('Error storing data in PocketBase:', error);
      alert('Failed to store data. Check console for details.');
    }
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
    // Optionally reset the form
    // this.formData = {};
    // Or navigate away
    // this.router.navigate(['/somewhere']);
  }
}
