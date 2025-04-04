import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
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
  form!: FormGroup;

  showSuccessModal = false;

  constructor(
    private router: Router,
    private pbService: PocketBaseService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
        business_name: ['', Validators.required],
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
        vapor_product_system: false,
        vapor_product_device: false,
        refills_e_liquids: false,
        htp_system: false,
        htp_device: false,
        htp_consumables: false,
        nicotine_pouch: false,
        brands_list: '',
        supplier_names: '',
        asset_size: '',
        warehouse_address: ''
      })
  }

  ngOnInit(): void {}

  async submitForm() {
    try {
      const selectedProducts: string[] = [];

      console.log(this.form.value)

      await this.pbService.createRetailerRegisRecord(this.form.value);

      this.showSuccessModal = true;

    } catch (error) {
      console.error('Error storing data in PocketBase:', error);
      alert('Failed to store data. Check console for details.');
    }
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }
}
