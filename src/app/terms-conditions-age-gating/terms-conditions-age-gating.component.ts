import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms-conditions-age-gating',
  templateUrl: './terms-conditions-age-gating.component.html',
  styleUrl: './terms-conditions-age-gating.component.css'
})
export class TermsConditionsAgeGatingComponent {
  constructor(private router: Router) {}

  acceptTerms() {
    this.router.navigate(['/registration-form']);
  }

  declineTerms() {
    console.log('User declined the terms and conditions');
  }
}
