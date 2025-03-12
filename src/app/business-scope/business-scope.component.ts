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
    this.router.navigate(['/registration-form']);
  }

  onNext() {
    this.router.navigate(['/next-step']);
  }
}
