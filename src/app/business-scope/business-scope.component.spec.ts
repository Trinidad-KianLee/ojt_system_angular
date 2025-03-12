import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationDataService } from '../services/registration-data.service';

@Component({
  selector: 'app-business-scope',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './business-scope.component.html',
  styleUrls: ['./business-scope.component.scss']
})
export class BusinessScopeComponent implements OnInit {
  firstName = '';
  lastName = '';
  middleName = '';
  stateless = '';
  refugee = '';
  citizenship = '';
  suffix = '';
  month = '';
  day = '';
  year = '';
  civilStatus = '';
  gender = '';
  email = '';
  scope = '';
  region = '';
  city = '';
  barangay = '';
  dominantName = '';
  descriptor = '';
  proposedName = '';

  constructor(private router: Router, private dataService: RegistrationDataService) {}

  ngOnInit() {
    const saved = this.dataService.getFormData();
    if (saved && Object.keys(saved).length > 0) {
      this.firstName = saved.firstName || '';
      this.lastName = saved.lastName || '';
      this.middleName = saved.middleName || '';
      this.stateless = saved.stateless || '';
      this.refugee = saved.refugee || '';
      this.citizenship = saved.citizenship || '';
      this.suffix = saved.suffix || '';
      this.month = saved.month || '';
      this.day = saved.day || '';
      this.year = saved.year || '';
      this.civilStatus = saved.civilStatus || '';
      this.gender = saved.gender || '';
      this.email = saved.email || '';
      this.scope = saved.scope || '';
      this.region = saved.region || '';
      this.city = saved.city || '';
      this.barangay = saved.barangay || '';
      this.dominantName = saved.dominantName || '';
      this.descriptor = saved.descriptor || '';
      this.proposedName = saved.proposedName || '';
    }
  }

  onBack() {
    this.dataService.setFormData({
      ...this.dataService.getFormData(),
      firstName: this.firstName,
      lastName: this.lastName,
      middleName: this.middleName,
      stateless: this.stateless,
      refugee: this.refugee,
      citizenship: this.citizenship,
      suffix: this.suffix,
      month: this.month,
      day: this.day,
      year: this.year,
      civilStatus: this.civilStatus,
      gender: this.gender,
      email: this.email,
      scope: this.scope,
      region: this.region,
      city: this.city,
      barangay: this.barangay,
      dominantName: this.dominantName,
      descriptor: this.descriptor,
      proposedName: this.proposedName
    });
    this.router.navigate(['/registration-form']);
  }

  onNext() {
    this.dataService.setFormData({
      ...this.dataService.getFormData(),
      firstName: this.firstName,
      lastName: this.lastName,
      middleName: this.middleName,
      stateless: this.stateless,
      refugee: this.refugee,
      citizenship: this.citizenship,
      suffix: this.suffix,
      month: this.month,
      day: this.day,
      year: this.year,
      civilStatus: this.civilStatus,
      gender: this.gender,
      email: this.email,
      scope: this.scope,
      region: this.region,
      city: this.city,
      barangay: this.barangay,
      dominantName: this.dominantName,
      descriptor: this.descriptor,
      proposedName: this.proposedName
    });
    this.router.navigate(['/next-step']);
  }
}
