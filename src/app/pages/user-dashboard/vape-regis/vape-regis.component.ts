import { 
  Component, 
  OnInit 
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PocketBaseService } from '../../../services/pocketbase.service';

@Component({
  selector: 'app-vape-regis',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './vape-regis.component.html',
  styleUrls: ['./vape-regis.component.css']
})
export class VapeRegisComponent implements OnInit {
  form!: FormGroup;
  uploadedFiles: File[] = [];
  showSuccessModal = false;

  constructor(
    private fb: FormBuilder,
    private pbService: PocketBaseService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      applicantToken: ['', Validators.required],
      typeOfApplication: ['New'],
      permit: [''],
      applicationDate: ['', Validators.required],

      promoTitle: ['', Validators.required],
      promoSchemes: this.fb.group({
        discount: [false],
        contest: [false],
        premium: [false],
        redemption: [false],
        raffle: [false],
        game: [false],
        coverage: ['']
      }),
      promoPeriod: ['', Validators.required],

      sponsorName: ['', Validators.required],
      sponsorRefNo: [''],
      sponsorAddress: [''],
      sponsorAuthorizedRep: [''],
      sponsorDesignation: [''],
      sponsorContactNo: [''],

      agencyName: ['', Validators.required],
      agencyRefNo: [''],
      agencyAddress: [''],
      agencyAuthorizedRep: [''],
      agencyDesignation: [''],
      agencyContactNo: [''],

      amendmentReason: [''],
      attachments: [null]
    });
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        this.uploadedFiles.push(files[i]);
      }
      this.form.patchValue({ attachments: this.uploadedFiles });
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    try {
      // Destructure the promoSchemes
      const {
        discount,
        contest,
        premium,
        redemption,
        raffle,
        game,
        coverage
      } = this.form.value.promoSchemes;

      // Build a comma-separated string from checked schemes
      const selectedSchemes: string[] = [];
      if (discount) selectedSchemes.push('discount');
      if (contest) selectedSchemes.push('contest');
      if (premium) selectedSchemes.push('premium');
      if (redemption) selectedSchemes.push('redemption');
      if (raffle) selectedSchemes.push('raffle');
      if (game) selectedSchemes.push('game');

      const promoSchemesString = selectedSchemes.join(', ');

      // Prepare FormData
      const formData = new FormData();
      formData.append('applicationToken', this.form.value.applicantToken);
      formData.append('typeOfApplication', this.form.value.typeOfApplication);
      formData.append('permit', this.form.value.permit || '');
      formData.append('applicationDate', this.form.value.applicationDate || '');
      formData.append('promoTitle', this.form.value.promoTitle);
      formData.append('promoSchemes', promoSchemesString);
      formData.append('coverage', coverage || '');
      formData.append('promoPeriod', this.form.value.promoPeriod);
      formData.append('sponsorName', this.form.value.sponsorName);
      formData.append('sponsorRefNo', this.form.value.sponsorRefNo || '');
      formData.append('sponsorAddress', this.form.value.sponsorAddress || '');
      formData.append('sponsorAuthorizedRep', this.form.value.sponsorAuthorizedRep || '');
      formData.append('sponsorDesignation', this.form.value.sponsorDesignation || '');
      formData.append('sponsorContactNo', this.form.value.sponsorContactNo || '');
      formData.append('agencyName', this.form.value.agencyName);
      formData.append('agencyRefNo', this.form.value.agencyRefNo || '');
      formData.append('agencyAddress', this.form.value.agencyAddress || '');
      formData.append('agencyAuthorizedRep', this.form.value.agencyAuthorizedRep || '');
      formData.append('agencyDesignation', this.form.value.agencyDesignation || '');
      formData.append('agencyContactNo', this.form.value.agencyContactNo || '');
      formData.append('amendmentReason', this.form.value.amendmentReason || '');

      if (this.uploadedFiles.length > 0) {
        formData.append('attachments', this.uploadedFiles[0]);
      }
      await this.pbService.createRecord('vape_regis', formData);

      this.showSuccessModal = true;
    } catch (error) {
      console.error('Error storing record in PocketBase:', error);
      alert('Failed to store data. Check console for details.');
    }
  }

  closeSuccessModal(): void {
    this.showSuccessModal = false;
  }
}
