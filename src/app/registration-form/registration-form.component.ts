import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationDataService } from '../services/registration-data.service';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  showModal = false;
  formData: any = {
    stateless: '',
    refugee: '',
    citizenship: '',
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    month: '',
    day: '',
    year: '',
    civilStatus: '',
    gender: '',
    email: ''
  };

  constructor(private router: Router, private dataService: RegistrationDataService) {}

  ngOnInit() {
    const saved = this.dataService.getFormData();
    if (saved && Object.keys(saved).length > 0) {
      this.formData = saved;
    }
  }

  submitForm(myForm: NgForm) {
    if (!myForm.valid) {
      myForm.control.markAllAsTouched();
      return;
    }
    this.formData = { ...myForm.value };
    this.dataService.setFormData(this.formData);
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  goToBusinessScope() {
    this.showModal = false;
    this.router.navigate(['/business-scope']);
  }
}
